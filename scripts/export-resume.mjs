import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableLayoutType,
  TableRow,
  TextRun,
  VerticalAlignTable,
  WidthType,
} from 'docx'
import puppeteer from 'puppeteer'

const rootDir = resolve(import.meta.dirname, '..')
const siteContentPath = resolve(rootDir, 'src/content/site-content.json')
const outputDir = resolve(rootDir, 'public/resume')
const docxPath = resolve(outputDir, 'Ali_Bayramli_CV.docx')
const pdfPath = resolve(outputDir, 'Ali_Bayramli_CV.pdf')

const siteContent = JSON.parse(readFileSync(siteContentPath, 'utf8'))
const { profile, experiences, projects, resumeProjects } = siteContent
const selectedProjects = projects.filter((project) => resumeProjects.includes(project.title))

const LAYOUT = {
  color: '111111',
  fontFamily: 'Verdana, Arial, sans-serif',
  font: {
    ascii: 'Verdana',
    hAnsi: 'Verdana',
    eastAsia: 'Verdana',
    cs: 'Verdana',
  },
  page: {
    width: 11906,
    height: 16838,
    margins: {
      top: 490,
      right: 259,
      bottom: 490,
      left: 403,
      header: 0,
      footer: 0,
      gutter: 0,
    },
  },
  sizes: {
    body: 24,
    title: 32,
    contact: 19,
    section: 22,
    tech: 21,
  },
  line: {
    title: 250,
    summary: 240,
    section: 240,
    body: 235,
    tech: 220,
    contact: 220,
  },
  spacing: {
    titleAfter: 80,
    contactCellBottom: 20,
    summaryBefore: 100,
    summaryAfter: 140,
    sectionBefore: 200,
    sectionAfter: 60,
    bulletAfter: 10,
    bulletBefore: 10,
    techBefore: 10,
    entryAfter: 100,
    projectBefore: 10,
    singleLineAfter: 60,
  },
  bullet: {
    left: 900,
    hanging: 260,
  },
  tableColumnWidths: [4200, 3050, 3994],
}

const TABLE_BORDERS = {
  top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
  insideVertical: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' },
}

const displayUrl = (url) => url.replace(/^https?:\/\/(?:www\.)?/, '').replace(/\/$/, '')
const displayRepo = (url) => url.replace(/^https?:\/\/github\.com\//, '').replace(/\/$/, '')
const escapeHtml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
const text = (value) => escapeHtml(String(value))

const halfPointsToPt = (value) => value / 2
const twipsToPt = (value) => value / 20
const formatCssNumber = (value) => {
  const rounded = Number(value.toFixed(3))
  return Number.isInteger(rounded) ? String(rounded) : String(rounded)
}
const pt = (value) => `${formatCssNumber(value)}pt`
const halfPointsToCss = (value) => pt(halfPointsToPt(value))
const twipsToCss = (value) => pt(twipsToPt(value))
const lineHeight = (lineTwips, fontHalfPoints) =>
  formatCssNumber(twipsToPt(lineTwips) / halfPointsToPt(fontHalfPoints))
const contactColumnPercentages = (() => {
  const totalWidth = LAYOUT.tableColumnWidths.reduce((sum, width) => sum + width, 0)

  return LAYOUT.tableColumnWidths.map((width) => formatCssNumber((width / totalWidth) * 100))
})()
const PDF_LAYOUT = {
  lineHeight: {
    title: '1.04',
    body: '1.095',
    summary: '1.11',
    section: '1.08',
    tech: '1.09',
    contact: '1.09',
  },
  spacing: {
    summaryBefore: 120,
    summaryAfter: 180,
    sectionBefore: 260,
    sectionAfter: 90,
    bulletBefore: 16,
    bulletAfter: 18,
    techBefore: 20,
    entryAfter: 150,
    singleLineAfter: 90,
  },
  contactPadding: {
    middleRight: 8,
    rightLeft: 12,
  },
}

const contactRows = [
  [
    { label: 'Address', text: profile.location },
    { label: 'Phone', text: profile.phone, href: `tel:${profile.phone}` },
    { label: 'Email', text: profile.email, href: `mailto:${profile.email}` },
  ],
  [
    {
      label: 'Portfolio',
      text: displayUrl(profile.siteUrl),
      href: profile.siteUrl,
    },
    {
      label: 'GitHub',
      text: displayUrl(profile.github),
      href: profile.github,
    },
    {
      label: 'LinkedIn',
      text: displayUrl(profile.linkedin),
      href: profile.linkedin,
    },
  ],
]

const makeRun = (value, overrides = {}) =>
  new TextRun({
    text: value,
    color: LAYOUT.color,
    font: LAYOUT.font,
    size: LAYOUT.sizes.body,
    noProof: true,
    ...overrides,
  })

const makeLink = (label, url, overrides = {}) =>
  new ExternalHyperlink({
    link: url,
    children: [
      new TextRun({
        text: label,
        color: LAYOUT.color,
        font: LAYOUT.font,
        size: LAYOUT.sizes.body,
        underline: { color: LAYOUT.color },
        noProof: true,
        ...overrides,
      }),
    ],
  })

const makeParagraph = ({
  children,
  text: value,
  alignment,
  spacing,
  run,
  bullet,
  indent,
  keepNext,
}) =>
  new Paragraph({
    alignment,
    spacing,
    run: {
      font: LAYOUT.font,
      color: LAYOUT.color,
      size: LAYOUT.sizes.body,
      ...run,
    },
    bullet,
    indent,
    keepNext,
    children: children ?? [makeRun(value)],
  })

const createContactCell = (cell, alignment) =>
  new TableCell({
    width: { size: 33.33, type: WidthType.PERCENTAGE },
    margins: { top: 0, right: 0, bottom: LAYOUT.spacing.contactCellBottom, left: 0 },
    borders: TABLE_BORDERS,
    verticalAlign: VerticalAlignTable.CENTER,
    children: [
      makeParagraph({
        alignment,
        spacing: { after: 0, line: LAYOUT.line.contact },
        run: { size: LAYOUT.sizes.contact },
        children: cell
          ? [
              makeRun(`${cell.label}:`, { size: LAYOUT.sizes.contact }),
              makeRun(' ', { size: LAYOUT.sizes.contact }),
              cell.href
                ? makeLink(cell.text, cell.href, {
                    size: LAYOUT.sizes.contact,
                  })
                : makeRun(cell.text, { size: LAYOUT.sizes.contact }),
            ]
          : [makeRun('', { size: LAYOUT.sizes.contact })],
      }),
    ],
  })

const createContactTable = () =>
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: LAYOUT.tableColumnWidths,
    layout: TableLayoutType.FIXED,
    margins: { top: 0, right: 0, bottom: 0, left: 0 },
    borders: TABLE_BORDERS,
    rows: contactRows.map(
      (cells) =>
        new TableRow({
          children: [
            createContactCell(cells[0], AlignmentType.LEFT),
            createContactCell(cells[1], AlignmentType.LEFT),
            createContactCell(cells[2], AlignmentType.LEFT),
          ],
        }),
    ),
  })

const createBullets = (items) =>
  items.map((item) =>
    makeParagraph({
      text: item,
      bullet: { level: 0 },
      indent: {
        left: LAYOUT.bullet.left,
        hanging: LAYOUT.bullet.hanging,
      },
      spacing: {
        before: LAYOUT.spacing.bulletBefore,
        after: LAYOUT.spacing.bulletAfter,
        line: LAYOUT.line.body,
      },
      run: { size: LAYOUT.sizes.body },
    }),
  )

const createSectionTitle = (value) =>
  makeParagraph({
    spacing: {
      before: LAYOUT.spacing.sectionBefore,
      after: LAYOUT.spacing.sectionAfter,
      line: LAYOUT.line.section,
    },
    keepNext: true,
    children: [
      makeRun(value, {
        bold: true,
        size: LAYOUT.sizes.section,
        allCaps: true,
        characterSpacing: 6,
      }),
    ],
  })

const createExperienceNodes = (experience) => {
  const bullets = experience.resumeBullets?.length
    ? experience.resumeBullets
    : [experience.resumeLine]

  return [
    makeParagraph({
      children: [makeRun(experience.company, { bold: true })],
      spacing: { after: 0, line: LAYOUT.line.body },
      keepNext: true,
    }),
    makeParagraph({
      text: `${experience.role} (${experience.period})`,
      spacing: { after: 0, line: LAYOUT.line.body },
      keepNext: true,
    }),
    ...createBullets(bullets),
    makeParagraph({
      spacing: {
        before: LAYOUT.spacing.techBefore,
        after: LAYOUT.spacing.entryAfter,
        line: LAYOUT.line.tech,
      },
      run: { size: LAYOUT.sizes.tech },
      children: [
        makeRun('Technologies:', {
          bold: true,
          size: LAYOUT.sizes.tech,
        }),
        makeRun(` ${experience.tech.join(', ')}`, {
          size: LAYOUT.sizes.tech,
        }),
      ],
    }),
  ]
}

const createProjectNodes = (project) => {
  const descriptionChildren = [makeRun(project.resumeLine)]

  if (project.links?.github) {
    descriptionChildren.push(makeRun(' GitHub: '))
    descriptionChildren.push(makeLink(displayRepo(project.links.github), project.links.github))
  }

  return [
    makeParagraph({
      children: [makeRun(project.title, { bold: true })],
      spacing: { after: 0, line: LAYOUT.line.body },
      keepNext: true,
    }),
    makeParagraph({
      spacing: {
        before: LAYOUT.spacing.projectBefore,
        after: LAYOUT.spacing.entryAfter,
        line: LAYOUT.line.body,
      },
      children: descriptionChildren,
    }),
  ]
}

const inlineLink = (url, label) => `<a href="${text(url)}">${text(label)}</a>`

const renderContactCell = (cell) => {
  if (!cell) {
    return ''
  }

  const value = cell.href ? inlineLink(cell.href, cell.text) : text(cell.text)
  return `<span class="contact-label">${text(cell.label)}:</span> ${value}`
}

const renderPdfHtml = () => {
  const renderContactRows = () =>
    contactRows
      .map(
        (cells) => `
          <tr>
            ${cells.map((cell) => `<td>${renderContactCell(cell)}</td>`).join('')}
          </tr>`,
      )
      .join('')

  const renderBullets = (items) => `
    <ul class="compact-list">
      ${items.map((item) => `<li>${text(item)}</li>`).join('')}
    </ul>`

  const renderExperience = (experience) => {
    const bullets = experience.resumeBullets?.length
      ? experience.resumeBullets
      : [experience.resumeLine]

    return `
      <div class="entry">
        <p class="company">${text(experience.company)}</p>
        <p class="role">${text(experience.role)} (${text(experience.period)})</p>
        ${renderBullets(bullets)}
        <p class="tech"><strong>Technologies:</strong> ${text(experience.tech.join(', '))}</p>
      </div>`
  }

  const renderProject = (project) => {
    const source = project.links?.github
      ? ` GitHub: ${inlineLink(project.links.github, displayRepo(project.links.github))}`
      : ''

    return `
      <div class="entry">
        <p class="company">${text(project.title)}</p>
        <p class="project-detail">${text(project.resumeLine)}${source}</p>
      </div>`
  }

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>${text(`${profile.name} CV`)}</title>
    <style>
      @page {
        size: A4;
        margin: ${twipsToCss(LAYOUT.page.margins.top)} ${twipsToCss(LAYOUT.page.margins.right)} ${twipsToCss(LAYOUT.page.margins.bottom)} ${twipsToCss(LAYOUT.page.margins.left)};
      }

      body {
        margin: 0;
        color: #${LAYOUT.color};
        font-family: ${LAYOUT.fontFamily};
        font-size: ${halfPointsToCss(LAYOUT.sizes.body)};
        line-height: ${PDF_LAYOUT.lineHeight.body};
      }

      .resume {
        width: 100%;
      }

      h1 {
        margin: 0 0 ${twipsToCss(LAYOUT.spacing.titleAfter)};
        font-size: ${halfPointsToCss(LAYOUT.sizes.title)};
        line-height: ${PDF_LAYOUT.lineHeight.title};
        font-weight: 700;
      }

      .contact-table {
        width: 100%;
        border-collapse: collapse;
        margin: 0;
        table-layout: fixed;
      }

      .contact-table td {
        padding: 0 0 ${twipsToCss(LAYOUT.spacing.contactCellBottom)};
        vertical-align: top;
        font-size: ${halfPointsToCss(LAYOUT.sizes.contact)};
        line-height: ${PDF_LAYOUT.lineHeight.contact};
        white-space: nowrap;
      }

      .contact-table td + td {
        text-align: left;
      }

      .contact-table td:nth-child(2) {
        padding-right: ${pt(PDF_LAYOUT.contactPadding.middleRight)};
      }

      .contact-table td:nth-child(3) {
        padding-left: ${pt(PDF_LAYOUT.contactPadding.rightLeft)};
      }

      .contact-label {
        font-weight: 500;
      }

      .summary {
        margin: ${twipsToCss(PDF_LAYOUT.spacing.summaryBefore)} 0 ${twipsToCss(PDF_LAYOUT.spacing.summaryAfter)};
        line-height: ${PDF_LAYOUT.lineHeight.summary};
      }

      .section-title {
        margin: ${twipsToCss(PDF_LAYOUT.spacing.sectionBefore)} 0 ${twipsToCss(PDF_LAYOUT.spacing.sectionAfter)};
        font-size: ${halfPointsToCss(LAYOUT.sizes.section)};
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.03em;
        line-height: ${PDF_LAYOUT.lineHeight.section};
      }

      .entry {
        margin: 0 0 ${twipsToCss(PDF_LAYOUT.spacing.entryAfter)};
      }

      .company,
      .role,
      .tech,
      .project-detail,
      .single-line {
        margin: 0;
      }

      .company {
        font-weight: 700;
      }

      .role,
      .project-detail,
      .single-line {
        line-height: ${PDF_LAYOUT.lineHeight.body};
      }

      .tech {
        margin-top: ${twipsToCss(PDF_LAYOUT.spacing.techBefore)};
        font-size: ${halfPointsToCss(LAYOUT.sizes.tech)};
        line-height: ${PDF_LAYOUT.lineHeight.tech};
      }

      .compact-list {
        margin: ${twipsToCss(PDF_LAYOUT.spacing.bulletBefore)} 0 0 ${twipsToCss(
          LAYOUT.bullet.left - LAYOUT.bullet.hanging,
        )};
        padding: 0;
      }

      .compact-list li {
        margin: 0 0 ${twipsToCss(PDF_LAYOUT.spacing.bulletAfter)};
      }

      a,
      a:visited {
        color: #${LAYOUT.color};
        text-decoration: underline;
        text-decoration-thickness: 0.5px;
        text-underline-offset: 1px;
      }
    </style>
  </head>
  <body>
    <main class="resume">
      <h1>${text(profile.name)}, ${text(profile.resumeTitle)}</h1>
      <table class="contact-table" role="presentation">
        <colgroup>
          ${contactColumnPercentages.map((width) => `<col style="width:${width}%">`).join('')}
        </colgroup>
        ${renderContactRows()}
      </table>

      <p class="summary">${text(profile.resumeSummary)}</p>

      <p class="section-title">SKILLS</p>
      ${renderBullets(profile.resumeSkillLines)}

      <p class="section-title">WORK EXPERIENCE</p>
      ${experiences.map(renderExperience).join('')}

      <p class="section-title">PERSONAL PROJECTS</p>
      ${selectedProjects.map(renderProject).join('')}

      <p class="section-title">LANGUAGES</p>
      <p class="single-line">${text(profile.resumeLanguages.join(' | '))}</p>

      <p class="section-title">EDUCATION</p>
      <p class="single-line">${text(
        `${profile.education[0].institution} ${profile.education[0].degree} (${profile.education[0].period})`,
      )}</p>
    </main>
  </body>
</html>`
}

const createDocxDocument = () =>
  new Document({
    title: `${profile.name} CV`,
    creator: profile.name,
    description: `${profile.name} resume`,
    sections: [
      {
        properties: {
          page: {
            size: {
              width: LAYOUT.page.width,
              height: LAYOUT.page.height,
            },
            margin: LAYOUT.page.margins,
          },
        },
        children: [
          makeParagraph({
            spacing: { after: LAYOUT.spacing.titleAfter, line: LAYOUT.line.title },
            children: [
              makeRun(`${profile.name}, ${profile.resumeTitle}`, {
                bold: true,
                size: LAYOUT.sizes.title,
              }),
            ],
          }),
          createContactTable(),
          makeParagraph({
            text: profile.resumeSummary,
            spacing: {
              before: LAYOUT.spacing.summaryBefore,
              after: LAYOUT.spacing.summaryAfter,
              line: LAYOUT.line.summary,
            },
          }),
          createSectionTitle('SKILLS'),
          ...createBullets(profile.resumeSkillLines),
          createSectionTitle('WORK EXPERIENCE'),
          ...experiences.flatMap(createExperienceNodes),
          createSectionTitle('PERSONAL PROJECTS'),
          ...selectedProjects.flatMap(createProjectNodes),
          createSectionTitle('LANGUAGES'),
          makeParagraph({
            text: profile.resumeLanguages.join(' | '),
            spacing: { after: LAYOUT.spacing.singleLineAfter, line: LAYOUT.line.body },
          }),
          createSectionTitle('EDUCATION'),
          makeParagraph({
            text: `${profile.education[0].institution} ${profile.education[0].degree} (${profile.education[0].period})`,
            spacing: { after: 0, line: LAYOUT.line.body },
          }),
        ],
      },
    ],
  })

const exportDocx = async () => {
  const document = createDocxDocument()
  const buffer = await Packer.toBuffer(document)
  writeFileSync(docxPath, buffer)
}

const exportPdf = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: process.platform === 'linux' ? ['--no-sandbox', '--disable-setuid-sandbox'] : [],
  })

  try {
    const page = await browser.newPage()
    await page.setContent(renderPdfHtml(), { waitUntil: 'networkidle0' })
    await page.emulateMediaType('print')
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: false,
      preferCSSPageSize: true,
      margin: {
        top: '0in',
        right: '0in',
        bottom: '0in',
        left: '0in',
      },
    })
    writeFileSync(pdfPath, pdfBuffer)
  } finally {
    await browser.close()
  }
}

mkdirSync(outputDir, { recursive: true })

try {
  await exportDocx()
} catch (error) {
  if (error?.code !== 'EBUSY') {
    throw error
  }

  console.warn(`Skipped DOCX export because the file is locked: ${docxPath}`)
}

await exportPdf()

console.log(`Exported DOCX: ${docxPath}`)
console.log(`Exported PDF: ${pdfPath}`)
