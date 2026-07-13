(function () {
  window.calcBrokerage = function () {
    var val = parseInt(document.getElementById("brkVal").value, 10) || 0;
    var rate = parseFloat(document.getElementById("brkRate").value) / 100;
    var mult = parseInt(document.getElementById("brkParty").value, 10);
    var brk = Math.round(val * rate * mult);
    var gst = Math.round(brk * 0.18);
    var total = brk + gst;
    document.getElementById("commAmt").textContent = "₹" + total.toLocaleString("en-IN");
    document.getElementById("commNote").textContent =
      "Brokerage ₹" + brk.toLocaleString("en-IN") + " + GST 18% ₹" + gst.toLocaleString("en-IN");
  };

  window.addEventListener("load", function () {
    if (document.getElementById("brkVal")) window.calcBrokerage();
  });
})();
