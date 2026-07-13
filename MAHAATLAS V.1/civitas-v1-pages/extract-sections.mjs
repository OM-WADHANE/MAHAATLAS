import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const t = fs.readFileSync(path.join(root, "civitas_atlas_dpg_pune_v1.html"), "utf8");

function between(start, end) {
  const i = t.indexOf(start) + start.length;
  const j = t.indexOf(end, i);
  return t.slice(i, j).trim();
}

const pairs = [
  ["overview", "<!-- OVERVIEW -->", "<!-- FSI ATLAS -->"],
  ["fsi", "<!-- FSI ATLAS -->", "<!-- LAND RECORDS -->"],
  ["landrecords", "<!-- LAND RECORDS -->", "<!-- LISTINGS -->"],
  ["listings", "<!-- LISTINGS -->", "<!-- LEGAL HUB -->"],
  ["legal", "<!-- LEGAL HUB -->", "<!-- SECURITY -->"],
  ["security", "<!-- SECURITY -->", "<!-- BROKER -->"],
  ["broker", "<!-- BROKER -->", "<!-- ABOUT -->"],
];

const outDir = path.join(__dirname, "_extracted");
fs.mkdirSync(outDir, { recursive: true });

for (const [name, a, b] of pairs) {
  let html = between(a, b);
  html = html.replace(/^\s*<div class="section[^"]*">\s*/i, '<div class="page-single">\n');
  html = html.replace(/\s*<\/div>\s*$/i, "\n</div>");
  fs.writeFileSync(path.join(outDir, `${name}.html`), html);
}

const aboutStart = "<!-- ABOUT -->";
const i = t.indexOf(aboutStart) + aboutStart.length;
const j = t.indexOf("\n</div>\n\n<script", i);
let about = t.slice(i, j).trim();
about = about.replace(/^\s*<div class="section[^"]*">\s*/i, "");
about = about.replace(/\s*<\/div>\s*$/i, "");
fs.writeFileSync(path.join(outDir, "about.html"), `<div class="page-single">\n${about}\n</div>`);

console.log("extracted to", outDir);
