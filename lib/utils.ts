export function cleanText(text: string) {
  return text.trim().replace(/\s+/g, " ");
}

export function shortText(text: string, max = 120) {
  return text.length > max ? text.slice(0, max) + "..." : text;
}
