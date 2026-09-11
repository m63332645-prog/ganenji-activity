/* eslint-disable */
// Post-build: download every distinct remote image URL referenced in the
// already-built single-file HTML and rewrite those references as base64
// data URIs so the page is fully self-contained.
//
// Usage: node scripts/inline-remote-images.cjs <htmlPath>

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const htmlPath = process.argv[2];
if (!htmlPath) {
  console.error('Usage: node inline-remote-images.cjs <htmlPath>');
  process.exit(1);
}

const absPath = path.resolve(htmlPath);
let html = fs.readFileSync(absPath, 'utf8');
console.log(`Loaded ${absPath} (${(html.length / 1024).toFixed(1)} KB)`);

// Match http(s) URLs that point to images (by extension) or contain
// "unsplash.com" / known image hosts. We pick anything that looks like a
// remote image inside quotes.
const urlRegex = /https?:\/\/[^\s"'<>]+\.(?:png|jpe?g|gif|webp|svg)(\?[^\s"'<>]*)?/gi;
const remoteUrls = new Set();
let m;
while ((m = urlRegex.exec(html)) !== null) {
  remoteUrls.add(m[0]);
}

// Also include any unsplash.com URLs that don't end in an explicit extension
// (they often use query params only).
const unsplashRegex = /https?:\/\/images\.unsplash\.com\/[^\s"'<>]+/gi;
while ((m = unsplashRegex.exec(html)) !== null) {
  remoteUrls.add(m[0]);
}

console.log(`Found ${remoteUrls.size} distinct remote image URL(s) to inline`);

function fetchBuffer(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 5) {
      reject(new Error(`Too many redirects for ${url}`));
      return;
    }
    const client = url.startsWith('https') ? https : http;
    const req = client.get(
      url,
      {
        headers: {
          // Pretend to be a normal browser so CDNs don't block us.
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
          Accept: 'image/*,*/*;q=0.8',
        },
        timeout: 30000,
      },
      (res) => {
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          const next = new URL(res.headers.location, url).toString();
          res.resume();
          fetchBuffer(next, redirectCount + 1).then(resolve, reject);
          return;
        }
        if (res.statusCode !== 200) {
          res.resume();
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve({ buffer: Buffer.concat(chunks), contentType: res.headers['content-type'] }));
      }
    );
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy(new Error(`timeout fetching ${url}`));
    });
  });
}

function guessMime(url, contentType) {
  if (contentType && contentType.startsWith('image/')) return contentType;
  const u = url.toLowerCase();
  if (u.endsWith('.png')) return 'image/png';
  if (u.endsWith('.jpg') || u.endsWith('.jpeg')) return 'image/jpeg';
  if (u.endsWith('.gif')) return 'image/gif';
  if (u.endsWith('.webp')) return 'image/webp';
  if (u.endsWith('.svg')) return 'image/svg+xml';
  return 'image/jpeg';
}

async function main() {
  let ok = 0;
  let fail = 0;
  // Sequential to keep `html` mutations deterministic across many occurrences.
  for (const url of remoteUrls) {
    try {
      const { buffer, contentType } = await fetchBuffer(url);
      const mime = guessMime(url, contentType);
      const b64 = buffer.toString('base64');
      const dataUri = `data:${mime};base64,${b64}`;
      // Count occurrences before replacing (String.prototype.split is
      // regex-free and safe for any literal string).
      const parts = html.split(url);
      const before = parts.length - 1;
      if (before > 0) {
        html = parts.join(dataUri);
      }
      console.log(
        `  ok  ${url.substring(0, 80)}${url.length > 80 ? '...' : ''} -> ${mime} ${(buffer.length / 1024).toFixed(1)} KB (replaced ${before}x)`
      );
      ok++;
    } catch (e) {
      console.warn(`  FAIL ${url}: ${e.message}`);
      fail++;
    }
  }
  console.log(`\nInlined ${ok} image(s); ${fail} failure(s)`);

  fs.writeFileSync(absPath, html, 'utf8');
  const newSize = fs.statSync(absPath).size;
  console.log(`Wrote ${absPath} (${(newSize / 1024 / 1024).toFixed(2)} MB)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
