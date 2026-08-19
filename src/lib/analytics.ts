type AnalyticsEventData = Record<string, boolean | number | string>

type UmamiWindow = Window & {
  umami?: {
    track: (eventName: string, eventData?: AnalyticsEventData) => Promise<void> | void
  }
}

export function trackAnalyticsEvent(eventName: string, eventData?: AnalyticsEventData) {
  if (typeof window === 'undefined') {
    return
  }

  void (window as UmamiWindow).umami?.track(eventName, eventData)
}
