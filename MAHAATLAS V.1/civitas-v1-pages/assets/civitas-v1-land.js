(function () {
  window.doSearch = function () {
    var num = document.getElementById("survInput").value;
    if (!num) return;
    document.getElementById("rec-results").innerHTML =
      '<div style="padding:20px;text-align:center;color:var(--text2);font-size:12px;background:var(--bg2);border:1px solid var(--border);border-radius:var(--r);">Searching records for "' +
      num +
      '"...<br><span style="color:var(--acc);font-size:10px;">Connected to Mahabhulekh · iGRAS · DLR Portal</span></div>';
  };
})();
