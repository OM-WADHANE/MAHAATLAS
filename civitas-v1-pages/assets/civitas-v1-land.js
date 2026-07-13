/* civitas-v1-land.js — Maharashtra 36 Districts + Talukas
   Searchable custom dropdowns for District & Taluka
   MahaAtlas · Civitas Atlas Technologies */
(function () {

  /* ── COMPLETE 36-DISTRICT → TALUKA MAP ──────────────────── */
  var MH_DATA = {
    "Mumbai City":       ["Borivali","Dahisar","Kandivali","Malad","Goregaon","Jogeshwari","Andheri","Vile Parle","Santacruz","Khar","Bandra","Kurla","Chembur","Ghatkopar","Vikhroli","Mulund","Bhandup","Kanjurmarg"],
    "Mumbai Suburban":   ["Andheri","Borivali","Kurla"],
    "Thane":             ["Thane","Kalyan","Bhiwandi","Ulhasnagar","Murbad","Shahpur","Ambarnath","Titwala","Vasai-Virar","Palghar","Dahanu","Talasari","Jawhar","Mokhada","Vada","Vikramgad","Wada"],
    "Palghar":           ["Palghar","Vasai","Dahanu","Talasari","Jawhar","Mokhada","Vikramgad","Wada"],
    "Raigad":            ["Alibag","Pen","Panvel","Uran","Khalapur","Karjat","Roha","Murud","Mangaon","Mahad","Poladpur","Shrivardhan","Mhasala","Tala","Sudhagad","Patalganga"],
    "Ratnagiri":         ["Ratnagiri","Chiplun","Guhagar","Dapoli","Mandangad","Khed","Lanja","Sangameshwar","Rajapur"],
    "Sindhudurg":        ["Kankavli","Kudal","Malvan","Devgad","Vengurla","Dodamarg","Sawantwadi","Vaibhavwadi"],
    "Pune":              ["Haveli","Pune City","Khed","Ambegaon","Junnar","Maval","Mulshi","Bhor","Velhe","Purandar","Baramati","Indapur","Shirur","Daund","Phaltan"],
    "Satara":            ["Satara","Patan","Javali","Koregaon","Karad","Phaltan","Wai","Man","Khatav","Khandala"],
    "Sangli":            ["Miraj","Sangli","Tasgaon","Jat","Atpadi","Khanapur","Kavthemahankal","Walwa","Shirala","Palus"],
    "Kolhapur":          ["Kolhapur","Karvir","Kagal","Hatkanangle","Shirol","Radhanagari","Chandgad","Ajra","Bhudargad","Gadhinglaj","Bavda","Gaganbavda"],
    "Solapur":           ["Solapur North","Solapur South","Akkalkot","Barshi","Mohol","Pandharpur","Mangalvedhe","Malshiras","Sangola","Karmala","Madha"],
    "Nashik":            ["Nashik","Sinnar","Dindori","Niphad","Yeola","Chandwad","Malegaon","Baglan","Kalwan","Deola","Peint","Trimbakeshwar","Igatpuri","Surgana"],
    "Dhule":             ["Dhule","Sakri","Shirpur","Sindkheda"],
    "Nandurbar":         ["Nandurbar","Shahada","Navapur","Taloda","Akkalkuwa","Akrani"],
    "Jalgaon":           ["Jalgaon","Amalner","Erandol","Dharangaon","Bhusawal","Raver","Muktainagar","Bodwad","Yawal","Bhadgaon","Chalisgaon","Pachora","Jamner","Parola","Chopda"],
    "Ahmednagar":        ["Ahmednagar","Nagar","Rahata","Kopargaon","Shevgaon","Pathardi","Shrigonda","Karjat","Jamkhed","Nevasa","Rahuri","Parner","Sangamner","Akole","Mangaon"],
    "Beed":              ["Beed","Ambajogai","Kaij","Parli","Dharur","Shirur Kasar","Ashti","Majalgaon","Georai","Patoda","Wadwani"],
    "Latur":             ["Latur","Udgir","Nilanga","Deoni","Renapur","Chakur","Shirur Anantpal","Ausa","Ahmedpur"],
    "Osmanabad":         ["Osmanabad","Tuljapur","Kalamb","Lohara","Omerga","Paranda","Washi","Bhoom"],
    "Nanded":            ["Nanded","Loha","Kandhar","Kinwat","Mukhed","Biloli","Deglur","Hadgaon","Bhokar","Naigaon","Ardhapur","Umri","Mudkhed","Dharmabad","Himayatnagar"],
    "Parbhani":          ["Parbhani","Gangakhed","Pathri","Selu","Manwath","Jintur","Sonpeth","Palman"],
    "Hingoli":           ["Hingoli","Basmat","Kalamnuri","Sengaon","Aundha Nagnath"],
    "Jalna":             ["Jalna","Ambad","Partur","Badnapur","Bhokardan","Jafrabad","Mantha","Ghansavangi"],
    "Chhatrapati Sambhajinagar": ["Aurangabad","Paithan","Gangapur","Vaijapur","Kannad","Sillod","Soegaon","Phulambri"],
    "Dharashiv":         ["Osmanabad","Tuljapur","Kalamb","Lohara","Omerga","Paranda","Washi","Bhoom"],
    "Buldhana":          ["Buldhana","Chikhli","Deulgaon Raja","Jalgaon Jamod","Sangrampur","Malkapur","Nandura","Khamgaon","Motala","Lonar","Mehkar","Sindkhed Raja","Shegaon"],
    "Akola":             ["Akola","Akot","Balapur","Patur","Murtizapur","Telhara","Barshitakli"],
    "Washim":            ["Washim","Malegaon","Risod","Manora","Karanja","Mangrulpir"],
    "Amravati":          ["Amravati","Nandgaon Khandeshwar","Daryapur","Anjangaon Surji","Achalpur","Chandur Bazar","Chandur Railway","Dharni","Chikhaldara","Warud","Morshi","Dhamangaon Railway","Bhatkuli","Tiosa","Teosa"],
    "Yavatmal":          ["Yavatmal","Wani","Maregaon","Ralegaon","Ghatanji","Kelapur","Pandharkawada","Zari Jamani","Babhulgaon","Arni","Nandgaon","Pusad","Umarkhed","Mahagaon","Kalamb"],
    "Wardha":            ["Wardha","Seloo","Deoli","Arvi","Ashti","Karanja","Samudrapur","Hinganghat"],
    "Nagpur":            ["Nagpur City","Nagpur Rural","Katol","Narkhed","Savner","Hingna","Kamptee","Butibori","Kalmeshwar","Parseoni","Mouda","Ramtek","Umred","Kuhi","Bhiwapur"],
    "Bhandara":          ["Bhandara","Tumsar","Mohadi","Sakoli","Lakhani","Pauni","Lakhandur"],
    "Gondiya":           ["Gondiya","Tirora","Goregaon","Arjuni Morgaon","Sadak Arjuni","Amgaon","Deori","Salekasa"],
    "Chandrapur":        ["Chandrapur","Mul","Ballarpur","Warora","Bhadravati","Chimur","Nagbhid","Sindewahi","Rajura","Korpana","Jiwati","Gondpipri","Bramhapuri","Pombhurna","Savali"],
    "Gadchiroli":        ["Gadchiroli","Armori","Desaiganj","Wadsa","Aheri","Sironcha","Kurkheda","Mulchera","Bhamragad","Chamorshi","Korchi","Dhanora","Etapalli"],
    "Gondia":            ["Gondia","Tirora","Goregaon","Arjuni-Morga","Sadak-Arjuni","Amgaon","Deori","Salekasa"]
  };

  /* ── SEARCHABLE DROPDOWN ────────────────────────────────── */
  function SearchableDropdown(config) {
    /* config: { inputId, listId, hiddenId, placeholder, items, onSelect } */
    var input  = document.getElementById(config.inputId);
    var list   = document.getElementById(config.listId);
    var hidden = config.hiddenId ? document.getElementById(config.hiddenId) : null;
    if (!input || !list) return;

    var allItems = config.items || [];
    var open = false;

    function render(items) {
      if (!items.length) {
        list.innerHTML = '<div class="sd-no-result">No results found</div>';
      } else {
        list.innerHTML = items.map(function(item) {
          return '<div class="sd-item" data-val="' + item + '">' + item + '</div>';
        }).join("");
        list.querySelectorAll(".sd-item").forEach(function(el) {
          el.addEventListener("mousedown", function(e) {
            e.preventDefault();
            select(el.getAttribute("data-val"));
          });
        });
      }
    }

    function show() {
      render(filter(input.value));
      list.style.display = "block";
      open = true;
    }

    function hide() {
      list.style.display = "none";
      open = false;
    }

    function filter(q) {
      q = q.trim().toLowerCase();
      if (!q) return allItems.slice(0, 80);
      return allItems.filter(function(i){ return i.toLowerCase().includes(q); });
    }

    function select(val) {
      input.value = val;
      if (hidden) hidden.value = val;
      hide();
      if (config.onSelect) config.onSelect(val);
    }

    /* public API */
    this.setItems = function(items) {
      allItems = items;
      if (open) render(filter(input.value));
    };
    this.clear = function() {
      input.value = "";
      if (hidden) hidden.value = "";
      allItems = [];
      hide();
    };
    this.getValue = function() { return hidden ? hidden.value : input.value; };

    input.addEventListener("focus", show);
    input.addEventListener("input", function() { render(filter(input.value)); if (!open) show(); });
    input.addEventListener("blur",  function() { setTimeout(hide, 150); });
  }

  /* ── INIT ───────────────────────────────────────────────── */
  var districtDD, talukaDD;

  window.addEventListener("DOMContentLoaded", function() {
    var districtNames = Object.keys(MH_DATA).sort();

    districtDD = new SearchableDropdown({
      inputId:   "distInput",
      listId:    "distList",
      hiddenId:  "distHidden",
      placeholder: "Search district…",
      items: districtNames,
      onSelect: function(dist) {
        /* populate taluka dropdown for chosen district */
        var talukas = (MH_DATA[dist] || []).slice().sort();
        if (talukaDD) talukaDD.setItems(talukas);
        var ti = document.getElementById("talukaInput");
        if (ti) { ti.value = ""; ti.disabled = false; ti.placeholder = "Search taluka…"; }
      }
    });

    talukaDD = new SearchableDropdown({
      inputId:   "talukaInput",
      listId:    "talukaList",
      hiddenId:  "talukaHidden",
      placeholder: "Select district first…",
      items: []
    });

    var ti = document.getElementById("talukaInput");
    if (ti) ti.disabled = true;
  });

  /* ── SEARCH ─────────────────────────────────────────────── */
  window.doSearch = function () {
    var num  = (document.getElementById("survInput") ? document.getElementById("survInput").value : "") ||
               (document.getElementById("survInputNew") ? document.getElementById("survInputNew").value : "");
    var dist = document.getElementById("distHidden")   ? document.getElementById("distHidden").value   : "";
    var tal  = document.getElementById("talukaHidden") ? document.getElementById("talukaHidden").value : "";
    var rt   = document.getElementById("recType")      ? document.getElementById("recType").value      : "";

    var info = [dist, tal, num].filter(Boolean).join(" · ") || "—";
    document.getElementById("rec-results").innerHTML =
      '<div style="padding:20px;text-align:center;color:var(--text2);font-size:12px;background:var(--bg2);border:1px solid var(--border);border-radius:var(--r);">' +
      'Searching <strong style="color:var(--acc)">' + rt + '</strong> records for <strong style="color:var(--text)">' + info + '</strong>...' +
      '<br><span style="color:var(--text3);font-size:10px;margin-top:6px;display:block;">Connected to Mahabhulekh · iGRAS · DLR Portal</span></div>';
  };

})();
