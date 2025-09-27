// lib/markdown.js
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

export function markdownToHtml(markdown) {
  return md.render(markdown || '');
}