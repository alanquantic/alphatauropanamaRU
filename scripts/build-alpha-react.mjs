import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT_URL = 'https://alphatauropanama.com/'
const LOCAL_PREFIX = '/public_clean/alphatauropanama/alphatauropanama.com'
const PAGE_DIR = path.resolve('src/pages/alphatauropanama')
const BODY_MODULE_PATH = path.join(PAGE_DIR, 'mirroredBody.js')
const CSS_PATH = path.join(PAGE_DIR, 'mirrored.css')
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36'

function repairMojibake(source) {
  if (!/[ÃÂâ]/.test(source)) return source
  return Buffer.from(source, 'latin1').toString('utf8')
}

function decodeCommonEntities(source) {
  return source
    .replace(/&#038;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
}

function rewriteAbsoluteUrls(source) {
  return source
    .replace(/https:\/\/alphatauropanama\.com\/?/g, `${LOCAL_PREFIX}/`)
    .replace(/(["'(])\/(?!\/|public_clean\/)/g, `$1${LOCAL_PREFIX}/`)
}

function stripScripts(source) {
  return source.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gis, '')
}

function stripBodyLinks(source) {
  return source.replace(/<link\b[^>]*rel=["']stylesheet["'][^>]*>\s*/gi, '')
}

function extractAll(regex, source) {
  return [...source.matchAll(regex)].map((match) => match[1])
}

function escapeForTemplateLiteral(source) {
  return source.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${')
}

async function fetchHtml(url) {
  const response = await fetch(url, {
    headers: {
      'user-agent': USER_AGENT,
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`)
  }

  return Buffer.from(await response.arrayBuffer()).toString('utf8')
}

async function main() {
  const remoteHtml = await fetchHtml(ROOT_URL)
  const headMatch = remoteHtml.match(/<head[^>]*>([\s\S]*?)<\/head>/i)
  const bodyMatch = remoteHtml.match(/<body([^>]*)>([\s\S]*?)<\/body>/i)

  if (!headMatch || !bodyMatch) {
    throw new Error('Unable to extract head/body from remote page.')
  }

  const headHtml = repairMojibake(decodeCommonEntities(headMatch[1]))
  const bodyAttributes = bodyMatch[1]
  let bodyHtml = repairMojibake(decodeCommonEntities(bodyMatch[2]))

  const bodyClassMatch = bodyAttributes.match(/class=["']([^"']+)["']/i)
  const bodyClasses = bodyClassMatch?.[1]?.split(/\s+/).filter(Boolean) ?? []

  const cssLinks = extractAll(
    /<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["'][^>]*>/gi,
    headHtml,
  )
  const inlineStyles = extractAll(/<style[^>]*>([\s\S]*?)<\/style>/gi, headHtml)

  const cssImports = cssLinks
    .map((href) => rewriteAbsoluteUrls(href))
    .filter((href, index, list) => list.indexOf(href) === index)
    .map((href) => `@import url("${href}");`)
    .join('\n')

  const cssContent = `${cssImports}\n\n${inlineStyles
    .map((style) => rewriteAbsoluteUrls(style))
    .join('\n\n')}\n`

  bodyHtml = rewriteAbsoluteUrls(stripBodyLinks(stripScripts(bodyHtml)))

  const bodyModule = `export const bodyClasses = ${JSON.stringify(bodyClasses)}

export const bodyHtml = String.raw\`${escapeForTemplateLiteral(bodyHtml)}\`
`

  await fs.mkdir(PAGE_DIR, { recursive: true })
  await fs.writeFile(BODY_MODULE_PATH, bodyModule)
  await fs.writeFile(CSS_PATH, cssContent)

  console.log(
    JSON.stringify(
      {
        bodyModule: BODY_MODULE_PATH,
        cssFile: CSS_PATH,
      },
      null,
      2,
    ),
  )
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
