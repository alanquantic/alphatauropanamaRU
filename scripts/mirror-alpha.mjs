import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT_URL = 'https://alphatauropanama.com/'
const OUTPUT_ROOT = path.resolve('public_clean/alphatauropanama')
const SNAPSHOT_DIR = path.resolve('.mirror_tmp/alphatauropanama')
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36'
const MAX_RETRIES = 3

const visited = new Set()
const downloaded = new Map()

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

function ensureAbsoluteUrl(rawUrl, baseUrl) {
  if (!rawUrl) return null
  const trimmed = rawUrl.trim()
  if (!trimmed || trimmed.startsWith('data:') || trimmed.startsWith('javascript:') || trimmed.startsWith('#')) {
    return null
  }
  try {
    return new URL(trimmed, baseUrl).toString()
  } catch {
    return null
  }
}

function sanitizePathname(urlObj) {
  let pathname = decodeURIComponent(urlObj.pathname)
  if (pathname.endsWith('/')) {
    pathname += 'index.html'
  }
  if (!path.extname(pathname)) {
    pathname += '.html'
  }
  return pathname.replace(/^\/+/, '')
}

function localPublicPathFor(urlString) {
  const urlObj = new URL(urlString)
  const pathname = sanitizePathname(urlObj)
  const querySuffix = urlObj.search
    ? `__${Buffer.from(urlObj.search).toString('base64url').slice(0, 20)}`
    : ''
  const ext = path.extname(pathname)
  const base = pathname.slice(0, pathname.length - ext.length)
  const relativePath = path.posix.join(urlObj.hostname, `${base}${querySuffix}${ext}`)
  const aliasRelativePath = path.posix.join(urlObj.hostname, pathname)
  return {
    filePath: path.join(OUTPUT_ROOT, ...relativePath.split('/')),
    publicPath: `/public_clean/alphatauropanama/${relativePath.replace(/\\/g, '/')}`,
    aliasFilePath: path.join(OUTPUT_ROOT, ...aliasRelativePath.split('/')),
  }
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      'user-agent': USER_AGENT,
    },
  })
  if (!response.ok) {
    throw new Error(`Failed ${response.status} ${response.statusText} for ${url}`)
  }
  return response.text()
}

async function fetchBuffer(url) {
  const response = await fetch(url, {
    headers: {
      'user-agent': USER_AGENT,
    },
  })
  if (!response.ok) {
    throw new Error(`Failed ${response.status} ${response.statusText} for ${url}`)
  }
  return Buffer.from(await response.arrayBuffer())
}

async function fetchMaybeText(url) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          'user-agent': USER_AGENT,
        },
      })
      if (!response.ok) {
        console.warn(`Skipping ${response.status} for ${url}`)
        return null
      }
      return response.text()
    } catch (error) {
      if (attempt === MAX_RETRIES) {
        console.warn(`Skipping fetch failure for ${url}: ${error.message}`)
        return null
      }
      await sleep(500 * attempt)
    }
  }
}

async function fetchMaybeBuffer(url) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          'user-agent': USER_AGENT,
        },
      })
      if (!response.ok) {
        console.warn(`Skipping ${response.status} for ${url}`)
        return null
      }
      return Buffer.from(await response.arrayBuffer())
    } catch (error) {
      if (attempt === MAX_RETRIES) {
        console.warn(`Skipping fetch failure for ${url}: ${error.message}`)
        return null
      }
      await sleep(500 * attempt)
    }
  }
}

function collectUrlsFromText(text, baseUrl) {
  const urls = new Set()
  const patterns = [
    /\b(?:href|src|poster)=["']([^"'#]+)["']/gi,
    /\bsrcset=["']([^"']+)["']/gi,
    /url\(([^)]+)\)/gi,
    /https?:\/\/[^"')\s]+/gi,
  ]

  for (const pattern of patterns) {
    let match
    while ((match = pattern.exec(text))) {
      const raw = match[1] ?? match[0]
      if (!raw) continue
      if (pattern.source.includes('srcset')) {
        raw.split(',').forEach((part) => {
          const candidate = part.trim().split(/\s+/)[0]
          const absolute = ensureAbsoluteUrl(candidate, baseUrl)
          if (absolute) urls.add(absolute)
        })
        continue
      }
      const cleaned = raw.replace(/^['"]|['"]$/g, '').trim()
      const absolute = ensureAbsoluteUrl(cleaned, baseUrl)
      if (absolute) urls.add(absolute)
    }
  }

  return [...urls]
}

function rewriteRemoteUrls(text) {
  let next = text
  for (const [remoteUrl, localUrl] of downloaded.entries()) {
    const variants = [remoteUrl, remoteUrl.replace(/&/g, '&amp;')]
    for (const variant of variants) {
      next = next.split(variant).join(localUrl)
    }
  }
  return next
}

async function downloadAsset(url) {
  if (visited.has(url)) return
  visited.add(url)

  const urlObj = new URL(url)
  const isSameHost = urlObj.hostname === 'alphatauropanama.com'
  const isFontHost = ['fonts.googleapis.com', 'fonts.gstatic.com'].includes(urlObj.hostname)
  const isGoogleRecaptcha = urlObj.hostname.includes('google.com') || urlObj.hostname.includes('gstatic.com')

  if (!isSameHost && !isFontHost) return
  if (isGoogleRecaptcha) return

  const { filePath, publicPath, aliasFilePath } = localPublicPathFor(url)
  downloaded.set(url, publicPath)

  try {
    await fs.access(filePath)
    if (aliasFilePath !== filePath) {
      try {
        await fs.access(aliasFilePath)
      } catch {
        await fs.mkdir(path.dirname(aliasFilePath), { recursive: true })
        const existingContent = await fs.readFile(filePath)
        await fs.writeFile(aliasFilePath, existingContent)
      }
    }
    return
  } catch {
    // Continue when the file does not exist yet.
  }

  if (url.endsWith('.css') || url.includes('.css?')) {
    const cssText = await fetchMaybeText(url)
    if (cssText === null) return
    const nestedUrls = collectUrlsFromText(cssText, url)
    await fs.mkdir(path.dirname(filePath), { recursive: true })
    let rewrittenCss = cssText
    for (const nestedUrl of nestedUrls) {
      await downloadAsset(nestedUrl)
    }
    rewrittenCss = rewriteRemoteUrls(rewrittenCss)
    await fs.writeFile(filePath, rewrittenCss)
    if (aliasFilePath !== filePath) {
      await fs.mkdir(path.dirname(aliasFilePath), { recursive: true })
      await fs.writeFile(aliasFilePath, rewrittenCss)
    }
    return
  }

  const buffer = await fetchMaybeBuffer(url)
  if (buffer === null) return
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, buffer)
  if (aliasFilePath !== filePath) {
    await fs.mkdir(path.dirname(aliasFilePath), { recursive: true })
    await fs.writeFile(aliasFilePath, buffer)
  }
}

async function main() {
  await fs.mkdir(OUTPUT_ROOT, { recursive: true })
  await fs.mkdir(SNAPSHOT_DIR, { recursive: true })

  const html = await fetchText(ROOT_URL)
  await fs.writeFile(path.join(SNAPSHOT_DIR, 'home-remote.html'), html)

  const assetUrls = collectUrlsFromText(html, ROOT_URL).filter((url) => {
    const host = new URL(url).hostname
    return (
      host === 'alphatauropanama.com' ||
      host === 'fonts.googleapis.com' ||
      host === 'fonts.gstatic.com'
    )
  })

  for (const url of assetUrls) {
    await downloadAsset(url)
  }

  const rewrittenHtml = rewriteRemoteUrls(html)
  await fs.writeFile(path.join(SNAPSHOT_DIR, 'home-localized.html'), rewrittenHtml)

  console.log(
    JSON.stringify(
      {
        downloadedCount: downloaded.size,
        snapshotDir: SNAPSHOT_DIR,
        outputRoot: OUTPUT_ROOT,
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
