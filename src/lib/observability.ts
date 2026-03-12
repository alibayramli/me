import {
  ReactIntegration,
  faro,
  getWebInstrumentations,
  initializeFaro,
  InternalLoggerLevel,
  type EventAttributes,
  userActionDataAttribute,
} from '@grafana/faro-react'
import { TracingInstrumentation } from '@grafana/faro-web-tracing'

type TelemetryValue = string | number | boolean | null | undefined
type TelemetryAttributes = Record<string, TelemetryValue>
type TrackedElementProps = Record<string, string>

const DEFAULT_EVENT_DOMAIN = 'portfolio'
const DEFAULT_APP_NAME = 'ali-bayramli-portfolio'
const TELEMETRY_DATASET_PREFIX = 'telemetry'

const runtimeConfig = {
  enabled: resolveEnabledFlag(),
  url: import.meta.env.VITE_FARO_URL?.trim() ?? '',
  appName: import.meta.env.VITE_FARO_APP_NAME?.trim() || DEFAULT_APP_NAME,
  environment:
    import.meta.env.VITE_FARO_APP_ENV?.trim() ||
    (import.meta.env.PROD ? 'production' : 'development'),
}

let initializationAttempted = false
let observabilityEnabled = false

function resolveEnabledFlag() {
  const rawValue = import.meta.env.VITE_FARO_ENABLED?.trim().toLowerCase()

  if (rawValue === 'true') {
    return true
  }

  if (rawValue === 'false') {
    return false
  }

  return import.meta.env.PROD
}

function toSnakeCase(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .replace(/[^a-zA-Z0-9_]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toLowerCase()
}

function toKebabCase(value: string) {
  return toSnakeCase(value).replace(/_/g, '-')
}

function normalizeAttributes(attributes?: TelemetryAttributes): EventAttributes | undefined {
  if (!attributes) {
    return undefined
  }

  const normalizedEntries = Object.entries(attributes).flatMap(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return []
    }

    return [[toSnakeCase(key), String(value)]]
  })

  return normalizedEntries.length > 0 ? Object.fromEntries(normalizedEntries) : undefined
}

function getCurrentViewName() {
  if (typeof window === 'undefined') {
    return 'home'
  }

  const baseSegments = import.meta.env.BASE_URL.split('/')
    .map((segment) => segment.trim())
    .filter(Boolean)
  const pathSegments = window.location.pathname
    .split('/')
    .map((segment) => segment.trim())
    .filter(Boolean)

  while (baseSegments.length > 0 && pathSegments[0] === baseSegments[0]) {
    pathSegments.shift()
    baseSegments.shift()
  }

  if (pathSegments.length === 0) {
    return 'home'
  }

  return pathSegments.map(toSnakeCase).join('/')
}

export function initObservability() {
  if (initializationAttempted) {
    return observabilityEnabled
  }

  initializationAttempted = true

  if (!runtimeConfig.enabled || !runtimeConfig.url) {
    if (import.meta.env.DEV && runtimeConfig.enabled) {
      console.info('[observability] Grafana Faro is enabled but runtime config is incomplete.')
    }

    return false
  }

  try {
    const faroConfig = {
      url: runtimeConfig.url,
      app: {
        name: runtimeConfig.appName,
        version: __APP_VERSION__,
        release: __GIT_COMMIT_SHA__,
        environment: runtimeConfig.environment,
      },
      ignoreErrors: [
        /ResizeObserver loop completed with undelivered notifications/i,
        /ResizeObserver loop limit exceeded/i,
      ],
      instrumentations: [
        ...getWebInstrumentations({
          captureConsole: false,
          enablePerformanceInstrumentation: true,
        }),
        new ReactIntegration(),
        new TracingInstrumentation(),
      ],
      internalLoggerLevel: import.meta.env.DEV
        ? InternalLoggerLevel.WARN
        : InternalLoggerLevel.ERROR,
    }

    initializeFaro(faroConfig)

    observabilityEnabled = true
    trackView(getCurrentViewName())

    if (import.meta.env.DEV) {
      console.info('[observability] Grafana Faro initialized.', {
        appName: runtimeConfig.appName,
        environment: runtimeConfig.environment,
        url: runtimeConfig.url,
        view: getCurrentViewName(),
      })
    }
  } catch (error) {
    observabilityEnabled = false

    if (import.meta.env.DEV) {
      console.warn('[observability] Grafana Faro failed to initialize.', error)
    }
  }

  return observabilityEnabled
}

export function isObservabilityEnabled() {
  return observabilityEnabled
}

export function trackView(viewName: string) {
  if (!observabilityEnabled) {
    return
  }

  faro.api.setView({ name: viewName })
}

export function trackEvent(
  eventName: string,
  attributes?: TelemetryAttributes,
  domain = DEFAULT_EVENT_DOMAIN,
) {
  if (!observabilityEnabled) {
    return
  }

  faro.api.pushEvent(eventName, normalizeAttributes(attributes), domain)
}

export function getTrackedElementProps(
  eventName: string,
  attributes?: TelemetryAttributes,
  options?: {
    domain?: string
    userActionName?: string
  },
): TrackedElementProps {
  const props: TrackedElementProps = {
    'data-telemetry-event': eventName,
    'data-telemetry-domain': options?.domain ?? DEFAULT_EVENT_DOMAIN,
    [userActionDataAttribute]: options?.userActionName ?? eventName,
  }

  for (const [key, value] of Object.entries(attributes ?? {})) {
    if (value === undefined || value === null || value === '') {
      continue
    }

    props[`data-telemetry-${toKebabCase(key)}`] = String(value)
  }

  return props
}

export function readTrackedElementPayload(element: HTMLElement) {
  const { telemetryEvent, telemetryDomain, ...dataset } = element.dataset

  if (!telemetryEvent) {
    return null
  }

  const attributes = Object.entries(dataset).reduce<EventAttributes>((payload, [key, value]) => {
    if (!key.startsWith(TELEMETRY_DATASET_PREFIX) || value === undefined) {
      return payload
    }

    const suffix = key.slice(TELEMETRY_DATASET_PREFIX.length)
    if (!suffix) {
      return payload
    }

    const normalizedKey = `${suffix.charAt(0).toLowerCase()}${suffix.slice(1)}`
    const attributeKey = toSnakeCase(normalizedKey)

    if (attributeKey) {
      payload[attributeKey] = value
    }

    return payload
  }, {})

  return {
    attributes: Object.keys(attributes).length > 0 ? attributes : undefined,
    domain: telemetryDomain ?? DEFAULT_EVENT_DOMAIN,
    eventName: telemetryEvent,
  }
}
