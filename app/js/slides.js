(function () {
  const D = window.DASHBOARD_DATA || (typeof DASHBOARD_DATA !== "undefined" ? DASHBOARD_DATA : null);
  if (!D) return;

  const state = {
    index: 0,
    wheelLock: false,
    touchStartX: 0,
  };

  const slides = Array.from(document.querySelectorAll(".slide"));
  const rail = document.getElementById("slideRail");
  const counter = document.getElementById("deckCounter");
  const progressBar = document.getElementById("deckProgressBar");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const appendixBtn = document.getElementById("appendixBtn");
  const appendixClose = document.getElementById("appendixClose");
  const appendixDrawer = document.getElementById("appendixDrawer");
  const appendixBackdrop = document.getElementById("appendixBackdrop");
  const fullscreenBtn = document.getElementById("fullscreenBtn");
  const focusExitBtn = document.getElementById("focusExitBtn");
  const mediaLightbox = document.getElementById("mediaLightbox");
  const mediaLightboxBackdrop = document.getElementById("mediaLightboxBackdrop");
  const mediaLightboxClose = document.getElementById("mediaLightboxClose");
  const mediaLightboxImage = document.getElementById("mediaLightboxImage");
  const mediaLightboxTitle = document.getElementById("mediaLightboxTitle");
  const mediaLightboxCaption = document.getElementById("mediaLightboxCaption");
  const stage = document.getElementById("deckStage");
  const blackoutLayer = document.getElementById("blackoutLayer");

  const PUSKESMAS_COLORS = {
    blooto: "#2f6df6",
    mentikan: "#e04646",
    wates: "#0f9d72",
    gedongan: "#dd8a11",
    kranggan: "#7c4df4",
  };

  const TONE_VARS = {
    blue: "var(--blue)",
    cyan: "#0c99b8",
    purple: "var(--purple)",
    amber: "var(--amber)",
    red: "var(--red)",
    green: "var(--green)",
  };

  const RAIL_SUBLABELS = {
    "slide-cover": "pembuka",
    "slide-summary": "inti rapat",
    "slide-context": "konteks kota",
    "slide-study": "objek studi",
    "slide-decision": "pilihan lokasi",
    "slide-focus": "fokus kerja",
    "slide-diagram": "alur aksi",
    "slide-evidence": "rujukan",
    "slide-gantt": "rencana kerja",
    "slide-output": "hasil akhir",
    "slide-readiness": "persetujuan",
    "slide-closing": "penutup",
  };

  function formatInt(value) {
    return new Intl.NumberFormat("id-ID").format(value);
  }

  function formatDecimal(value, digits = 2) {
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(value);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function scoreTotal(puskesmasId) {
    return D.scoring.criteria.reduce((sum, criterion, index) => {
      return sum + (D.scoring.scores[puskesmasId][index] * criterion.bobot / 100);
    }, 0);
  }

  function accentFor(id) {
    return PUSKESMAS_COLORS[id] || "#2f6df6";
  }

  function toneVar(tone) {
    return TONE_VARS[tone] || "var(--blue)";
  }

  function renderCoverBadges() {
    const el = document.getElementById("coverBadges");
    const badges = [
      { value: "20 hari kerja", label: "rotasi efektif yang terukur" },
      { value: "Mentikan", label: "lokasi tahap awal" },
      { value: "tanpa membebani layanan", label: "prinsip kerja dengan mitra" },
    ];
    el.innerHTML = badges.map((badge) => `
      <div class="cover-badge">
        <strong>${escapeHtml(badge.value)}</strong>
        <span>${escapeHtml(badge.label)}</span>
      </div>
    `).join("");
  }

  function renderSummary() {
    const container = document.getElementById("summaryCards");
    const cards = [
      {
        title: "Nilai untuk Dekanat FKK",
        body: "Program ini menghadirkan wahana belajar kedokteran komunitas yang terstruktur, aman disupervisi, dan layak dinilai sebagai bukti capaian pembelajaran berbasis CPL dan SKDI.",
      },
      {
        title: "Nilai untuk Dinkes dan Puskesmas",
        body: "Mahasiswa memberi dukungan operasional yang ringan namun nyata: edukasi, perbaikan alur sederhana, monitoring, dan paket kerja yang siap dipakai di akhir rotasi.",
      },
      {
        title: "Keputusan yang dibutuhkan",
        body: "Rapat ini ditujukan untuk mengesahkan Mentikan sebagai lokasi tahap awal, menetapkan PIC lintas pihak, dan menyepakati bentuk serah terima pada akhir rotasi.",
      },
    ];
    container.innerHTML = cards.map((card) => `
      <article class="summary-card">
        <h3>${escapeHtml(card.title)}</h3>
        <p>${escapeHtml(card.body)}</p>
      </article>
    `).join("");
  }

  function renderContext() {
    const stats = document.getElementById("cityStats");
    const panels = document.getElementById("contextPanels");
    const items = [
      { value: D.nasional.jumlah_puskesmas_mojokerto_kota, label: "puskesmas kota", accent: "var(--blue)" },
      { value: "5", label: "wilayah studi", accent: "var(--purple)" },
      { value: formatInt(D.nasional.penduduk_kota_mojokerto), label: "penduduk", accent: "var(--green)" },
      { value: `${formatDecimal(D.nasional.luas_kota_mojokerto_km2, 2)} km2`, label: "luas kota", accent: "var(--amber)" },
    ];
    stats.innerHTML = items.map((item) => `
      <div class="stat-card-compact" style="--accent:${item.accent}">
        <strong>${escapeHtml(item.value)}</strong>
        <span>${escapeHtml(item.label)}</span>
      </div>
    `).join("");

    const contextCards = [
      {
        title: "Posisi program",
        items: [
          "Tahap awal dijalankan di satu wilayah kerja, bukan perombakan seluruh layanan kota.",
          "Komparatif inti dibatasi pada 5 wilayah kajian blok kedokteran komunitas; Kedundung tidak masuk kajian rotasi ini.",
        ],
        accent: "var(--blue)",
      },
      {
        title: "Parameter keberhasilan rapat",
        items: [
          "Sepakati lokasi tahap awal, fokus masalah, dan batas intervensi 20 hari.",
          "Pastikan hasil akhir yang diterima lokal: paket kerja, alur kerja singkat, logbook, dan serah terima.",
        ],
        accent: "var(--green)",
      },
    ];
    panels.innerHTML = contextCards.map((card) => `
      <article class="panel-card" style="--accent:${card.accent}">
        <div class="panel-label">${escapeHtml(card.title)}</div>
        <ul class="story-list">
          ${card.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </article>
    `).join("");
  }

  function renderStudy() {
    const container = document.getElementById("studyGrid");
    container.innerHTML = D.puskesmas.map((pkm) => {
      const visits = pkm.indicators && Number.isFinite(pkm.indicators.kunjungan_rj)
        ? formatInt(pkm.indicators.kunjungan_rj)
        : "-";
      const accent = accentFor(pkm.id);
      const flag = pkm.id === "mentikan"
        ? `<div class="study-flag">Lokasi tahap awal</div>`
        : `<div class="panel-label">${escapeHtml(pkm.kategori)}</div>`;
      return `
        <article class="study-card ${pkm.id === "mentikan" ? "is-target" : ""}" style="--accent:${accent}">
          ${flag}
          <h3>${escapeHtml(pkm.nama.replace("Puskesmas ", ""))}</h3>
          <div class="study-meta">
            <div class="study-meta-item">
              <strong>${formatInt(pkm.jumlah_penduduk)}</strong>
              <span>Penduduk wilayah kerja</span>
            </div>
            <div class="study-meta-item">
              <strong>${formatInt(pkm.total_sdm)}</strong>
              <span>Total SDM</span>
            </div>
            <div class="study-meta-item">
              <strong>${visits}</strong>
              <span>Kunjungan rawat jalan per tahun</span>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  function renderDecision() {
    const rankingList = document.getElementById("rankingList");
    const decisionReasons = document.getElementById("decisionReasons");
    const decisionFraming = document.getElementById("decisionFraming");

    const ranked = Object.keys(D.scoring.scores)
      .map((id) => ({
        id,
        label: D.puskesmas.find((pkm) => pkm.id === id)?.nama.replace("Puskesmas ", "") || id,
        score: scoreTotal(id),
      }))
      .sort((a, b) => b.score - a.score);

    const maxScore = ranked[0].score;
    rankingList.innerHTML = ranked.map((item, index) => `
      <div class="ranking-item" style="--accent:${accentFor(item.id)}">
        <div class="ranking-badge">${index + 1}</div>
        <div>
          <div class="ranking-copy">
            <strong>${escapeHtml(item.label)}</strong>
          </div>
          <div class="ranking-track">
            <div class="ranking-fill" style="width:${(item.score / maxScore) * 100}%"></div>
          </div>
        </div>
        <div class="ranking-score">${formatDecimal(item.score, 2)}</div>
      </div>
    `).join("");

    decisionReasons.innerHTML = D.communityMedicine.recommendation.rationale
      .slice(0, 3)
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");

    const framing = [
      "Keputusan ini menempatkan Mentikan sebagai lokasi implementasi awal, bukan sebagai penilaian mutu mutlak terhadap puskesmas lain.",
      "Pilihan lokasi diarahkan pada tempat yang paling memungkinkan untuk menunjukkan hasil yang selesai, terukur, dan dapat diserahterimakan dalam satu rotasi.",
    ];
    decisionFraming.innerHTML = framing.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  }

  function renderFocus() {
    const diseaseBars = document.getElementById("diseaseBars");
    const bridgeCopy = document.getElementById("bridgeCopy");
    const focusPills = document.getElementById("focusPills");

    const topDiseases = D.penyakit_kolektif.slice(0, 5);
    const maxDisease = topDiseases[0].total;
    diseaseBars.innerHTML = topDiseases.map((item) => `
      <div class="disease-row">
        <strong>${escapeHtml(item.nama)}</strong>
        <div class="disease-track">
          <div class="disease-fill" style="width:${(item.total / maxDisease) * 100}%"></div>
        </div>
        <span>${formatInt(item.total)}</span>
      </div>
    `).join("");

    bridgeCopy.textContent = "Beban penyakit kota dipakai sebagai konteks layanan. Fokus 20 hari di Mentikan diarahkan pada perilaku keluarga balita dan alur layanan yang paling mungkin dibenahi cepat.";

    const pills = [
      {
        title: "Target perilaku",
        body: "Kehadiran keluarga balita dan tindak lanjut setelah keluarga bersentuhan dengan layanan.",
      },
      {
        title: "Target layanan",
        body: "Pengingat, naskah edukasi ringkas, dan alur pencatatan ringan yang mudah dipakai petugas.",
      },
    ];

    focusPills.innerHTML = pills.map((pill) => `
      <div class="focus-pill">
        <strong>${escapeHtml(pill.title)}</strong>
        <span>${escapeHtml(pill.body)}</span>
      </div>
    `).join("");
  }

  function renderDiagram() {
    const diagramAim = document.getElementById("diagramAim");
    const driverGrid = document.getElementById("driverGrid");
    const serviceFlow = document.getElementById("serviceFlow");
    const driverDiagram = D.communityMedicine.visualToolkit.driverDiagram;

    diagramAim.innerHTML = `
      <strong>Sasaran perbaikan</strong>
      <p>${escapeHtml(driverDiagram.aim)}</p>
    `;

    driverGrid.innerHTML = driverDiagram.drivers.map((driver, index) => `
      <article class="driver-card" style="--accent:${Object.values(TONE_VARS)[index] || "var(--blue)"}">
        <strong>${escapeHtml(driver.title)}</strong>
        <div class="driver-actions">
          ${driver.actions.map((action) => `<span>${escapeHtml(action)}</span>`).join("")}
        </div>
      </article>
    `).join("");

    const steps = [
      {
        title: "Baseline dan pemetaan sasaran",
        body: "Data awal ditarik dan titik layanan keluarga balita dipetakan.",
      },
      {
        title: "Rancang titik layanan yang sederhana",
        body: "Naskah edukasi, pengingat, dan formulir tindak lanjut disusun bersama petugas.",
      },
      {
        title: "Pilot, perbaikan cepat, dan evaluasi mingguan",
        body: "Intervensi diuji terbatas, ditinjau bersama PIC lokal, lalu diperbaiki cepat.",
      },
      {
        title: "Serah terima ke puskesmas dan kader",
        body: "Produk akhir diserahkan dalam bentuk yang bisa langsung dipakai lokal.",
      },
    ];

    serviceFlow.innerHTML = `
      <article class="flow-card">
        <strong>Alur kerja yang diharapkan</strong>
        <div class="flow-steps">
          ${steps.map((step, index) => `
            <div class="flow-step">
              <div class="flow-step-index">${index + 1}</div>
              <div class="flow-step-copy">
                <strong>${escapeHtml(step.title)}</strong>
                <span>${escapeHtml(step.body)}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </article>
    `;
  }

  function renderEvidence() {
    const evidencePhotos = document.getElementById("evidencePhotos");
    const evidenceSources = document.getElementById("evidenceSources");
    const photoReferences = D.communityMedicine.visualToolkit.photoReferences || [];
    const photoCards = [
      photoReferences.find((item) => item.image && item.title.toLowerCase().includes("banner resmi kota mojokerto")),
      photoReferences.find((item) => item.image && item.title.toLowerCase().includes("kepadatan kawasan perkotaan mojokerto")),
    ].filter(Boolean);
    const sources = [
      {
        title: "Profil Kesehatan Kota Mojokerto 2024",
        note: "Sumber utama data konteks kota, kunjungan puskesmas, dan indikator layanan primer.",
        url: D.communityMedicine.visualToolkit.bibliography[0].url,
      },
      {
        title: "Profil Puskesmas Mentikan",
        note: "Rujukan untuk profil layanan, konteks lokasi, dan gambaran operasional wilayah kerja tahap awal.",
        url: D.communityMedicine.visualToolkit.bibliography[2].url,
      },
    ];

    evidencePhotos.innerHTML = photoCards.map((item) => `
      <article
        class="evidence-photo-card"
        tabindex="0"
        role="button"
        aria-label="${escapeHtml(`Buka visual ${item.title} dalam tampilan penuh`)}"
        data-lightbox-src="${escapeHtml(item.image)}"
        data-lightbox-title="${escapeHtml(item.title)}"
        data-lightbox-caption="${escapeHtml(item.note)}"
      >
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}">
        <button type="button" class="evidence-expand-btn" aria-hidden="true" tabindex="-1">Lihat penuh</button>
        <div class="evidence-photo-body">
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.note)}</span>
        </div>
      </article>
    `).join("");

    evidenceSources.innerHTML = sources.map((item) => `
      <article class="evidence-source-item">
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.note)}</span>
        <a href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">Buka sumber resmi</a>
      </article>
    `).join("");
  }

  function renderGantt() {
    const ganttWeekBands = document.getElementById("ganttWeekBands");
    const ganttDayLabels = document.getElementById("ganttDayLabels");
    const ganttRows = document.getElementById("ganttRows");
    const ganttMilestones = document.getElementById("ganttMilestones");
    const ganttMobile = document.getElementById("ganttMobile");
    const gantt = D.communityMedicine.implementationPlan.gantt;
    const weekPlans = D.communityMedicine.implementationPlan.weeks || [];
    const presentationTracks = [
      {
        title: "Baseline dan diagnosis",
        owner: "PIC Data dan Evaluasi",
        tone: "cyan",
        blocks: [
          {
            label: "Baseline audit dan sinkronisasi data",
            shortLabel: "Baseline audit",
            start: 1,
            end: 2,
            subtasks: [
              "D1: Kick-off, kontrak kerja, dan tarik data inti",
              "D2: Sinkronisasi baseline dan indikator prioritas",
            ],
          },
          {
            label: "Observasi lapangan dan framing masalah",
            shortLabel: "Observasi & framing",
            start: 3,
            end: 5,
            subtasks: [
              "D3-D4: Observasi wilayah, PUSTU, dan titik layanan",
              "D5: Framing masalah dan validasi awal bersama tim",
            ],
          },
        ],
      },
      {
        title: "Desain perilaku",
        owner: "PIC Edukasi",
        tone: "purple",
        blocks: [
          {
            label: "Diagnosis perilaku",
            shortLabel: "Diagnosis perilaku",
            start: 6,
            end: 7,
            subtasks: [
              "D6: Diagnosis COM-B untuk sasaran utama",
              "D7: Pilih target perilaku dan tuas perubahan",
            ],
          },
          {
            label: "Desain intervensi dan uji awal",
            shortLabel: "Desain & uji awal",
            start: 8,
            end: 10,
            subtasks: [
              "D8-D9: Desain bersama, materi, dan script lapangan",
              "D10: Uji awal dan finalisasi rancangan",
            ],
          },
        ],
      },
      {
        title: "Perangkat kerja dan alur",
        owner: "PIC Alur Layanan",
        tone: "amber",
        blocks: [
          {
            label: "Paket SOP, media, dan alur kerja",
            shortLabel: "Paket SOP & media",
            start: 7,
            end: 10,
            subtasks: [
              "D7-D8: Draft SOP mini, media, dan form sederhana",
              "D9-D10: Finalisasi paket pilot dan alur kerja",
            ],
          },
          {
            label: "Penyempurnaan alat kerja",
            shortLabel: "Penyempurnaan alat",
            start: 12,
            end: 17,
            subtasks: [
              "D12-D14: Perbaikan alat tahap 1",
              "D15-D17: Penyesuaian akhir alat dan form",
            ],
          },
        ],
      },
      {
        title: "Uji lapangan, evaluasi, dan transisi",
        owner: "Semua PIC",
        tone: "red",
        blocks: [
          {
            label: "Siklus uji dan iterasi lapangan",
            shortLabel: "Iterasi uji",
            start: 11,
            end: 15,
            subtasks: [
              "D11-D12: Uji lapangan 1",
              "D12-D13: Tinjauan 1",
              "D13-D14: Uji lapangan 2",
              "D14-D15: Tinjauan 2",
            ],
          },
          {
            label: "Ulasan komprehensif dan paket akhir",
            shortLabel: "Finalisasi",
            start: 16,
            end: 18,
            subtasks: [
              "D16-D17: Ulasan bersama",
              "D17-D18: Penyusunan paket akhir",
            ],
          },
          {
            label: "Pelatihan dan serah terima",
            shortLabel: "Handover",
            start: 18,
            end: 20,
            subtasks: [
              "D18-D19: Pelatihan PIC lokal",
              "D20: Serah terima resmi",
            ],
          },
        ],
      },
    ];
    const presentationMilestones = [
      { day: 1, label: "Kick-off dan kontrak", tone: "blue" },
      { day: 5, label: "Baseline dan masalah prioritas dikunci", tone: "cyan" },
      { day: 10, label: "Paket uji siap", tone: "purple" },
      { day: 20, label: "Paket akhir dan tindak lanjut diserahkan", tone: "green" },
    ];

    ganttWeekBands.innerHTML = gantt.weekBands.map((item) => `
      <div class="gantt-week-band" style="grid-column:${item.start} / ${item.end + 1}">
        <strong>${escapeHtml(item.label)}</strong>
        <span>${escapeHtml(item.focus)}</span>
      </div>
    `).join("");

    ganttDayLabels.innerHTML = gantt.dayLabels.map((label) => `
      <div class="gantt-day-chip">${escapeHtml(label)}</div>
    `).join("");

    ganttRows.innerHTML = presentationTracks.map((track) => `
      <div class="gantt-track-row">
        <div class="gantt-row-card">
          <strong>${escapeHtml(track.title)}</strong>
          <span>${escapeHtml(track.owner)}</span>
        </div>
        <div class="gantt-track-grid">
          ${gantt.dayLabels.map(() => '<div class="gantt-cell"></div>').join("")}
          ${track.blocks.map((block) => {
            const span = block.end - block.start + 1;
            const label = block.shortLabel || block.label;
            const dayRange = block.start === block.end
              ? `Hari ${block.start}`
              : `Hari ${block.start}-${block.end}`;
            const ariaText = `${block.label}. ${track.owner}. ${dayRange}.`;
            const subtasks = (block.subtasks || []).join("||");
            return `
              <div
                class="gantt-bar tone-${escapeHtml(track.tone)}"
                data-span="${span}"
                data-title="${escapeHtml(block.label)}"
                data-owner="${escapeHtml(track.owner)}"
                data-track="${escapeHtml(track.title)}"
                data-days="${escapeHtml(dayRange)}"
                data-subtasks="${escapeHtml(subtasks)}"
                style="grid-column:${block.start} / ${block.end + 1}"
                tabindex="0"
                role="button"
                aria-label="${escapeHtml(ariaText)}"
              >
                <span class="gantt-bar-label">${escapeHtml(label)}</span>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `).join("");

    ganttMilestones.innerHTML = presentationMilestones.map((milestone) => `
      <article class="gantt-milestone-card" style="--accent:${toneVar(milestone.tone)}">
        <strong>Hari ${escapeHtml(milestone.day)}</strong>
        <span>${escapeHtml(milestone.label)}</span>
      </article>
    `).join("");

    ganttMobile.innerHTML = weekPlans.map((week, index) => `
      <article class="gantt-mobile-week" style="--tone:${toneVar(["cyan", "purple", "amber", "red"][index] || "blue")}">
        <div class="gantt-mobile-head">
          <span>${escapeHtml(week.minggu)}</span>
          <strong>${escapeHtml(week.tema)}</strong>
        </div>
        <p class="gantt-mobile-focus">${escapeHtml(week.fokus)}</p>
        <div class="gantt-mobile-section">
          <div class="gantt-mobile-label">Fokus kerja</div>
          <ul class="gantt-mobile-list">
            ${week.kegiatan.slice(0, 3).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </div>
        <div class="gantt-mobile-section">
          <div class="gantt-mobile-label">Output minggu ini</div>
          <div class="gantt-mobile-chips">
            ${week.output.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}
          </div>
        </div>
      </article>
    `).join("");

    initGanttDetails();
  }

  function initGanttDetails() {
    const bars = Array.from(document.querySelectorAll(".gantt-bar"));
    const titleEl = document.getElementById("ganttDetailTitle");
    const daysEl = document.getElementById("ganttDetailDays");
    const ownerEl = document.getElementById("ganttDetailOwner");
    const trackEl = document.getElementById("ganttDetailTrack");
    const subtasksEl = document.getElementById("ganttDetailSubtasks");
    if (!bars.length || !titleEl || !daysEl || !ownerEl || !trackEl || !subtasksEl) return;

    let selectedBar = bars[0];
    let previewBar = null;

    const paint = (bar) => {
      bars.forEach((item) => item.classList.toggle("is-active", item === bar));
      titleEl.textContent = bar.dataset.title || "Detail aktivitas";
      daysEl.textContent = bar.dataset.days || "Hari kerja";
      ownerEl.textContent = `PIC: ${bar.dataset.owner || "Tim pelaksana"}`;
      trackEl.textContent = `Workstream: ${bar.dataset.track || "Rencana kerja"}`;
      const subtasks = (bar.dataset.subtasks || "")
        .split("||")
        .map((item) => item.trim())
        .filter(Boolean);
      if (subtasks.length) {
        subtasksEl.hidden = false;
        subtasksEl.innerHTML = subtasks.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
      } else {
        subtasksEl.hidden = true;
        subtasksEl.innerHTML = "";
      }
    };

    const sync = () => {
      paint(previewBar || selectedBar);
    };

    bars.forEach((bar) => {
      const preview = () => {
        previewBar = bar;
        sync();
      };
      const clearPreview = () => {
        if (previewBar === bar) {
          previewBar = null;
          sync();
        }
      };
      const select = () => {
        selectedBar = bar;
        previewBar = null;
        sync();
      };

      bar.addEventListener("mouseenter", preview);
      bar.addEventListener("mouseleave", clearPreview);
      bar.addEventListener("focus", preview);
      bar.addEventListener("blur", clearPreview);
      bar.addEventListener("click", select);
      bar.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        select();
      });
    });

    sync();
  }

  function renderOutput() {
    const rolePanel = document.getElementById("rolePanel");
    const deliverableList = document.getElementById("deliverableList");
    const guardrailList = document.getElementById("guardrailList");

    const roles = [
      {
        title: "Koordinator Lapangan",
        desc: "Menjaga ritme mingguan, koordinasi stakeholder, dan keputusan lanjut, sesuaikan, atau hentikan.",
      },
      {
        title: "PIC Data dan Evaluasi",
        desc: "Menyiapkan baseline, mengelola logbook, dan menyusun ringkasan serah terima.",
      },
      {
        title: "PIC Edukasi dan Perubahan Perilaku",
        desc: "Menyusun materi, naskah edukasi singkat, dan checklist pelaksanaan yang layak dijalankan oleh petugas maupun kader.",
      },
    ];
    rolePanel.innerHTML = roles.map((role) => `
      <article class="role-row">
        <strong>${escapeHtml(role.title)}</strong>
        <p>${escapeHtml(role.desc)}</p>
      </article>
    `).join("");

    deliverableList.innerHTML = D.communityMedicine.projection.deliverables
      .slice(0, 3)
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");

    guardrailList.innerHTML = D.communityMedicine.projection.guardrails
      .slice(0, 2)
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");
  }

  function renderReadiness() {
    const fkkAsk = document.getElementById("fkkAsk");
    const dinkesAsk = document.getElementById("dinkesAsk");
    const assuranceList = document.getElementById("assuranceList");
    const todayAskBand = document.getElementById("todayAskBand");
    const readiness = D.communityMedicine.meetingReadiness;

    fkkAsk.innerHTML = readiness.fkkDecisions
      .slice(0, 2)
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");

    dinkesAsk.innerHTML = readiness.dinkesDecisions
      .slice(0, 2)
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");

    assuranceList.innerHTML = readiness.assurances
      .slice(0, 2)
      .map((item) => `<li>${escapeHtml(item)}</li>`)
      .join("");

    todayAskBand.innerHTML = `
      <strong>${escapeHtml(readiness.todayAsk[0])}</strong>
      <span>${escapeHtml(readiness.todayAsk[1])}</span>
    `;
  }

  function renderClosing() {
    const closingValues = document.getElementById("closingValues");
    const items = [
      { value: "Akademik", label: "sesuai CPL, SKDI, dan supervisi profesi" },
      { value: "Operasional", label: "ringan bagi puskesmas dan mudah dipantau" },
      { value: "Etis", label: "data minimum, aman, dan tidak mengganggu layanan" },
      { value: "Berkelanjutan", label: "hasil akhir disiapkan untuk dipakai lokal" },
    ];
    closingValues.innerHTML = items.map((item) => `
      <div class="closing-value">
        <strong>${escapeHtml(item.value)}</strong>
        <span>${escapeHtml(item.label)}</span>
      </div>
    `).join("");
  }

  function renderAppendix() {
    const glossaryList = document.getElementById("glossaryList");
    const sourceList = document.getElementById("sourceList");
    const factNotes = document.getElementById("factNotes");
    const rpsObeIntro = document.getElementById("rpsObeIntro");
    const rpsIdentity = document.getElementById("rpsIdentity");
    const rpsCplList = document.getElementById("rpsCplList");
    const rpsCpmkList = document.getElementById("rpsCpmkList");
    const rpsRaeList = document.getElementById("rpsRaeList");
    const rpsAlignmentList = document.getElementById("rpsAlignmentList");
    const rpsObeNote = document.getElementById("rpsObeNote");
    const rpsObe = D.communityMedicine.rpsObe;

    const glossaryItems = [
      {
        title: "CPL",
        body: "Capaian Pembelajaran Lulusan, yaitu kompetensi tingkat program studi/fakultas yang harus dibuktikan mahasiswa.",
      },
      {
        title: "CPMK",
        body: "Capaian Pembelajaran Mata Kegiatan, yaitu hasil belajar spesifik blok atau rotasi yang diturunkan dari CPL.",
      },
      {
        title: "RAE",
        body: "Rencana Asesmen dan Evaluasi, yaitu komponen penilaian, bobot, evidence, dan cara menilai ketercapaian selama rotasi.",
      },
      {
        title: "N/D Balita",
        body: "N adalah jumlah balita yang naik berat badan, sedangkan D adalah jumlah balita yang ditimbang pada periode yang sama.",
      },
      ...D.indikatorGlosarium.items.map((item) => ({
        title: `${item.code} - ${item.label}`,
        body: item.desc,
      })),
    ];

    glossaryList.innerHTML = glossaryItems.map((item) => `
      <article class="glossary-item">
        <strong>${escapeHtml(item.title)}</strong>
        <p>${escapeHtml(item.body)}</p>
      </article>
    `).join("");

    sourceList.innerHTML = D.communityMedicine.visualToolkit.bibliography
      .slice(0, 6)
      .map((source) => `
        <article class="source-item">
          <strong>${escapeHtml(source.title)}</strong>
          <p>${escapeHtml(source.org)} - ${escapeHtml(source.note)}</p>
          <a href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer">${escapeHtml(source.url)}</a>
        </article>
      `).join("");

    const notes = [
      "Total puskesmas di Kota Mojokerto adalah 6, sedangkan wilayah kajian program ini dibatasi pada 5 wilayah kerja yang dibaca dalam analisis CM.",
      "Indikator hijau pada pembacaan balita memakai data resmi pemantauan tumbuh kembang, bukan SPM total puskesmas.",
      "Nilai N/D Balita Kranggan 2024 dibiarkan kosong karena belum ada sumber publik resmi yang benar-benar sebanding.",
      "Scoring dipakai untuk memilih lokasi implementasi awal, bukan untuk memberi cap baik atau buruk terhadap institusi.",
    ];
    factNotes.innerHTML = notes.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

    if (rpsObeIntro) {
      rpsObeIntro.textContent = rpsObe.subtitle;
    }

    if (rpsIdentity) {
      rpsIdentity.innerHTML = rpsObe.identity
        .map((item) => `<span>${escapeHtml(item)}</span>`)
        .join("");
    }

    if (rpsCplList) {
      rpsCplList.innerHTML = rpsObe.cplSelected.map((item) => `
        <article class="rps-cpl-item">
          <strong>${escapeHtml(item.code)} - ${escapeHtml(item.area)}</strong>
          <p>${escapeHtml(item.outcome)}</p>
        </article>
      `).join("");
    }

    if (rpsCpmkList) {
      rpsCpmkList.innerHTML = rpsObe.cpmk.map((item) => `
        <article class="rps-cpmk-item">
          <strong>${escapeHtml(item.code)}</strong>
          <p>${escapeHtml(item.text)}</p>
        </article>
      `).join("");
    }

    if (rpsRaeList) {
      rpsRaeList.innerHTML = rpsObe.rae.map((item) => `
        <article class="rps-rae-item">
          <strong>${escapeHtml(item.component)}</strong>
          <p>${escapeHtml(item.evidence)}</p>
          <div class="rps-rae-meta">
            <span>Bobot ${escapeHtml(item.weight)}</span>
            <span>${escapeHtml(item.cpmk)}</span>
          </div>
        </article>
      `).join("");
    }

    if (rpsAlignmentList) {
      rpsAlignmentList.innerHTML = rpsObe.alignment.map((item) => `
        <article class="rps-alignment-item">
          <strong>${escapeHtml(item.phase)}</strong>
          <p>${escapeHtml(item.activity)}</p>
          <div class="rps-align-meta">
            <span>${escapeHtml(item.cpmk)}</span>
            <span>${escapeHtml(item.rae)}</span>
          </div>
        </article>
      `).join("");
    }

    if (rpsObeNote) {
      rpsObeNote.textContent = rpsObe.note;
    }
  }

  function buildRail() {
    rail.innerHTML = `<div class="rail-title">Daftar Slide</div>` + slides.map((slide, index) => `
      <button type="button" class="rail-button ${index === 0 ? "is-active" : ""}" data-index="${index}">
        <span class="rail-index">${index + 1}</span>
        <span class="rail-copy">
          <strong>${escapeHtml(slide.dataset.label || `Slide ${index + 1}`)}</strong>
          <span>${escapeHtml(RAIL_SUBLABELS[slide.id] || `bagian ${index + 1}`)}</span>
        </span>
      </button>
    `).join("");

    rail.querySelectorAll(".rail-button").forEach((button) => {
      button.addEventListener("click", () => {
        goToSlide(Number(button.dataset.index));
      });
    });
  }

  function updateUi() {
    slides.forEach((slide, index) => {
      const active = index === state.index;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });

    rail.querySelectorAll(".rail-button").forEach((button, index) => {
      button.classList.toggle("is-active", index === state.index);
    });

    counter.textContent = `${state.index + 1} / ${slides.length}`;
    progressBar.style.width = `${((state.index + 1) / slides.length) * 100}%`;
    prevBtn.disabled = state.index === 0;
    nextBtn.disabled = state.index === slides.length - 1;
    prevBtn.style.opacity = state.index === 0 ? "0.5" : "1";
    nextBtn.style.opacity = state.index === slides.length - 1 ? "0.5" : "1";

    const activeSlide = slides[state.index];
    if (activeSlide) {
      history.replaceState(null, "", `#${activeSlide.id}`);
    }
  }

  function syncMobileViewport() {
    if (window.innerWidth <= 920) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      window.requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
    }
  }

  function goToSlide(nextIndex) {
    const bounded = Math.max(0, Math.min(nextIndex, slides.length - 1));
    if (bounded === state.index) return;
    state.index = bounded;
    updateUi();
    syncMobileViewport();
  }

  function nextSlide() {
    goToSlide(state.index + 1);
  }

  function previousSlide() {
    goToSlide(state.index - 1);
  }

  function lockWheel() {
    state.wheelLock = true;
    window.setTimeout(() => {
      state.wheelLock = false;
    }, 650);
  }

  function openAppendix() {
    appendixDrawer.hidden = false;
    appendixBtn.setAttribute("aria-expanded", "true");
  }

  function closeAppendix() {
    appendixDrawer.hidden = true;
    appendixBtn.setAttribute("aria-expanded", "false");
  }

  function openMediaLightbox({ src, alt, title, caption }) {
    if (!src) return;
    mediaLightboxImage.src = src;
    mediaLightboxImage.alt = alt || title || "";
    mediaLightboxTitle.textContent = title || "Visual";
    mediaLightboxCaption.textContent = caption || "";
    mediaLightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeMediaLightbox() {
    mediaLightbox.hidden = true;
    mediaLightboxImage.src = "";
    mediaLightboxImage.alt = "";
    document.body.style.overflow = "";
  }

  function setBlackout(active) {
    document.body.classList.toggle("is-blackout", active);
    blackoutLayer.hidden = !active;
  }

  function toggleBlackout() {
    setBlackout(!document.body.classList.contains("is-blackout"));
  }

  async function enterPresentationMode() {
    document.body.classList.add("is-presentation-mode");
    focusExitBtn.hidden = false;
    fullscreenBtn.textContent = "Keluar Presentasi";
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function exitPresentationMode() {
    document.body.classList.remove("is-presentation-mode");
    focusExitBtn.hidden = true;
    fullscreenBtn.textContent = "Presentasi";
    setBlackout(false);
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function togglePresentationMode() {
    if (document.body.classList.contains("is-presentation-mode")) {
      await exitPresentationMode();
    } else {
      await enterPresentationMode();
    }
  }

  function initControls() {
    prevBtn.addEventListener("click", previousSlide);
    nextBtn.addEventListener("click", nextSlide);

    stage.addEventListener("wheel", (event) => {
      if (appendixDrawer.hidden === false || state.wheelLock) return;
      if (Math.abs(event.deltaY) < 18) return;
      if (event.deltaY > 0) nextSlide();
      else previousSlide();
      lockWheel();
    }, { passive: true });

    stage.addEventListener("touchstart", (event) => {
      state.touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    stage.addEventListener("touchend", (event) => {
      const deltaX = event.changedTouches[0].clientX - state.touchStartX;
      if (Math.abs(deltaX) < 42) return;
      if (deltaX < 0) nextSlide();
      else previousSlide();
    }, { passive: true });

    document.addEventListener("keydown", (event) => {
      if (event.key.toLowerCase() === "b") {
        event.preventDefault();
        toggleBlackout();
        return;
      }
      if (document.body.classList.contains("is-blackout")) {
        if (event.key === "Escape") {
          event.preventDefault();
          setBlackout(false);
        }
        return;
      }
      if (mediaLightbox.hidden === false && event.key === "Escape") {
        closeMediaLightbox();
        return;
      }
      if (appendixDrawer.hidden === false && event.key === "Escape") {
        closeAppendix();
        return;
      }
      if (document.body.classList.contains("is-presentation-mode") && event.key === "Escape") {
        exitPresentationMode();
        return;
      }
      if (mediaLightbox.hidden === false) return;
      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        nextSlide();
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        previousSlide();
      }
      if (event.key === "Home") {
        event.preventDefault();
        goToSlide(0);
      }
      if (event.key === "End") {
        event.preventDefault();
        goToSlide(slides.length - 1);
      }
      if (event.key.toLowerCase() === "a") {
        event.preventDefault();
        if (appendixDrawer.hidden) openAppendix();
        else closeAppendix();
      }
      if (event.key.toLowerCase() === "f") {
        event.preventDefault();
        togglePresentationMode();
      }
    });

    appendixBtn.addEventListener("click", () => {
      if (appendixDrawer.hidden) openAppendix();
      else closeAppendix();
    });
    appendixClose.addEventListener("click", closeAppendix);
    appendixBackdrop.addEventListener("click", closeAppendix);

    mediaLightboxClose.addEventListener("click", closeMediaLightbox);
    mediaLightboxBackdrop.addEventListener("click", closeMediaLightbox);

    document.querySelectorAll(".evidence-photo-card").forEach((card) => {
      const openCard = () => {
        openMediaLightbox({
          src: card.dataset.lightboxSrc,
          title: card.dataset.lightboxTitle,
          caption: card.dataset.lightboxCaption,
          alt: card.querySelector("img")?.alt || "",
        });
      };

      card.addEventListener("click", openCard);
      card.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        openCard();
      });
    });

    fullscreenBtn.addEventListener("click", togglePresentationMode);
    focusExitBtn.addEventListener("click", exitPresentationMode);

    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement && document.body.classList.contains("is-presentation-mode")) {
        document.body.classList.remove("is-presentation-mode");
        focusExitBtn.hidden = true;
        fullscreenBtn.textContent = "Presentasi";
        setBlackout(false);
      }
    });
  }

  function initFromHash() {
    const hash = window.location.hash.slice(1);
    const slideIndex = slides.findIndex((slide) => slide.id === hash);
    if (slideIndex >= 0) {
      state.index = slideIndex;
    }
    updateUi();
    syncMobileViewport();
  }

  function boot() {
    renderCoverBadges();
    renderSummary();
    renderContext();
    renderStudy();
    renderDecision();
    renderFocus();
    renderDiagram();
    renderEvidence();
    renderGantt();
    renderOutput();
    renderReadiness();
    renderClosing();
    renderAppendix();
    buildRail();
    initControls();
    initFromHash();
  }

  boot();
})();
