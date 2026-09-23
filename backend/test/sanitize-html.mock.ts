export default function sanitizeHtml(html: string) {
  return html.replace(/<[^>]*>/g, '').trim();
}
