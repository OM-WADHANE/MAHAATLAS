(function () {
  window.calcStamp = function () {
    var ag = parseInt(document.getElementById("propVal").value, 10) || 0;
    var rr = parseInt(document.getElementById("rrVal").value, 10) || 0;
    var base = Math.max(ag, rr);
    var loc = document.getElementById("txLoc").value;
    var tx = document.getElementById("txType").value;
    var woman = document.getElementById("womanBuyer").checked;
    var rate = 0.05,
      metro = 0,
      label = "Stamp Duty";
    if (tx === "sale") {
      if (loc === "mumbai") {
        rate = woman ? 0.04 : 0.05;
        metro = 0.01;
      } else {
        rate = woman ? 0.04 : 0.05;
      }
    } else if (tx === "gift") {
      rate = 0.02;
    } else if (tx === "lease") {
      rate = 0.005;
      label = "Stamp Duty (Lease)";
    } else if (tx === "mortgage") {
      rate = 0.003;
      label = "Stamp Duty (Mortgage)";
    } else if (tx === "partition") {
      rate = 0.02;
      label = "Stamp Duty (Partition)";
    }
    var stamp = Math.round(base * rate);
    var metroAmt = Math.round(base * metro);
    var regFee = Math.min(Math.round(ag * 0.01), 30000);
    var total = stamp + metroAmt + regFee;
    document.getElementById("totalOut").textContent = "₹" + total.toLocaleString("en-IN");
    document.getElementById("stampRows").innerHTML =
      '<div class="cr-row"><span>' +
      label +
      " (" +
      (rate * 100).toFixed(1) +
      '%)</span><span>₹' +
      stamp.toLocaleString("en-IN") +
      "</span></div>" +
      (metroAmt ? '<div class="cr-row"><span>Metro Cess (1%)</span><span>₹' + metroAmt.toLocaleString("en-IN") + "</span></div>" : "") +
      '<div class="cr-row"><span>Registration Fee</span><span>₹' +
      regFee.toLocaleString("en-IN") +
      '</span></div><div class="cr-row"><span>TOTAL OUTGO</span><span>₹' +
      total.toLocaleString("en-IN") +
      "</span></div>";
  };

  window.addEventListener("load", function () {
    if (document.getElementById("propVal")) window.calcStamp();
  });
})();
