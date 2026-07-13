(function () {
  function initCharts() {
    var p1 = "rgba(109,40,217,0.8)",
      p2 = "rgba(147,51,234,0.5)",
      p3 = "rgba(192,132,252,0.7)",
      g = "rgba(232,184,75,0.8)";
    var tc = "rgba(255,255,255,0.6)",
      gc = "rgba(255,255,255,0.05)";

    var fsiEl = document.getElementById("fsiChart");
    if (fsiEl && typeof Chart !== "undefined") {
      new Chart(fsiEl, {
        type: "bar",
        data: {
          labels: ["Mumbai\nIsland", "Mumbai\nTOD", "Pune\nGeneral", "Pune\nTOD", "Nagpur", "Thane", "Nashik", "Aurangabad"],
          datasets: [
            { label: "Base FSI", data: [1.33, 1.0, 2.5, 2.0, 1.5, 1.5, 1.0, 1.0], backgroundColor: p1, borderRadius: 4 },
            { label: "Max Permissible", data: [4.0, 5.0, 4.0, 4.0, 4.0, 3.0, 2.0, 2.5], backgroundColor: p2, borderRadius: 4 },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: "bottom", labels: { color: tc, boxWidth: 10, font: { size: 10 } } } },
          scales: {
            x: { ticks: { color: tc, font: { size: 9 } }, grid: { display: false } },
            y: { ticks: { color: tc }, grid: { color: gc } },
          },
        },
      });
    }

    var priceEl = document.getElementById("priceChart");
    if (priceEl && typeof Chart !== "undefined") {
      new Chart(priceEl, {
        type: "line",
        data: {
          labels: ["2020", "2021", "2022", "2023", "2024", "2025"],
          datasets: [
            { label: "Mumbai", data: [15200, 15800, 16400, 17200, 17900, 18430], borderColor: "#9333EA", tension: 0.4, fill: false, pointRadius: 3, pointBackgroundColor: "#9333EA" },
            { label: "Pune", data: [5200, 5600, 6100, 6800, 7300, 7820], borderColor: "#C084FC", tension: 0.4, fill: false, pointRadius: 3, pointBackgroundColor: "#C084FC" },
            { label: "Nagpur", data: [3800, 4000, 4300, 4700, 5000, 5320], borderColor: "#E8B84B", tension: 0.4, fill: false, pointRadius: 3, pointBackgroundColor: "#E8B84B" },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: "bottom", labels: { color: tc, boxWidth: 10, font: { size: 10 } } } },
          scales: {
            x: { ticks: { color: tc }, grid: { display: false } },
            y: {
              ticks: {
                color: tc,
                callback: function (v) {
                  return "₹" + v.toLocaleString();
                },
              },
              grid: { color: gc },
            },
          },
        },
      });
    }

    var pieEl = document.getElementById("pieChart");
    if (pieEl && typeof Chart !== "undefined") {
      new Chart(pieEl, {
        type: "doughnut",
        data: {
          labels: ["Residential", "Commercial", "Plot/Land", "Industrial"],
          datasets: [{ data: [62, 21, 12, 5], backgroundColor: ["#6D28D9", "#9333EA", "#C084FC", "#E8B84B"], borderWidth: 0 }],
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, cutout: "68%" },
      });
    }
  }

  window.addEventListener("load", function () {
    initCharts();
  });
})();
