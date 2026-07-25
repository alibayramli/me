type TelemetryValue = string | number | boolean | null | undefined
type TelemetryAttributes = Record<string, TelemetryValue>
type TrackedElementProps = Record<string, string>
type NormalizedTelemetryAttributes = Record<string, string>
type BufferedTelemetryItem =
  | {
      type: 'event'
      domain: string
      eventName: string
      attributes?: NormalizedTelemetryAttributes
    }
  | {
      type: 'error'
      error: Error
      context?: NormalizedTelemetryAttributes
      errorType?: string
    }
  | {
      type: 'view'
      viewName: string
    }
type FaroApi = {
  pushError: (
    error: Error,
    options?: {
      context?: NormalizedTelemetryAttributes
      type?: string
    },
  ) => void
  pushEvent: (
    eventName: string,
    attributes?: NormalizedTelemetryAttributes,
    domain?: string,
  ) => void
  startUserAction: (
    name: string,
    attributes?: NormalizedTelemetryAttributes,
    options?: {
      triggerName?: string
    },
  ) => unknown
  setView: (view: { name: string }) => void
}
type ManualUserAction = {
  end: () => void
}

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
let initializationPromise: Promise<boolean> | null = null
let observabilityEnabled = false
let faroApi: FaroApi | null = null
const bufferedTelemetry: BufferedTelemetryItem[] = []

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

function normalizeAttributes(
  attributes?: TelemetryAttributes,
): NormalizedTelemetryAttributes | undefined {
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

function canBufferTelemetry() {
  return isObservabilityConfigured() && !observabilityEnabled
}

function bufferTelemetry(item: BufferedTelemetryItem) {
  if (!canBufferTelemetry()) {
    return false
  }

  bufferedTelemetry.push(item)
  return true
}

function flushBufferedTelemetry() {
  if (!observabilityEnabled || !faroApi) {
    return
  }

  for (const item of bufferedTelemetry.splice(0)) {
    if (item.type === 'view') {
      faroApi.setView({ name: item.viewName })
      continue
    }

    if (item.type === 'error') {
      faroApi.pushError(item.error, {
        context: item.context,
        type: item.errorType,
      })
      continue
    }

    faroApi.pushEvent(item.eventName, item.attributes, item.domain)
  }
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

async function initializeObservabilityRuntime() {
  const { initializeObservabilityRuntime: setupObservabilityRuntime } =
    await import('./observability-runtime')

  faroApi = setupObservabilityRuntime({
    environment: runtimeConfig.environment,
    isDev: import.meta.env.DEV,
    name: runtimeConfig.appName,
    release: __GIT_COMMIT_SHA__,
    url: runtimeConfig.url,
    version: __APP_VERSION__,
  }) as unknown as FaroApi
}

export function isObservabilityConfigured() {
  return runtimeConfig.enabled && Boolean(runtimeConfig.url)
}

export async function initObservability() {
  if (observabilityEnabled) {
    return observabilityEnabled
  }

  if (initializationPromise) {
    return initializationPromise
  }

  initializationAttempted = true

  if (!isObservabilityConfigured()) {
    if (import.meta.env.DEV && runtimeConfig.enabled) {
      console.info('[observability] Grafana Faro is enabled but runtime config is incomplete.')
    }

    return false
  }

  initializationPromise = initializeObservabilityRuntime()
    .then(() => {
      observabilityEnabled = true
      trackView(getCurrentViewName())
      flushBufferedTelemetry()

      if (import.meta.env.DEV) {
        console.info('[observability] Grafana Faro initialized.', {
          appName: runtimeConfig.appName,
          environment: runtimeConfig.environment,
          url: runtimeConfig.url,
          view: getCurrentViewName(),
        })
      }

      return true
    })
    .catch((error) => {
      observabilityEnabled = false

      if (import.meta.env.DEV) {
        console.warn('[observability] Grafana Faro failed to initialize.', error)
      }

      return false
    })
    .finally(() => {
      initializationPromise = null
    })

  return initializationPromise
}

export function isObservabilityEnabled() {
  return observabilityEnabled
}

export function trackView(viewName: string) {
  if (!viewName) {
    return false
  }

  if (!observabilityEnabled || !faroApi) {
    return bufferTelemetry({
      type: 'view',
      viewName,
    })
  }

  faroApi.setView({ name: viewName })
  return true
}

export function trackEvent(
  eventName: string,
  attributes?: TelemetryAttributes,
  domain = DEFAULT_EVENT_DOMAIN,
) {
  const normalizedAttributes = normalizeAttributes(attributes)

  if (!observabilityEnabled || !faroApi) {
    return bufferTelemetry({
      type: 'event',
      domain,
      eventName,
      attributes: normalizedAttributes,
    })
  }

  faroApi.pushEvent(eventName, normalizedAttributes, domain)
  return true
}

export function trackError(
  error: Error,
  options?: {
    context?: TelemetryAttributes
    type?: string
  },
) {
  const normalizedContext = normalizeAttributes(options?.context)

  if (!observabilityEnabled || !faroApi) {
    return bufferTelemetry({
      type: 'error',
      error,
      context: normalizedContext,
      errorType: options?.type,
    })
  }

  faroApi.pushError(error, {
    context: normalizedContext,
    type: options?.type,
  })
  return true
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
  }

  const userActionName = options?.userActionName ?? eventName
  if (userActionName) {
    props['data-telemetry-user-action-name'] = userActionName
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
  const { telemetryEvent, telemetryDomain, telemetryUserActionName, ...dataset } = element.dataset

  if (!telemetryEvent) {
    return null
  }

  const attributes = Object.entries(dataset).reduce<NormalizedTelemetryAttributes>(
    (payload, [key, value]) => {
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
    },
    {},
  )

  return {
    attributes: Object.keys(attributes).length > 0 ? attributes : undefined,
    domain: telemetryDomain ?? DEFAULT_EVENT_DOMAIN,
    eventName: telemetryEvent,
    userActionName: telemetryUserActionName ?? telemetryEvent,
  }
}

export function trackUserAction(actionName: string, attributes?: TelemetryAttributes) {
  const normalizedAttributes = normalizeAttributes(attributes)

  if (!observabilityEnabled || !faroApi || !actionName) {
    return false
  }

  const userAction = faroApi.startUserAction(actionName, normalizedAttributes, {
    triggerName: 'click',
  }) as ManualUserAction | undefined

  if (!userAction) {
    return false
  }

  setTimeout(() => {
    userAction.end()
  }, 120)

  return true
}

export function scheduleObservabilityInitialization() {
  if (typeof window === 'undefined' || initializationAttempted || !isObservabilityConfigured()) {
    return
  }

  const currentWindow = window as Window & {
    requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number
  }

  const startInitialization = () => {
    void initObservability()
  }

  currentWindow.requestAnimationFrame(() => {
    currentWindow.requestAnimationFrame(() => {
      setTimeout(startInitialization, 0)
    })
  })
}
