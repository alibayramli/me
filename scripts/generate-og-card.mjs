import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import puppeteer from 'puppeteer'

const rootDir = resolve(import.meta.dirname, '..')
const siteContentPath = resolve(rootDir, 'src/content/site-content.json')
const outputDir = resolve(rootDir, 'public')
const svgPath = resolve(outputDir, 'og-card.svg')
const pngPath = resolve(outputDir, 'og-card.png')

const siteContent = JSON.parse(readFileSync(siteContentPath, 'utf8'))
const { profile } = siteContent

const escapeXml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const capabilitySummary = profile.heroCapabilities.join(' / ')

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="96" y1="64" x2="1088" y2="582" gradientUnits="userSpaceOnUse">
      <stop stop-color="#F7FAFF" />
      <stop offset="1" stop-color="#DCE8F6" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#EDF2F8" />
  <rect x="36" y="32" width="1128" height="566" rx="36" fill="url(#bg)" />
  <rect x="36" y="32" width="1128" height="566" rx="36" stroke="#C7D3E2" />
  <rect x="92" y="84" width="1016" height="462" rx="28" fill="#FFFFFF" fill-opacity="0.58" stroke="#D5DEE9" />
  <text x="126" y="160" fill="#4B74AD" font-family="'Segoe UI', Arial, sans-serif" font-size="24" font-weight="700" letter-spacing="4">${escapeXml(profile.name.toUpperCase())}</text>
  <text x="126" y="246" fill="#172235" font-family="'Segoe UI', Arial, sans-serif" font-size="72" font-weight="700">${escapeXml(profile.title)}</text>
  <text x="126" y="308" fill="#3F546D" font-family="'Segoe UI', Arial, sans-serif" font-size="30">${escapeXml(capabilitySummary)}</text>
  <text x="126" y="398" fill="#1E2C42" font-family="'Segoe UI', Arial, sans-serif" font-size="28" font-weight="700">Backstage.io / React / Angular / Node.js / Python</text>
  <text x="126" y="448" fill="#4A5C73" font-family="'Segoe UI', Arial, sans-serif" font-size="26">CI/CD automation / Observability / Internal platform tooling</text>
  <rect x="126" y="490" width="376" height="38" rx="19" fill="#E7EFF8" />
  <text x="152" y="515" fill="#4B74AD" font-family="'Segoe UI', Arial, sans-serif" font-size="21" font-weight="700">alibayramli.github.io/me/</text>
</svg>
`

const renderPng = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: process.platform === 'linux' ? ['--no-sandbox', '--disable-setuid-sandbox'] : [],
  })

  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 })
    await page.setContent(
      `<!doctype html><html><body style="margin:0;background:#EDF2F8">${svg}</body></html>`,
      {
        waitUntil: 'networkidle0',
      },
    )
    await page.screenshot({
      path: pngPath,
      type: 'png',
      clip: { x: 0, y: 0, width: 1200, height: 630 },
    })
  } finally {
    await browser.close()
  }
}

mkdirSync(outputDir, { recursive: true })
writeFileSync(svgPath, svg)
await renderPng()

console.log(`Generated OG card: ${svgPath}`)
console.log(`Generated OG card: ${pngPath}`)
