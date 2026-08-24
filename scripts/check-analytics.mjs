import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { extname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = fileURLToPath(new URL('..', import.meta.url))
const distDirectory = join(projectRoot, 'dist')
const analyticsScriptUrl = 'https://cloud.umami.is/script.js'
const websiteId = '13692720-bcf6-4452-b93b-764a873c1a3f'

const requiredEventPlacements = [
  ['article-open', 'blog-index'],
  ['article-open', 'home-latest'],
  ['article-open', 'tag-index'],
  ['blog-index-open', 'article-footer'],
  ['blog-index-open', 'home-blog-header'],
  ['email-click', 'article-footer'],
  ['email-click', 'contact-primary'],
  ['email-click', 'hero'],
  ['profile-link-click', 'contact-secondary'],
  ['profile-link-click', 'hero'],
  ['project-link-click', 'card-footer'],
]

const requiredProfilePlacements = [
  ['github', 'contact-secondary'],
  ['github', 'hero'],
  ['linkedin', 'contact-secondary'],
  ['linkedin', 'hero'],
]

const requiredDeclarativePlacements = [
  ...new Set(requiredEventPlacements.map(([, placement]) => placement)),
]

const declarativeEventSchemas = {
  'article-open': {
    requiredProperties: ['article'],
    placements: ['blog-index', 'home-latest', 'tag-index'],
  },
  'blog-index-open': {
    requiredProperties: [],
    placements: ['article-footer', 'home-blog-header'],
  },
  'email-click': {
    requiredProperties: [],
    placements: ['article-footer', 'contact-primary', 'hero'],
  },
  'profile-link-click': {
    allowedProperties: {
      platform: ['github', 'linkedin'],
    },
    requiredProperties: ['platform'],
    placements: ['contact-secondary', 'hero'],
  },
  'project-link-click': {
    allowedProperties: {
      destination: ['github', 'live'],
    },
    requiredProperties: ['destination', 'project'],
    placements: ['card-footer'],
  },
}

function fail(message) {
  throw new Error(`[analytics:check] ${message}`)
}

function collectFiles(directory, extensions) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)

    if (entry.isDirectory()) {
      return collectFiles(path, extensions)
    }

    return extensions.has(extname(entry.name)) ? [path] : []
  })
}

function getAnalyticsAttributes(element) {
  const attributes = [...element.matchAll(/\b(data-umami-event(?:-[\w-]+)?)="([^"]*)"/g)].map(
    (match) => [match[1], match[2]],
  )

  return Object.fromEntries(attributes)
}

function validateDeclarativeEvent(
  element,
  htmlFile,
  observedEvents,
  observedPlacements,
  observedEventPlacements,
  observedProfilePlacements,
) {
  const attributes = getAnalyticsAttributes(element)
  const eventName = attributes['data-umami-event']
  const schema = declarativeEventSchemas[eventName]
  const fileName = relative(projectRoot, htmlFile)

  if (!schema) {
    fail(`${fileName} contains an event without a validation schema: ${eventName}`)
  }

  const placement = attributes['data-umami-event-placement']

  if (!schema.placements.includes(placement)) {
    fail(`${fileName} has an invalid ${eventName} placement: ${placement ?? 'missing'}`)
  }

  for (const property of schema.requiredProperties) {
    const value = attributes[`data-umami-event-${property}`]

    if (!value) {
      fail(`${fileName} has a ${eventName} event without ${property}`)
    }
  }

  for (const [property, allowedValues] of Object.entries(schema.allowedProperties ?? {})) {
    const value = attributes[`data-umami-event-${property}`]

    if (!allowedValues.includes(value)) {
      fail(`${fileName} has an invalid ${eventName} ${property}: ${value ?? 'missing'}`)
    }
  }

  if (eventName === 'article-open') {
    const article = attributes['data-umami-event-article']

    if (!/^\/me\/blog\/.+\/$/.test(article)) {
      fail(`${fileName} has an invalid article-open target: ${article}`)
    }
  }

  observedEvents.add(eventName)
  observedPlacements.add(placement)
  observedEventPlacements.add(`${eventName}:${placement}`)

  if (eventName === 'profile-link-click') {
    observedProfilePlacements.add(`${attributes['data-umami-event-platform']}:${placement}`)
  }
}

if (!existsSync(distDirectory)) {
  fail('dist directory is missing; run the production build first')
}

const htmlFiles = collectFiles(distDirectory, new Set(['.html']))
const articleHtmlFiles = []
const observedDeclarativeEvents = new Set()
const observedDeclarativePlacements = new Set()
const observedEventPlacements = new Set()
const observedProfilePlacements = new Set()

if (htmlFiles.length === 0) {
  fail('production build contains no HTML pages')
}

for (const htmlFile of htmlFiles) {
  const html = readFileSync(htmlFile, 'utf8')
  const analyticsScripts = html.match(/<script\b[^>]*cloud\.umami\.is\/script\.js[^>]*>/g) ?? []

  if (analyticsScripts.length !== 1) {
    fail(
      `${relative(projectRoot, htmlFile)} must contain exactly one Umami script; found ${analyticsScripts.length}`,
    )
  }

  const [analyticsScript] = analyticsScripts
  const requiredScriptAttributes = [
    `src="${analyticsScriptUrl}"`,
    `data-website-id="${websiteId}"`,
    'data-domains="alibayramli.github.io"',
    'data-do-not-track="true"',
  ]

  for (const attribute of requiredScriptAttributes) {
    if (!analyticsScript.includes(attribute)) {
      fail(`${relative(projectRoot, htmlFile)} has an invalid Umami loader: missing ${attribute}`)
    }
  }

  if (!/\bdefer(?:\s|=|>)/.test(analyticsScript)) {
    fail(`${relative(projectRoot, htmlFile)} has an invalid Umami loader: missing defer`)
  }

  const analyticsElements = html.match(/<[^>]+\bdata-umami-event="[^"]+"[^>]*>/g) ?? []

  for (const analyticsElement of analyticsElements) {
    validateDeclarativeEvent(
      analyticsElement,
      htmlFile,
      observedDeclarativeEvents,
      observedDeclarativePlacements,
      observedEventPlacements,
      observedProfilePlacements,
    )
  }

  if (/<meta\b[^>]*property="og:type"[^>]*content="article"[^>]*>/.test(html)) {
    articleHtmlFiles.push(htmlFile)

    const progressMarkers =
      html.match(/<[^>]+\bdata-article-progress-marker(?:="[^"]*")?[^>]*>/g) ?? []

    if (progressMarkers.length !== 1) {
      fail(
        `${relative(projectRoot, htmlFile)} must contain exactly one article progress marker; found ${progressMarkers.length}`,
      )
    }

    if (!html.includes('article-read-75')) {
      fail(`${relative(projectRoot, htmlFile)} is missing article-read-75 tracking`)
    }
  }
}

const javascriptFiles = collectFiles(distDirectory, new Set(['.js']))
const javascriptOutput = javascriptFiles.map((file) => readFileSync(file, 'utf8')).join('\n')

for (const eventName of Object.keys(declarativeEventSchemas)) {
  if (!observedDeclarativeEvents.has(eventName)) {
    fail(`required declarative event is missing from the production build: ${eventName}`)
  }
}

for (const placement of requiredDeclarativePlacements) {
  if (!observedDeclarativePlacements.has(placement)) {
    fail(`required declarative placement is missing from the production build: ${placement}`)
  }
}

for (const [eventName, placement] of requiredEventPlacements) {
  if (!observedEventPlacements.has(`${eventName}:${placement}`)) {
    fail(`required event/placement pair is missing: ${eventName} / ${placement}`)
  }
}

for (const [platform, placement] of requiredProfilePlacements) {
  if (!observedProfilePlacements.has(`${platform}:${placement}`)) {
    fail(`required profile event is missing: ${platform} / ${placement}`)
  }
}

if (articleHtmlFiles.length === 0) {
  fail('production build contains no article pages')
}

const homeHtmlPath = join(distDirectory, 'index.html')

if (!existsSync(homeHtmlPath)) {
  fail('homepage output is missing')
}

const homeHtml = readFileSync(homeHtmlPath, 'utf8')

if (!homeHtml.includes('data-umami-event="blog-index-open"')) {
  fail('homepage is missing blog index tracking')
}

if (!homeHtml.includes('data-umami-event-placement="home-blog-header"')) {
  fail('homepage is missing the blog index placement')
}

const downloadAnchors = homeHtml.match(/<a\b[^>]*\bdownload(?:="[^"]*")?[^>]*>/g) ?? []
const resumeAnchors = downloadAnchors.filter((anchor) =>
  anchor.includes('href="/me/resume/Ali_Bayramli_Resume.pdf"'),
)

if (resumeAnchors.length !== 2) {
  fail(`homepage must contain two native resume download links; found ${resumeAnchors.length}`)
}

for (const resumeAnchor of resumeAnchors) {
  if (resumeAnchor.includes('data-umami-event')) {
    fail('resume download must use programmatic tracking to preserve native download behavior')
  }
}

const compiledStringDelimiter = '[`\'"]'
const resumeCalls = [
  ...javascriptOutput.matchAll(
    new RegExp(
      `${compiledStringDelimiter}resume-download${compiledStringDelimiter}\\s*,\\s*\\{([^}]*)\\}`,
      'g',
    ),
  ),
]

if (resumeCalls.length === 0) {
  fail('production JavaScript is missing resume tracking calls')
}

const formatPattern = new RegExp(
  `\\bformat\\s*:\\s*${compiledStringDelimiter}pdf${compiledStringDelimiter}`,
)

for (const placement of ['navigation-desktop', 'navigation-mobile']) {
  const placementPattern = new RegExp(
    `\\bplacement\\s*:\\s*${compiledStringDelimiter}${placement}${compiledStringDelimiter}`,
  )
  const hasCompletePayload = resumeCalls.some(
    ([, payload]) => formatPattern.test(payload) && placementPattern.test(payload),
  )

  if (!hasCompletePayload) {
    fail(`resume tracking is missing its complete ${placement} payload`)
  }
}

const errorFallbackPattern = new RegExp(
  `${compiledStringDelimiter}data-umami-event${compiledStringDelimiter}\\s*:\\s*${compiledStringDelimiter}email-click${compiledStringDelimiter}[^}]{0,250}${compiledStringDelimiter}data-umami-event-placement${compiledStringDelimiter}\\s*:\\s*${compiledStringDelimiter}error-fallback${compiledStringDelimiter}`,
)

if (!errorFallbackPattern.test(javascriptOutput)) {
  fail('error fallback tracking is missing its email-click association')
}

console.log(
  `Analytics check passed for ${htmlFiles.length} pages, ${Object.keys(declarativeEventSchemas).length + 2} events, and ${requiredDeclarativePlacements.length + 3} placements.`,
)
