(function () {
  var checks = [
    { label: { en: "30-Year Title Chain Verified", mr: "३० वर्षांची मालमत्ता साखळी" }, weight: 20, checked: true },
    { label: { en: "Encumbrance Certificate — Clear", mr: "भार प्रमाणपत्र — स्वच्छ" }, weight: 20, checked: true },
    { label: { en: "NA Permission Obtained (Sec. 44 MLR)", mr: "एनए परवानगी मिळाली" }, weight: 15, checked: true },
    { label: { en: "Property Tax — Fully Paid", mr: "मालमत्ता कर — भरलेला" }, weight: 10, checked: false },
    { label: { en: "RERA Registration Verified", mr: "RERA नोंदणी सत्यापित" }, weight: 15, checked: true },
    { label: { en: "OC / CC Available", mr: "व्याप प्रमाणपत्र उपलब्ध" }, weight: 10, checked: true },
    { label: { en: "No Litigation on Record", mr: "कोणतीही खटला नाही" }, weight: 10, checked: false },
  ];

  function currentLang() {
    return localStorage.getItem("mahaatlas_v1_lang") || "en";
  }

  window.renderChecks = function () {
    var lang = currentLang();
    var html = "";
    checks.forEach(function (c, i) {
      html +=
        '<div class="check-item"><div class="toggle-wrap"><input type="checkbox"' +
        (c.checked ? " checked" : "") +
        ' onchange="window.toggleCheck(' +
        i +
        ',this.checked)"><div class="toggle-track"></div><div class="toggle-thumb"></div></div><div class="check-text">' +
        c.label[lang] +
        '</div><div class="check-weight">' +
        c.weight +
        "pt</div></div>";
    });
    var list = document.getElementById("checkList");
    if (list) list.innerHTML = html;
    window.updateRisk();
  };

  window.toggleCheck = function (i, v) {
    checks[i].checked = v;
    window.updateRisk();
  };

  window.updateRisk = function () {
    var total = checks.reduce(function (a, c) {
      return a + (c.checked ? c.weight : 0);
    }, 0);
    var pct = Math.min(100, total);
    var needle = 100 - pct;
    var needleEl = document.getElementById("riskNeedle");
    var scoreEl = document.getElementById("riskScore");
    var labelEl = document.getElementById("riskLabel");
    if (needleEl) needleEl.style.left = needle + "%";
    if (scoreEl) scoreEl.textContent = pct;
    if (labelEl) {
      var lbl = pct >= 80 ? "LOW RISK — Strong Title" : pct >= 50 ? "MODERATE RISK — Verify Pending Items" : "HIGH RISK — Major Issues Found";
      var col = pct >= 80 ? "#4ade80" : pct >= 50 ? "#facc15" : "#f87171";
      labelEl.textContent = lbl;
      if (scoreEl) scoreEl.style.color = col;
    }
  };

  window.mahaatlasSecurityRefresh = function () {
    window.renderChecks();
  };

  window.addEventListener("load", function () {
    if (document.getElementById("checkList")) window.renderChecks();
  });
})();
