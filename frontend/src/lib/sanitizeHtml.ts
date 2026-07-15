import DOMPurify from 'dompurify';

const ALLOWED_TAGS = [
  'p', 'br', 'strong', 'em', 'u', 's', 'a', 'ul', 'ol', 'li',
  'blockquote', 'h2', 'h3', 'span',
];
const ALLOWED_ATTR = ['href', 'target', 'rel', 'class'];

function normalizeRichTextWhitespace(html: string): string {
  return html.replace(/&nbsp;/gi, ' ').replace(/\u00a0/g, ' ');
}

/**
 * Sanitize HTML content produced by the rich text editor before rendering
 * it with dangerouslySetInnerHTML. Only safe to call in the browser (DOMPurify
 * relies on the DOM), so guard for SSR by returning the raw string server-side
 * — React will still escape untrusted output on the client re-render.
 */
export function sanitizeHtml(html: string): string {
  const normalizedHtml = normalizeRichTextWhitespace(html);

  if (typeof window === 'undefined') {
    return normalizedHtml;
  }

  return DOMPurify.sanitize(normalizedHtml, { ALLOWED_TAGS, ALLOWED_ATTR });
}

/**
 * Strip HTML tags to produce a plain-text excerpt from rich text content.
 */
export function stripHtml(html: string): string {
  return normalizeRichTextWhitespace(html).replace(/<(.|\n)*?>/g, ' ').replace(/\s+/g, ' ').trim();
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

const htmlTagPattern = /<[a-z][\s\S]*?>/i;
const markdownMarkerPattern = /^\s*(#{2,3}\s|-\s)/m;

/**
 * Flatten HTML block/line-break tags back into plain-text lines so a
 * mangled document (e.g. legacy Markdown-lite text that got wrapped in
 * stray <p>/<br> tags after passing through the rich text editor once)
 * can be re-parsed from scratch.
 */
function htmlToPlainLines(html: string): string {
  return html
    .replace(/<\s*br\s*\/?>/gi, '\n')
    .replace(/<\/\s*(p|div|li|h[1-6]|blockquote)\s*>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

/**
 * Convert lightweight Markdown (##, ###, - lists, blank-line paragraphs)
 * plain text into semantic HTML.
 */
function markdownLiteToHtml(text: string): string {
  const lines = text.split('\n').map((line) => line.trim());
  const htmlParts: string[] = [];
  let paragraphBuffer: string[] = [];
  let i = 0;

  const flushParagraph = () => {
    if (paragraphBuffer.length > 0) {
      htmlParts.push(`<p>${paragraphBuffer.map(escapeHtml).join('<br>')}</p>`);
      paragraphBuffer = [];
    }
  };

  while (i < lines.length) {
    const line = lines[i];

    if (!line) {
      flushParagraph();
      i++;
      continue;
    }

    const h3Match = line.match(/^###\s+(.*)/);
    const h2Match = !h3Match ? line.match(/^##\s+(.*)/) : null;
    if (h2Match || h3Match) {
      flushParagraph();
      const match = (h2Match || h3Match) as RegExpMatchArray;
      const tag = h3Match ? 'h3' : 'h2';
      htmlParts.push(`<${tag}>${escapeHtml(match[1])}</${tag}>`);
      i++;
      continue;
    }

    if (/^-\s+/.test(line)) {
      flushParagraph();
      const items: string[] = [];
      while (i < lines.length && /^-\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^-\s+/, ''));
        i++;
      }
      htmlParts.push(`<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`);
      continue;
    }

    paragraphBuffer.push(line);
    i++;
  }
  flushParagraph();

  return htmlParts.join('');
}

/**
 * Normalize article content into clean, structured display HTML.
 *
 * Handles three cases:
 * 1. Legacy plain text (paragraphs separated by blank lines) -> wrapped in <p> tags.
 * 2. Legacy Markdown-lite text (## / ### headings, "- " list items) — even if it has
 *    already been mangled into stray <p>/<br> tags by opening it once in the rich
 *    text editor — is flattened back to plain text and re-parsed into proper
 *    semantic HTML (headings, lists, paragraphs).
 * 3. Genuine rich HTML from the editor with no literal Markdown markers is passed
 *    through untouched (only sanitized), preserving intentional bold/italic/links/etc.
 */
export function toDisplayHtml(content: string): string {
  const hasHtml = htmlTagPattern.test(content);
  const plainForCheck = hasHtml ? htmlToPlainLines(content) : content;

  if (markdownMarkerPattern.test(plainForCheck)) {
    return markdownLiteToHtml(plainForCheck);
  }

  if (hasHtml) {
    return content;
  }

  return content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => `<p>${escapeHtml(block).replace(/\n/g, '<br>')}</p>`)
    .join('');
}

/**
 * Convenience helper: normalizes legacy/mangled content to clean HTML, then
 * sanitizes the result for safe rendering via dangerouslySetInnerHTML.
 */
export function renderArticleContent(content: string): string {
  return sanitizeHtml(toDisplayHtml(content));
}
