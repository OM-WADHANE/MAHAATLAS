import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const extracted = path.join(__dirname, "_extracted");

const nav = [
  { id: "overview", href: "overview.html", tab: "Overview", drawer: "Overview", icon: "📊", headerTitle: "Real Estate Dashboard" },
  { id: "fsi", href: "fsi.html", tab: "FSI Atlas", drawer: "FSI Atlas", icon: "🗺", headerTitle: "FSI Atlas" },
  { id: "landrecords", href: "landrecords.html", tab: "Land Records", drawer: "Land Records", icon: "📋", headerTitle: "Land Records Search" },
  { id: "listings", href: "listings.html", tab: "Buy / Sell", drawer: "Buy / Sell", icon: "🏠", headerTitle: "Buy / Sell Properties" },
  { id: "legal", href: "legal.html", tab: "Legal Hub", drawer: "Legal Hub", icon: "⚖️", headerTitle: "Legal Hub" },
  { id: "security", href: "security.html", tab: "Security", drawer: "Security Analysis", icon: "🔒", headerTitle: "Security Analysis" },
  { id: "broker", href: "broker.html", tab: "Broker", drawer: "Broker", icon: "🤝", headerTitle: "Broker Module" },
  { id: "about", href: "about.html", tab: "About", drawer: "About", icon: "ℹ️", headerTitle: "About MahaAtlas" },
];

function shell(pageId, headerTitle, bodyContent, scripts) {
  const tabs = nav
    .map(
      (n) =>
        `<a href="${n.href}" class="tab-item" data-nav="${n.id}">${n.tab}</a>`
    )
    .join("\n    ");
  const drawers = nav
    .map(
      (n) =>
        `<a href="${n.href}" class="drawer-item" data-nav="${n.id}"><span class="di-icon">${n.icon}</span><span>${n.drawer}</span></a>`
    )
    .join("\n    ");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MahaAtlas — ${headerTitle}</title>
  <link rel="stylesheet" href="assets/civitas-v1.css" />
</head>
<body data-page="${pageId}">
<div class="drawer-overlay" id="overlay" onclick="closeDrawer()"></div>
<div class="drawer" id="drawer">
  <div class="drawer-head">
    <div class="drawer-logo">
      <div class="dlogo">C</div>
      <div>
        <div class="dtitle">MahaAtlas</div>
        <div class="drawer-sub">v1.0.0 · Civitas Atlas Co. Pune</div>
      </div>
    </div>
  </div>
  <div class="drawer-nav">
    ${drawers}
  </div>
  <div class="drawer-foot">Developed by Civitas Atlas Technologies Pvt. Ltd. · MahaRERA Compliant</div>
</div>

<div class="main-header">
  <div class="header-bar">
    <div class="hamburger" onclick="openDrawer()"><span></span><span></span><span></span></div>
    <div class="header-center">
      <div class="header-title" id="headerTitle">${headerTitle}</div>
      <div class="header-sub">MahaAtlas · Maharashtra Property Intelligence</div>
    </div>
    <div class="header-actions">
      <button class="h-btn active-lang" id="langBtn" onclick="toggleLang()">EN</button>
      <div class="theme-toggle"><input type="checkbox" id="themeToggle" onchange="toggleTheme()" /><div class="tt-track"></div><div class="tt-thumb">☀</div></div>
    </div>
  </div>
  <div class="tab-scroll" id="tabScroll">
    ${tabs}
  </div>
</div>

<div id="clients-mount"></div>

<div class="content">
${bodyContent}
</div>

<footer class="site-footer-v1">
  Civitas Atlas Technologies Pvt. Ltd. · MahaRERA Compliant ·
  <a href="https://civitasatlas.vercel.app" target="_blank" rel="noopener noreferrer">civitasatlas.vercel.app</a>
</footer>

${scripts}
</body>
</html>
`;
}

const pageFiles = [
  { id: "overview", extract: "overview.html", chart: true, js: "civitas-v1-overview.js" },
  { id: "fsi", extract: "fsi.html", chart: false, js: null },
  { id: "landrecords", extract: "landrecords.html", chart: false, js: "civitas-v1-land.js" },
  { id: "listings", extract: "listings.html", chart: false, js: "civitas-v1-listings.js" },
  { id: "legal", extract: "legal.html", chart: false, js: "civitas-v1-legal.js" },
  { id: "security", extract: "security.html", chart: false, js: "civitas-v1-security.js" },
  { id: "broker", extract: "broker.html", chart: false, js: "civitas-v1-broker.js" },
  { id: "about", extract: "about.html", chart: false, js: null },
];

for (const p of pageFiles) {
  const meta = nav.find((n) => n.id === p.id);
  let inner = fs.readFileSync(path.join(extracted, p.extract), "utf8");
  if (p.id === "about") {
    inner = inner.replace(/<div class="page-single">\s*/i, "");
  }
  inner = inner.replace('<div class="section" id="', '<div class="section active" id="');

  const chartScript = p.chart
    ? '<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js"></script>\n'
    : "";
  const pageScript = p.js
    ? `  <script src="assets/${p.js}"></script>\n`
    : "";
  const scripts = `${chartScript}  <script src="assets/civitas-v1-core.js"></script>\n${pageScript}`;

  const html = shell(p.id, meta.headerTitle, inner, scripts);
  const outName = `${p.id}.html`;
  fs.writeFileSync(path.join(__dirname, outName), html);
  console.log("wrote", outName);
}
