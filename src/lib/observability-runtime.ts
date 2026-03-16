import {
  ReactIntegration,
  faro,
  getWebInstrumentations,
  initializeFaro,
  InternalLoggerLevel,
} from '@grafana/faro-react'
import { TracingInstrumentation } from '@grafana/faro-web-tracing'

type ObservabilityRuntimeConfig = {
  environment: string
  isDev: boolean
  name: string
  release: string
  url: string
  version: string
}

export type RuntimeFaroApi = typeof faro.api

export function initializeObservabilityRuntime(config: ObservabilityRuntimeConfig) {
  initializeFaro({
    url: config.url,
    app: {
      name: config.name,
      version: config.version,
      release: config.release,
      environment: config.environment,
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
    internalLoggerLevel: config.isDev ? InternalLoggerLevel.WARN : InternalLoggerLevel.ERROR,
  })

  return faro.api
}
