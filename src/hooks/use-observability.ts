import { useEffect } from 'react'
import {
  isObservabilityConfigured,
  readTrackedElementPayload,
  trackEvent,
  trackUserAction,
} from '@/lib/observability'

const ACTIVE_SECTION_MIN_RATIO = 0.2
const SECTION_THRESHOLDS = [0.15, 0.35, 0.55, 0.75]

export function useTelemetryClickTracking() {
  useEffect(() => {
    if (!isObservabilityConfigured()) {
      return
    }

    const handleClick = (event: MouseEvent) => {
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>('[data-telemetry-event]')
          : null

      if (!target) {
        return
      }

      const payload = readTrackedElementPayload(target)
      if (!payload) {
        return
      }

      trackUserAction(payload.userActionName, payload.attributes)
      trackEvent(payload.eventName, payload.attributes, payload.domain)
    }

    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [])
}

export function useSectionViewTracking() {
  useEffect(() => {
    if (!isObservabilityConfigured()) {
      return
    }

    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'))
    if (sections.length === 0) {
      return
    }

    const seenSections = new Set<string>()
    const visibleRatios = new Map<string, number>()
    const syncActiveSection = () => {
      const nextActiveSection = sections
        .map((section) => ({
          id: section.id,
          ratio: visibleRatios.get(section.id) ?? 0,
        }))
        .filter((section) => section.ratio >= ACTIVE_SECTION_MIN_RATIO)
        .sort((left, right) => right.ratio - left.ratio)[0]

      if (!nextActiveSection) {
        return
      }

      if (!seenSections.has(nextActiveSection.id)) {
        const wasTracked = trackEvent(
          'section_view',
          {
            pagePath: window.location.pathname,
            section: nextActiveSection.id,
          },
          'navigation',
        )

        if (wasTracked) {
          seenSections.add(nextActiveSection.id)
        }
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const section = entry.target as HTMLElement
          visibleRatios.set(section.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        }

        syncActiveSection()
      },
      {
        rootMargin: '-15% 0px -35% 0px',
        threshold: SECTION_THRESHOLDS,
      },
    )

    for (const section of sections) {
      visibleRatios.set(section.id, 0)
      observer.observe(section)
    }

    syncActiveSection()

    return () => {
      observer.disconnect()
    }
  }, [])
}
