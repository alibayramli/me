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
  TabStopType,
  TextRun,
  VerticalAlignTable,
  WidthType,
} from 'docx'
import puppeteer from 'puppeteer'

const rootDir = resolve(import.meta.dirname, '..')
const siteContentPath = resolve(rootDir, 'src/content/site-content.json')
const defaultOutputDir = resolve(rootDir, 'public/resume')

const cliArgs = process.argv.slice(2)
const readCliArgument = (name) => {
  const index = cliArgs.indexOf(name)

  if (index === -1) {
    return null
  }

  const value = cliArgs[index + 1]

  if (!value || value.startsWith('--')) {
    throw new Error(`Missing value for ${name}`)
  }

  return value
}

const targetConfigPath = readCliArgument('--target')
const requestedOutputDir = readCliArgument('--output-dir')
const outputDir = requestedOutputDir ? resolve(rootDir, requestedOutputDir) : defaultOutputDir

const siteContent = JSON.parse(readFileSync(siteContentPath, 'utf8'))
const {
  profile: baseProfile,
  skillCategories = [],
  experiences: baseExperiences,
  projects,
} = siteContent

const defaultResumeSkillLines = skillCategories.map(
  (category) => `${category.title}: ${category.skills.join(', ')}`,
)

let profile = baseProfile
let experiences = baseExperiences
let selectedProjects = projects

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
    body: 22,
    title: 30,
    contact: 22,
    section: 26,
    company: 24,
    role: 22,
    date: 21,
    tech: 21,
  },
  line: {
    title: 240,
    summary: 220,
    section: 220,
    body: 220,
    tech: 220,
    contact: 220,
  },
  spacing: {
    titleAfter: 60,
    contactCellBottom: 10,
    summaryBefore: 145,
    summaryAfter: 90,
    sectionBefore: 190,
    sectionAfter: 50,
    bulletAfter: 4,
    bulletBefore: 4,
    techBefore: 12,
    companyAfter: 20,
    roleAfter: 10,
    entryAfter: 125,
    employerBefore: 240,
    roleBefore: 140,
    projectBefore: 0,
    singleLineAfter: 30,
  },
  bullet: {
    left: 900,
    hanging: 260,
  },
  experience: {
    inset: 180,
    bulletLeft: 520,
    bulletHanging: 220,
  },
  contactColumnInsets: [0, 350, 590],
  tableColumnWidths: [3300, 3300, 5306],
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
const contactColumnPercentages = (() => {
  const totalWidth = LAYOUT.tableColumnWidths.reduce((sum, width) => sum + width, 0)

  return LAYOUT.tableColumnWidths.map((width) => formatCssNumber((width / totalWidth) * 100))
})()
const PDF_LAYOUT = {
  lineHeight: {
    title: '1.02',
    body: '1.03',
    summary: '1.04',
    section: '1.02',
    tech: '1.03',
    contact: '1.05',
  },
  spacing: {
    summaryBefore: 170,
    summaryAfter: 120,
    sectionBefore: 250,
    sectionAfter: 70,
    bulletBefore: 8,
    bulletAfter: 10,
    techBefore: 16,
    companyAfter: 4,
    roleAfter: 2,
    entryAfter: 140,
    singleLineAfter: 45,
  },
  contactPadding: {
    columnGap: 8,
    secondColumnInset: 14,
    thirdColumnInset: 24,
  },
}

const buildContactRows = (currentProfile) => [
  [
    { label: 'Location', text: currentProfile.location },
    {
      label: 'Phone',
      text: currentProfile.phone,
      href: `tel:${currentProfile.phone}`,
    },
    {
      label: 'Email',
      text: currentProfile.email,
      href: `mailto:${currentProfile.email}`,
    },
  ],
  [
    {
      text: displayUrl(currentProfile.siteUrl),
      href: currentProfile.siteUrl,
    },
    {
      text: displayUrl(currentProfile.github),
      href: currentProfile.github,
    },
    {
      text: displayUrl(currentProfile.linkedin),
      href: currentProfile.linkedin,
    },
  ],
]

let contactRows = buildContactRows(profile)

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
  tabStops,
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
    tabStops,
    children: children ?? [makeRun(value)],
  })

const createContactCell = (cell, alignment, widthPercentage, columnIndex) =>
  new TableCell({
    width: { size: widthPercentage, type: WidthType.PERCENTAGE },
    margins: {
      top: 0,
      right: 0,
      bottom: LAYOUT.spacing.contactCellBottom,
      left: LAYOUT.contactColumnInsets[columnIndex] ?? 0,
    },
    borders: TABLE_BORDERS,
    verticalAlign: VerticalAlignTable.CENTER,
    children: [
      makeParagraph({
        alignment,
        spacing: { after: 0, line: LAYOUT.line.contact },
        run: { size: LAYOUT.sizes.contact },
        children: cell
          ? [
              ...(cell.label
                ? [
                    makeRun(`${cell.label}:`, { size: LAYOUT.sizes.contact }),
                    makeRun(' ', { size: LAYOUT.sizes.contact }),
                  ]
                : []),
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
          children: cells.map((cell, index) =>
            createContactCell(
              cell,
              AlignmentType.LEFT,
              Number(contactColumnPercentages[index]),
              index,
            ),
          ),
        }),
    ),
  })

const createBullets = (items, indent = LAYOUT.bullet) =>
  items.map((item) =>
    makeParagraph({
      text: item,
      bullet: { level: 0 },
      indent: {
        left: indent.left,
        hanging: indent.hanging,
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

const createExperienceNodes = (experience, index) => {
  const showCompany = index === 0 || experiences[index - 1].company !== experience.company
  return [
    ...(showCompany
      ? [
          makeParagraph({
            children: [makeRun(experience.company, { bold: true, size: LAYOUT.sizes.company })],
            spacing: {
              before: index > 0 ? LAYOUT.spacing.employerBefore : 0,
              after: LAYOUT.spacing.companyAfter,
              line: LAYOUT.line.body,
            },
            keepNext: true,
          }),
        ]
      : []),
    makeParagraph({
      children: [
        makeRun(experience.role, {
          bold: true,
          size: LAYOUT.sizes.role,
        }),
        makeRun(`\t${experience.period}`, { size: LAYOUT.sizes.date }),
      ],
      indent: { left: LAYOUT.experience.inset },
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: LAYOUT.page.width - LAYOUT.page.margins.left - LAYOUT.page.margins.right,
        },
      ],
      run: { size: LAYOUT.sizes.role },
      spacing: {
        before: showCompany ? 0 : LAYOUT.spacing.roleBefore,
        after: LAYOUT.spacing.roleAfter,
        line: LAYOUT.line.body,
      },
      keepNext: true,
    }),
    ...createBullets(experience.bullets, {
      left: LAYOUT.experience.bulletLeft,
      hanging: LAYOUT.experience.bulletHanging,
    }),
    makeParagraph({
      indent: { left: LAYOUT.experience.inset },
      spacing: {
        before: LAYOUT.spacing.techBefore,
        after: 0,
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
  const descriptionChildren = [makeRun(project.description)]

  if (project.links?.github) {
    descriptionChildren.push(makeRun('', { break: 1 }))
    descriptionChildren.push(makeRun('GitHub: '))
    descriptionChildren.push(makeLink(displayRepo(project.links.github), project.links.github))
  }

  return [
    makeParagraph({
      children: [makeRun(project.title, { bold: true, size: LAYOUT.sizes.company })],
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
  return cell.label ? `<span class="contact-label">${text(cell.label)}:</span> ${value}` : value
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

  const renderExperience = (experience, index) => {
    const showCompany = index === 0 || experiences[index - 1].company !== experience.company
    return `
      <div class="experience-entry ${showCompany ? (index > 0 ? 'new-employer' : '') : 'next-role'}">
        ${showCompany ? `<p class="company">${text(experience.company)}</p>` : ''}
        <p class="role"><strong>${text(experience.role)}</strong><span class="date">${text(experience.period)}</span></p>
        ${renderBullets(experience.bullets)}
        <p class="tech"><strong>Technologies:</strong> ${text(experience.tech.join(', '))}</p>
      </div>`
  }

  const renderProject = (project) => {
    const source = project.links?.github
      ? `<br />GitHub: ${inlineLink(project.links.github, displayRepo(project.links.github))}`
      : ''

    return `
      <div class="entry">
        <p class="company">${text(project.title)}</p>
        <p class="project-detail">${text(project.description)}${source}</p>
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
        padding: 0 ${pt(PDF_LAYOUT.contactPadding.columnGap)} ${twipsToCss(LAYOUT.spacing.contactCellBottom)} 0;
        vertical-align: top;
        font-size: ${halfPointsToCss(LAYOUT.sizes.contact)};
        line-height: ${PDF_LAYOUT.lineHeight.contact};
        white-space: nowrap;
      }

      .contact-table td:last-child {
        padding-right: 0;
      }

      .contact-table td:nth-child(2) {
        padding-left: ${pt(PDF_LAYOUT.contactPadding.secondColumnInset)};
      }

      .contact-table td:nth-child(3) {
        padding-left: ${pt(PDF_LAYOUT.contactPadding.thirdColumnInset)};
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

      .experience-entry {
        padding-left: ${twipsToCss(LAYOUT.experience.inset)};
        break-inside: avoid;
      }

      .experience-entry .company {
        margin-left: -${twipsToCss(LAYOUT.experience.inset)};
        margin-bottom: ${twipsToCss(LAYOUT.spacing.companyAfter)};
      }

      .new-employer {
        margin-top: ${twipsToCss(LAYOUT.spacing.employerBefore)};
      }

      .next-role {
        margin-top: ${twipsToCss(LAYOUT.spacing.roleBefore)};
      }

      .experience-entry .compact-list {
        margin-left: ${twipsToCss(LAYOUT.experience.bulletLeft - LAYOUT.experience.inset)};
      }

      .company,
      .role,
      .tech,
      .project-detail,
      .single-line {
        margin: 0;
      }

      .company {
        font-size: ${halfPointsToCss(LAYOUT.sizes.company)};
        font-weight: 700;
        margin-bottom: ${pt(PDF_LAYOUT.spacing.companyAfter)};
      }

      .role {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 12pt;
        font-size: ${halfPointsToCss(LAYOUT.sizes.role)};
        margin-bottom: ${pt(PDF_LAYOUT.spacing.roleAfter)};
      }

      .date {
        flex-shrink: 0;
        font-size: ${halfPointsToCss(LAYOUT.sizes.date)};
        font-weight: 400;
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
      <h1>${text(profile.name)}, ${text(profile.title)}</h1>
      <table class="contact-table" role="presentation">
        <colgroup>
          ${contactColumnPercentages.map((width) => `<col style="width:${width}%">`).join('')}
        </colgroup>
        ${renderContactRows()}
      </table>

      <p class="summary">${text(profile.summary)}</p>

      <p class="section-title">SKILLS</p>
      ${renderBullets(profile.resumeSkillLines)}

      <p class="section-title">WORK EXPERIENCE</p>
      ${experiences.map(renderExperience).join('')}

      <p class="section-title">PERSONAL PROJECTS</p>
      ${selectedProjects.map(renderProject).join('')}

      <p class="section-title">LANGUAGES</p>
      <p class="single-line">${text(profile.languages.join(' | '))}</p>

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
              makeRun(`${profile.name}, ${profile.title}`, {
                bold: true,
                size: LAYOUT.sizes.title,
              }),
            ],
          }),
          createContactTable(),
          makeParagraph({
            text: profile.summary,
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
            text: profile.languages.join(' | '),
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

const exportDocx = async (docxPath) => {
  const document = createDocxDocument()
  const buffer = await Packer.toBuffer(document)
  writeFileSync(docxPath, buffer)
}

const exportPdf = async (pdfPath) => {
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

const canonicalResume = {
  label: 'Canonical resume',
  outputBaseName: 'Ali_Bayramli_Resume',
  title: baseProfile.title,
  summary: baseProfile.summary,
  skillLines: defaultResumeSkillLines,
  projectTitles: projects.map(({ title }) => title),
  experienceOverrides: {},
}

const variantsToExport = targetConfigPath
  ? [JSON.parse(readFileSync(resolve(rootDir, targetConfigPath), 'utf8'))]
  : [canonicalResume]

const experienceKey = (experience) => `${experience.company}::${experience.role}`

const validateExperienceTechOverrides = (variant) => {
  for (const [key, override] of Object.entries(variant.experienceOverrides ?? {})) {
    const matches = baseExperiences.filter(
      (item) => experienceKey(item) === key || item.company === key,
    )
    if (matches.length > 1) {
      throw new Error(
        `Ambiguous experience override: ${key}. Use Company::Role to select one role.`,
      )
    }
    const [experience] = matches

    if (!experience) {
      throw new Error(`Unknown experience override: ${key}`)
    }

    const unsupportedTech = (override.tech ?? []).filter(
      (technology) => !experience.tech.includes(technology),
    )

    if (unsupportedTech.length > 0) {
      throw new Error(
        `${key} resume override contains technologies missing from the portfolio: ${unsupportedTech.join(', ')}`,
      )
    }
  }
}

for (const variant of variantsToExport) {
  if (!/^[A-Za-z0-9._-]+$/.test(variant.outputBaseName ?? '')) {
    throw new Error(`Invalid outputBaseName: ${variant.outputBaseName}`)
  }

  validateExperienceTechOverrides(variant)

  profile = {
    ...baseProfile,
    title: variant.title ?? baseProfile.title,
    summary: variant.summary ?? baseProfile.summary,
    resumeSkillLines: variant.skillLines ?? defaultResumeSkillLines,
  }
  experiences = baseExperiences.map((experience) => {
    const override =
      variant.experienceOverrides?.[experienceKey(experience)] ??
      variant.experienceOverrides?.[experience.company]

    if (!override) {
      return experience
    }

    return {
      ...experience,
      bullets: override.bullets ?? experience.bullets,
      tech: override.tech ?? experience.tech,
    }
  })
  selectedProjects = variant.projectTitles
    .map((title) => projects.find((project) => project.title === title))
    .filter(Boolean)
  contactRows = buildContactRows(profile)

  const docxPath = resolve(outputDir, `${variant.outputBaseName}.docx`)
  const pdfPath = resolve(outputDir, `${variant.outputBaseName}.pdf`)
  let docxExported = false

  try {
    await exportDocx(docxPath)
    docxExported = true
  } catch (error) {
    if (error?.code !== 'EBUSY') {
      throw error
    }

    console.warn(`Skipped DOCX export because the file is locked: ${docxPath}`)
  }

  await exportPdf(pdfPath)

  if (docxExported) {
    console.log(`Exported ${variant.label} DOCX: ${docxPath}`)
  }
  console.log(`Exported ${variant.label} PDF: ${pdfPath}`)
}
