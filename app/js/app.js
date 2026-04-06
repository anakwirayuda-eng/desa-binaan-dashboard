/**
 * Desa Binaan Dashboard — App Logic v2
 * =====================================
 * Theme toggle, White Paper rendering, Charts (Chart.js), PKM deep dive, scroll animations
 */

const D = DASHBOARD_DATA;
let activePKMId = null;

function getAllCharts() {
    if (typeof Chart === 'undefined' || !Chart.instances) return [];
    return Array.isArray(Chart.instances) ? Chart.instances : Object.values(Chart.instances);
}

function formatCounterValue(value, { decimals = 0, prefix = '', suffix = '' } = {}) {
    const formatted = new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(value);
    return `${prefix}${formatted}${suffix}`;
}

function animateCounterValue(el, duration = 1200) {
    const end = Number(el.dataset.counterValue);
    const decimals = Number(el.dataset.counterDecimals || 0);
    const prefix = el.dataset.counterPrefix || '';
    const suffix = el.dataset.counterSuffix || '';

    if (!Number.isFinite(end)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.textContent = formatCounterValue(end, { decimals, prefix, suffix });
        el.dataset.counterAnimated = 'true';
        return;
    }

    let startTime = null;
    const step = timestamp => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const current = end * progress;
        el.textContent = formatCounterValue(current, { decimals, prefix, suffix });
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            el.dataset.counterAnimated = 'true';
        }
    };

    window.requestAnimationFrame(step);
}

function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-value[data-counter-value]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting || entry.target.dataset.counterAnimated === 'true') return;
            animateCounterValue(entry.target);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.55 });

    counters.forEach(counter => observer.observe(counter));
}

function renderStatCards(containerId, stats) {
    document.getElementById(containerId).innerHTML = stats.map(stat => {
        const counterValue = Number.isFinite(stat.counterValue) ? stat.counterValue : null;
        const decimals = stat.decimals || 0;
        const prefix = stat.prefix || '';
        const suffix = stat.suffix || '';
        const cardClass = stat.cardClass ? ` ${stat.cardClass}` : '';
        const value = counterValue !== null
            ? formatCounterValue(counterValue, { decimals, prefix, suffix })
            : stat.value;

        const counterAttrs = counterValue !== null
            ? ` data-counter-value="${counterValue}" data-counter-decimals="${decimals}" data-counter-prefix="${prefix}" data-counter-suffix="${suffix}"`
            : '';

        return `
    <div class="stat-card${cardClass}">
      <div class="stat-value" style="color:${stat.color}"${counterAttrs}>${value}</div>
      <div class="stat-label">${stat.label}</div>
    </div>
  `;
    }).join('');
}

function queueChartResize() {
    window.setTimeout(() => {
        getAllCharts().forEach(chart => chart.resize());
    }, 60);
}

function setThemeToggleIcon(isLight) {
    const button = document.getElementById('themeToggle');
    if (!button) return;
    button.innerHTML = isLight ? '&#9728;&#65039;' : '&#127769;';
    button.setAttribute('aria-label', isLight ? 'Aktifkan dark mode' : 'Aktifkan light mode');
}

function preparePrintView() {
    document.body.classList.add('print-prep');
    document.querySelectorAll('.tab-content').forEach(content => {
        content.hidden = false;
        content.classList.add('active');
    });
    D.puskesmas.forEach(initPKMCharts);
    getAllCharts().forEach(chart => {
        chart.resize();
        chart.update('none');
    });
}

function cleanupPrintView() {
    document.body.classList.remove('print-prep');
    switchTab(activePKMId || D.puskesmas[0]?.id);
}

// ═══════════════════════════════════════════
// 0. THEME TOGGLE
// ═══════════════════════════════════════════

function initTheme() {
    const saved = localStorage.getItem('desa-binaan-theme');
    if (saved === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        setThemeToggleIcon(true);
        return;
    }
    setThemeToggleIcon(false);
}

function toggleTheme() {
    const html = document.documentElement;
    const isLight = html.getAttribute('data-theme') === 'light';
    if (isLight) {
        html.removeAttribute('data-theme');
        setThemeToggleIcon(false);
        localStorage.setItem('desa-binaan-theme', 'dark');
    } else {
        html.setAttribute('data-theme', 'light');
        setThemeToggleIcon(true);
        localStorage.setItem('desa-binaan-theme', 'light');
    }
    updateChartColors();
}

function getChartColors() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    return {
        text: isLight ? '#475569' : '#8892b0',
        grid: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
        tooltipBg: isLight ? '#fff' : '#1e293b',
        tooltipText: isLight ? '#1e293b' : '#e2e8f0'
    };
}

function updateChartColors() {
    const c = getChartColors();
    Chart.defaults.color = c.text;
    Chart.defaults.borderColor = c.grid;
    // Force re-render all charts
    getAllCharts().forEach(chart => {
        if (chart.options.scales?.r) {
            chart.options.scales.r.ticks.color = c.text;
            chart.options.scales.r.pointLabels.color = c.text;
            chart.options.scales.r.grid.color = c.grid;
            chart.options.scales.r.angleLines.color = c.grid;
        }
        if (chart.options.scales?.x) {
            chart.options.scales.x.ticks.color = c.text;
            chart.options.scales.x.grid = { ...chart.options.scales.x.grid, color: c.grid };
        }
        if (chart.options.scales?.y) {
            chart.options.scales.y.ticks.color = c.text;
            chart.options.scales.y.grid = { ...chart.options.scales.y.grid, color: c.grid };
        }
        chart.update('none');
    });
}

// ═══════════════════════════════════════════
// CHART.JS DEFAULTS
// ═══════════════════════════════════════════
function initChartDefaults() {
    const c = getChartColors();
    Chart.defaults.color = c.text;
    Chart.defaults.borderColor = c.grid;
    Chart.defaults.font.family = "'Inter', sans-serif";
    Chart.defaults.font.size = 12;
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    Chart.defaults.plugins.legend.labels.pointStyleWidth = 10;
}

const COLORS = {
    blooto: '#3b82f6', mentikan: '#ef4444', wates: '#10b981',
    gedongan: '#f59e0b', kranggan: '#8b5cf6'
};
const COLORS_ARR = [COLORS.blooto, COLORS.mentikan, COLORS.wates, COLORS.gedongan, COLORS.kranggan];
const COLORS_BG = COLORS_ARR.map(c => c + '33');

function mergeScaleConfig(base, overrides = {}) {
    const merged = { ...base, ...overrides };
    ['x', 'y', 'r'].forEach(axis => {
        if (!base[axis] && !overrides[axis]) return;
        merged[axis] = { ...(base[axis] || {}), ...(overrides[axis] || {}) };
        if (base[axis]?.grid || overrides[axis]?.grid) {
            merged[axis].grid = { ...(base[axis]?.grid || {}), ...(overrides[axis]?.grid || {}) };
        }
        if (base[axis]?.ticks || overrides[axis]?.ticks) {
            merged[axis].ticks = { ...(base[axis]?.ticks || {}), ...(overrides[axis]?.ticks || {}) };
        }
        if (base[axis]?.title || overrides[axis]?.title) {
            merged[axis].title = { ...(base[axis]?.title || {}), ...(overrides[axis]?.title || {}) };
        }
    });
    return merged;
}

function createBarGradient(context, color) {
    const { chart } = context;
    const { ctx, chartArea } = chart;
    if (!chartArea) return color + '55';

    const gradient = chart.options.indexAxis === 'y'
        ? ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0)
        : ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);

    gradient.addColorStop(0, color + '22');
    gradient.addColorStop(1, color + 'CC');
    return gradient;
}

function createBarDataset(label, data, colors = COLORS_ARR) {
    return {
        label,
        data,
        backgroundColor: context => {
            const color = context.type === 'data'
                ? (Array.isArray(colors) ? colors[context.dataIndex % colors.length] : colors)
                : (Array.isArray(colors) ? colors[0] : colors);
            return createBarGradient(context, color);
        },
        borderColor: context => context.type === 'data'
            ? (Array.isArray(colors) ? colors[context.dataIndex % colors.length] : colors)
            : (Array.isArray(colors) ? colors[0] : colors),
        borderWidth: 1.5,
        borderRadius: 8,
        borderSkipped: false
    };
}

function getBarAnimation() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return {
        duration: 900,
        easing: 'easeOutCubic',
        delay: context => context.type === 'data' ? context.dataIndex * 70 : 0
    };
}

function getBarScales(horizontal = false, overrides = {}) {
    const c = getChartColors();
    const base = horizontal
        ? {
            x: {
                beginAtZero: true,
                grid: { color: c.grid, borderDash: [4, 4] }
            },
            y: {
                grid: { display: false }
            }
        }
        : {
            x: {
                grid: { display: false }
            },
            y: {
                beginAtZero: true,
                grid: { color: c.grid, borderDash: [4, 4] }
            }
        };

    return mergeScaleConfig(base, overrides);
}

// ═══════════════════════════════════════════
// 1. HERO STATS
// ═══════════════════════════════════════════

function renderHeroStats() {
    const n = D.nasional;
    const stats = [
        { counterValue: n.jumlah_puskesmas_mojokerto_kota, label: 'Puskesmas', color: 'var(--accent-blue)' },
        { counterValue: n.penduduk_kota_mojokerto, label: 'Penduduk', color: 'var(--accent-green)', cardClass: 'hero-stat-featured' },
        { value: n.luas_kota_mojokerto_km2 + ' km²', label: 'Luas Wilayah', color: 'var(--accent-amber)' },
        { counterValue: n.jumlah_puskesmas_jatim, label: 'PKM Jawa Timur', color: 'var(--accent-purple)' }
    ];
    renderStatCards('heroStats', stats);
}

// ═══════════════════════════════════════════
// 2. WHITE PAPER — FONDASI
// ═══════════════════════════════════════════

function renderFondasi() {
    const wp = D.whitePaper;
    const ps = wp.fondasi.paradigmShift;

    document.getElementById('fondasiSubtitle').textContent = ps.description;

    // Paradigm flow
    document.getElementById('paradigmFlow').innerHTML = `
    <div class="paradigm-box" style="border-left:3px solid var(--accent-red)">
      <h4 style="color:var(--accent-red)">❌ ${ps.from.label}</h4>
      <p>${ps.from.desc}</p>
    </div>
    <div class="paradigm-arrow">→</div>
    <div class="paradigm-box" style="border-left:3px solid var(--accent-green)">
      <h4 style="color:var(--accent-green)">✅ ${ps.to.label}</h4>
      <p>${ps.to.desc}</p>
    </div>
  `;

    // Two models
    const tm = wp.fondasi.twoModels;
    document.getElementById('twoModels').innerHTML = `
    <div class="glass-card" style="border-top:3px solid var(--accent-red)">
      <h3 style="color:var(--accent-red);margin-bottom:0.5rem">🔍 ${tm.deficit.label}</h3>
      <p style="font-size:0.88rem;margin-bottom:0.5rem"><strong>Core Logic:</strong> ${tm.deficit.logic}</p>
      <p style="font-size:0.85rem"><strong>Psychological Impact:</strong> ${tm.deficit.impact}</p>
    </div>
    <div class="glass-card" style="border-top:3px solid var(--accent-green)">
      <h3 style="color:var(--accent-green);margin-bottom:0.5rem">🌳 ${tm.asset.label}</h3>
      <p style="font-size:0.88rem;margin-bottom:0.5rem"><strong>Core Logic:</strong> ${tm.asset.logic}</p>
      <p style="font-size:0.82rem;font-weight:600;margin-bottom:0.3rem">The 5 Core Assets:</p>
      <ul style="list-style:none;font-size:0.82rem;color:var(--text-secondary)">
        ${tm.asset.assets.map(a => `<li style="padding:0.15rem 0">• ${a}</li>`).join('')}
      </ul>
    </div>
  `;

    // Case studies
    document.getElementById('caseStudies').innerHTML = wp.caseStudies.map(cs => `
    <div class="case-card">
      <div class="case-type">${cs.type}</div>
      <h4>${cs.name}</h4>
      <p>${cs.desc}</p>
    </div>
  `).join('');
}

// ═══════════════════════════════════════════
// 3. WHITE PAPER — FRAMEWORK
// ═══════════════════════════════════════════

function renderFramework() {
    const fw = D.whitePaper.framework;
    const grid = document.getElementById('frameworkGrid');

    // COM-B
    const comB = fw.comB;
    const comBHtml = `
    <div class="framework-card" style="border-top:3px solid var(--accent-blue)">
      <h3>🧠 ${comB.title}</h3>
      <p>${comB.description}</p>
      <ul class="framework-items">
        ${comB.components.map(c => `
          <li><span class="fw-badge" style="background:${c.color}">${c.name[0]}</span>
          <div><strong>${c.name}</strong> — ${c.desc}</div></li>
        `).join('')}
      </ul>
    </div>
  `;

    // MINDSPACE
    const ms = fw.mindspace;
    const msHtml = `
    <div class="framework-card" style="border-top:3px solid var(--accent-purple)">
      <h3>🎯 ${ms.title}</h3>
      <p>Framework tuas psikologis terbukti untuk desain intervensi efektif.</p>
      <ul class="framework-items">
        ${ms.levers.map(l => `
          <li><span class="fw-badge" style="background:var(--accent-purple)">${l.letter}</span>
          <div><strong>${l.name}</strong> — ${l.desc}</div></li>
        `).join('')}
      </ul>
    </div>
  `;

    // RE-AIM
    const ra = fw.reAim;
    const raHtml = `
    <div class="framework-card" style="border-top:3px solid var(--accent-green)">
      <h3>📊 ${ra.title}</h3>
      <p>${ra.description}</p>
      <ul class="framework-items">
        ${ra.dimensions.map((d, i) => `
          <li><span class="fw-badge" style="background:var(--accent-green)">${d.name[0]}</span>
          <div><strong>${d.name}</strong> — ${d.desc}</div></li>
        `).join('')}
      </ul>
    </div>
  `;

    grid.innerHTML = comBHtml + msHtml + raHtml;
}

// ═══════════════════════════════════════════
// 4. NASIONAL
// ═══════════════════════════════════════════

function renderNasional() {
    const n = D.nasional;
    const stats = [
        { counterValue: n.jumlah_puskesmas_nasional, label: 'Puskesmas Nasional', color: 'var(--accent-blue)' },
        { counterValue: n.jumlah_puskesmas_jatim, label: 'Puskesmas Jawa Timur', color: 'var(--accent-green)' },
        { counterValue: n.jumlah_puskesmas_mojokerto_kota, label: 'Puskesmas Kota Mojokerto', color: 'var(--accent-amber)' }
    ];
    renderStatCards('nasionalStats', stats);
    document.getElementById('konteksParagraph').textContent = n.konteks_desa_binaan;
}

// ═══════════════════════════════════════════
// 5. BAR CHARTS — Mojokerto
// ═══════════════════════════════════════════

function initMojokertoCharts() {
    const labels5 = ['Blooto', 'Mentikan', 'Wates', 'Gedongan', 'Kranggan*'];
    const p = D.perbandingan;

    const krangganNote = {
        id: 'krangganNote',
        afterDraw(chart) {
            const ctx = chart.ctx;
            const xScale = chart.scales.x;
            const yScale = chart.scales.y;
            const lastIndex = chart.data.labels.length - 1;
            if (!String(chart.data.labels[lastIndex] || '').includes('*') || !xScale || !yScale) return;

            ctx.save();
            ctx.fillStyle = '#8b5cf6';
            ctx.font = '10px Inter';
            if (chart.options.indexAxis === 'y') {
                ctx.textAlign = 'left';
                ctx.fillText('(draf)', chart.chartArea.left + 20, yScale.getPixelForTick(lastIndex) + 4);
            } else {
                ctx.textAlign = 'center';
                ctx.fillText('(draf)', xScale.getPixelForTick(lastIndex), yScale.getPixelForValue(0) - 8);
            }
            ctx.restore();
        }
    };

    const makeChart = (canvasId, label, data, unit, opts = {}) => {
        new Chart(document.getElementById(canvasId), {
            type: 'bar',
            data: {
                labels: labels5,
                datasets: [createBarDataset(label, data)]
            },
            options: {
                responsive: true,
                animation: getBarAnimation(),
                indexAxis: opts.horizontal ? 'y' : 'x',
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: ctx => {
                                const v = opts.horizontal ? ctx.parsed.x : ctx.parsed.y;
                                if (v == null || Number.isNaN(v)) return 'Data belum tersedia';
                                return opts.format ? opts.format(v) : `${v} ${unit}`;
                            }
                        }
                    }
                },
                scales: getBarScales(opts.horizontal, opts.scales || {})
            },
            plugins: [krangganNote]
        });
    };

    makeChart('chartPenduduk', 'Jumlah Penduduk', p.penduduk, 'jiwa', {
        format: v => v.toLocaleString('id-ID') + ' jiwa',
        scales: { y: { beginAtZero: true, ticks: { callback: v => (v / 1000).toFixed(0) + 'K' } } }
    });
    makeChart('chartSDM', 'Total SDM', p.sdm, 'orang', { horizontal: true });
    makeChart('chartKunjungan', 'Kunjungan RJ', p.kunjungan, 'kunjungan', {
        format: v => v.toLocaleString('id-ID') + ' kunjungan',
        scales: { y: { beginAtZero: true, ticks: { callback: v => (v / 1000).toFixed(0) + 'K' } } }
    });
    makeChart('chartRasio', 'Rasio', p.rasio_kunjungan_per_penduduk, '×', {
        format: v => v.toFixed(2) + '× per tahun',
        scales: { y: { beginAtZero: true, max: 2.5 } }
    });
}

// ═══════════════════════════════════════════
// 6. PENYAKIT CHART
// ═══════════════════════════════════════════

function initPenyakitChart() {
    const penyakit = D.penyakit_kolektif;
    const gradient_colors = ['#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6', '#8b5cf6'];
    new Chart(document.getElementById('chartPenyakit'), {
        type: 'bar',
        data: {
            labels: penyakit.map(p => p.nama),
            datasets: [createBarDataset('Total Kasus', penyakit.map(p => p.total), gradient_colors)]
        },
        options: {
            responsive: true, indexAxis: 'y', animation: getBarAnimation(),
            plugins: { legend: { display: false }, tooltip: { callbacks: { label: ctx => ctx.parsed.x.toLocaleString('id-ID') + ' kasus' } } },
            scales: getBarScales(true, { x: { ticks: { callback: v => (v / 1000).toFixed(0) + 'K' } } })
        }
    });
}

// ═══════════════════════════════════════════
// 7. PKM CARDS & DEEP DIVE
// ═══════════════════════════════════════════

function renderPKMCards() {
    const grid = document.getElementById('pkmCardsGrid');
    const tabs = document.getElementById('pkmTabs');
    const contents = document.getElementById('pkmTabContents');
    tabs.setAttribute('role', 'tablist');

    D.puskesmas.forEach((pkm, i) => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'pkm-card' + (i === 0 ? ' active' : '');
        card.dataset.pkm = pkm.id;
        card.setAttribute('aria-controls', `tab-${pkm.id}`);
        card.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
        card.setAttribute('aria-label', `Lihat profil ${pkm.nama}`);
        card.addEventListener('click', () => switchTab(pkm.id));
        card.innerHTML = `
      <div class="pkm-card-header">
        <div class="pkm-card-icon">${pkm.icon}</div>
        <div class="pkm-card-name">${pkm.nama}</div>
        <span class="pkm-card-category">${pkm.kategori}</span>
        <div class="pkm-meta">
          <span class="pkm-meta-item">👥 <span class="pkm-meta-value">${pkm.jumlah_penduduk ? pkm.jumlah_penduduk.toLocaleString('id-ID') : '—'}</span></span>
          <span class="pkm-meta-item">🏘️ <span class="pkm-meta-value">${pkm.jumlah_kelurahan} kel.</span></span>
          <span class="pkm-meta-item">👨‍⚕️ <span class="pkm-meta-value">${pkm.total_sdm || '—'}</span></span>
        </div>
      </div>
      <div class="pkm-card-body">
        <ul class="pkm-highlights">
          ${pkm.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
      </div>
    `;
        grid.appendChild(card);

        const btn = document.createElement('button');
        btn.className = 'tab-btn' + (i === 0 ? ' active' : '');
        btn.type = 'button';
        btn.id = `tab-btn-${pkm.id}`;
        btn.dataset.tab = pkm.id;
        btn.textContent = pkm.nama.replace('Puskesmas ', '');
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-controls', `tab-${pkm.id}`);
        btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        btn.tabIndex = i === 0 ? 0 : -1;
        btn.addEventListener('click', () => switchTab(pkm.id));
        tabs.appendChild(btn);

        const content = document.createElement('div');
        content.className = 'tab-content' + (i === 0 ? ' active' : '');
        content.id = `tab-${pkm.id}`;
        content.hidden = i !== 0;
        content.setAttribute('role', 'tabpanel');
        content.setAttribute('aria-labelledby', btn.id);
        content.innerHTML = buildTabContent(pkm);
        contents.appendChild(content);
    });

    activePKMId = D.puskesmas[0]?.id || null;
    initPKMCharts(D.puskesmas[0]);
}

function switchTab(pkmId) {
    if (!pkmId) return;
    activePKMId = pkmId;
    document.querySelectorAll('.tab-btn').forEach(button => {
        const isActive = button.dataset.tab === pkmId;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-selected', String(isActive));
        button.tabIndex = isActive ? 0 : -1;
    });

    document.querySelectorAll('.tab-content').forEach(content => {
        const isActive = content.id === `tab-${pkmId}`;
        content.classList.toggle('active', isActive);
        content.hidden = !isActive;
    });

    document.querySelectorAll('.pkm-card').forEach(card => {
        const isActive = card.dataset.pkm === pkmId;
        card.classList.toggle('active', isActive);
        card.setAttribute('aria-pressed', String(isActive));
    });

    const pkm = D.puskesmas.find(p => p.id === pkmId);
    if (pkm) initPKMCharts(pkm);
    queueChartResize();
}

function buildTabContent(pkm) {
    const hasData = pkm.jumlah_penduduk !== null;
    const kelList = pkm.kelurahan.map(k => `<span class="inovasi-tag" style="background:var(--bg-glass);border-color:var(--border);color:var(--text-primary)">${k}</span>`).join('');

    const inovasiHtml = pkm.inovasi.length > 0 ? `
    <ul class="inovasi-list">
      ${pkm.inovasi.map(i => `<li><span class="inovasi-name">💡 ${i.nama}</span><span class="inovasi-desc">${i.desc}</span></li>`).join('')}
    </ul>
  ` : '<p style="color:var(--text-muted);font-size:0.85rem;">Belum tersedia</p>';

    const sdmChart = hasData && pkm.sdm_detail ? `
    <div class="chart-container"><div class="chart-title">Komposisi SDM</div><canvas id="chartSDM_${pkm.id}" height="260"></canvas></div>
  ` : '<div class="glass-card"><h3>Data SDM</h3><p style="color:var(--text-muted)">Belum tersedia</p></div>';

    const diseaseChart = pkm.top_penyakit.length > 0 ? `
    <div class="chart-container"><div class="chart-title">10 Besar Penyakit</div><canvas id="chartDisease_${pkm.id}" height="280"></canvas></div>
  ` : '<div class="glass-card"><h3>10 Besar Penyakit</h3><p style="color:var(--text-muted)">Data belum tersedia</p></div>';

    const indicatorCards = hasData && pkm.indicators.spm ? `
    <div class="grid-3" style="margin-bottom:1.5rem;">
      <div class="stat-card" style="background:rgba(16,185,129,0.06)"><div class="stat-value" style="color:var(--accent-green)">${pkm.indicators.spm}%</div><div class="stat-label">SPM</div></div>
      <div class="stat-card" style="background:rgba(245,158,11,0.06)"><div class="stat-value" style="color:var(--accent-amber)">${pkm.indicators.nd_balita}%</div><div class="stat-label">N/D Balita</div></div>
      <div class="stat-card" style="background:rgba(59,130,246,0.06)"><div class="stat-value" style="color:var(--accent-blue)">${pkm.indicators.kunjungan_rj?.toLocaleString('id-ID') || '—'}</div><div class="stat-label">Kunjungan RJ</div></div>
    </div>
  ` : '';

    const contactInfo = [
        pkm.alamat ? `📍 ${pkm.alamat}` : null,
        pkm.kecamatan ? `🏛️ ${pkm.kecamatan}` : null,
        pkm.telepon ? `📞 ${pkm.telepon}` : null,
        pkm.motto ? `✨ "${pkm.motto}"` : null
    ].filter(Boolean).map(c => `<span class="inovasi-tag" style="background:var(--bg-glass);border-color:var(--border);color:var(--text-secondary)">${c}</span>`).join('');

    const pustuInfo = pkm.pustu.length > 0 ? `
    <div style="margin-bottom:1rem">
      <div style="font-size:0.78rem;font-weight:600;margin-bottom:0.4rem;color:var(--text-heading)">🏘️ Puskesmas Pembantu (PUSTU)</div>
      <div style="display:flex;flex-wrap:wrap;gap:0.3rem">${pkm.pustu.map(p => `<span class="inovasi-tag">${p}</span>`).join('')}</div>
    </div>
  ` : '';

    return `
    <div class="glass-card" style="margin-bottom:1.5rem;border-left:3px solid ${pkm.warna};">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:1rem;">
        <div>
          <h3 style="margin-bottom:0.25rem">${pkm.icon} ${pkm.nama}</h3>
          <p style="color:var(--text-secondary);font-size:0.85rem;margin-bottom:0.5rem">${pkm.kategori} · Profil ${pkm.tahun_profil} · Akreditasi: <strong style="color:var(--text-primary)">${pkm.akreditasi}</strong></p>
          <div style="display:flex;flex-wrap:wrap;gap:0.3rem;margin-bottom:0.5rem">${contactInfo}</div>
        </div>
        <div style="text-align:right">
          <div style="font-size:0.72rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em">Kelurahan Dilayani</div>
          <div style="margin-top:0.4rem;display:flex;flex-wrap:wrap;gap:0.3rem;justify-content:flex-end">${kelList}</div>
        </div>
      </div>
    </div>
    ${pustuInfo}
    ${indicatorCards}
    <div class="grid-2" style="margin-bottom:1.5rem">${sdmChart}${diseaseChart}</div>
    <div style="margin-bottom:1.5rem;">
      <div style="font-size:0.85rem;font-weight:600;margin-bottom:0.6rem;color:var(--accent-purple)">🚀 Inovasi & Program Unggulan</div>
      ${inovasiHtml}
    </div>
    <h3 style="font-family:var(--font-display);font-size:1.1rem;font-weight:700;margin-bottom:1rem;">Analisis SWOT</h3>
    <div class="swot-grid">
      <div class="swot-box strengths"><h4>💪 Strengths</h4><ul>${pkm.swot.s.map(s => `<li>${s}</li>`).join('')}</ul></div>
      <div class="swot-box weaknesses"><h4>⚠️ Weaknesses</h4><ul>${pkm.swot.w.map(w => `<li>${w}</li>`).join('')}</ul></div>
      <div class="swot-box opportunities"><h4>🌟 Opportunities</h4><ul>${pkm.swot.o.map(o => `<li>${o}</li>`).join('')}</ul></div>
      <div class="swot-box threats"><h4>🔥 Threats</h4><ul>${pkm.swot.t.map(t => `<li>${t}</li>`).join('')}</ul></div>
    </div>
  `;
}

const pkmChartsInit = new Set();

function initPKMCharts(pkm) {
    if (pkmChartsInit.has(pkm.id)) return;
    pkmChartsInit.add(pkm.id);

    if (pkm.sdm_detail) {
        const canvas = document.getElementById(`chartSDM_${pkm.id}`);
        if (canvas) {
            const labels = Object.keys(pkm.sdm_detail).map(k => k.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()));
            const data = Object.values(pkm.sdm_detail);
            const doughnutColors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899', '#84cc16', '#6b7280'];
            new Chart(canvas, {
                type: 'doughnut',
                data: { labels, datasets: [{ data, backgroundColor: doughnutColors.map(c => c + '66'), borderColor: doughnutColors, borderWidth: 1.5 }] },
                options: { responsive: true, plugins: { legend: { position: 'right', labels: { font: { size: 11 }, padding: 8 } } } }
            });
        }
    }

    if (pkm.top_penyakit.length > 0) {
        const canvas = document.getElementById(`chartDisease_${pkm.id}`);
        if (canvas) {
            const gradient_colors = ['#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6', '#8b5cf6'];
            new Chart(canvas, {
                type: 'bar',
                data: {
                    labels: pkm.top_penyakit.map(p => p.nama),
                    datasets: [createBarDataset('Kasus', pkm.top_penyakit.map(p => p.jumlah), gradient_colors)]
                },
                options: {
                    responsive: true, indexAxis: 'y', animation: getBarAnimation(),
                    plugins: { legend: { display: false } },
                    scales: getBarScales(true, { x: { ticks: { callback: v => (v / 1000).toFixed(1) + 'K' } } })
                }
            });
        }
    }
}

// ═══════════════════════════════════════════
// 8. COMPARATIVE CHARTS
// ═══════════════════════════════════════════

function initComparativeCharts() {
    const radar = D.radar;
    const ids4 = ['blooto', 'mentikan', 'wates', 'gedongan'];
    const labelsRadar = ['Blooto', 'Mentikan', 'Wates', 'Gedongan'];

    new Chart(document.getElementById('chartRadar'), {
        type: 'radar',
        data: {
            labels: radar.labels,
            datasets: ids4.map((id, i) => {
                const isMentikan = id === 'mentikan';
                return {
                    label: labelsRadar[i],
                    data: radar.datasets[id],
                    borderColor: isMentikan ? COLORS[id] : COLORS[id] + '55',
                    backgroundColor: isMentikan ? COLORS[id] + '26' : 'transparent',
                    borderWidth: isMentikan ? 3 : 1.5,
                    borderDash: isMentikan ? [] : [6, 4],
                    pointBackgroundColor: isMentikan ? COLORS[id] : COLORS[id] + 'AA',
                    pointBorderColor: isMentikan ? COLORS[id] : COLORS[id] + 'AA',
                    pointRadius: isMentikan ? 4 : 2.5,
                    pointHoverRadius: isMentikan ? 5 : 3
                };
            })
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    beginAtZero: true, max: 100,
                    ticks: { stepSize: 20, font: { size: 10 } },
                    pointLabels: { font: { size: 11 } },
                    grid: { color: 'rgba(255,255,255,0.04)' },
                    angleLines: { color: 'rgba(255,255,255,0.04)' }
                }
            },
            plugins: { legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 15 } } }
        }
    });

    const labels5 = ['Blooto', 'Mentikan', 'Wates', 'Gedongan', 'Kranggan*'];
    new Chart(document.getElementById('chartSPM'), {
        type: 'bar',
        data: {
            labels: labels5,
            datasets: [
                createBarDataset('SPM (%)', D.perbandingan.spm, '#10b981'),
                createBarDataset('N/D Balita (%)', D.perbandingan.nd_balita, '#f59e0b')
            ]
        },
        options: {
            responsive: true,
            animation: getBarAnimation(),
            plugins: {
                legend: { position: 'bottom', labels: { font: { size: 11 } } },
                tooltip: {
                    callbacks: {
                        label: ctx => {
                            const value = ctx.parsed.y;
                            if (value == null || Number.isNaN(value)) return `${ctx.dataset.label}: data belum tersedia`;
                            return `${ctx.dataset.label}: ${value}%`;
                        }
                    }
                }
            },
            scales: getBarScales(false, { y: { max: 100, ticks: { callback: v => v + '%' } } })
        }
    });
}

// ═══════════════════════════════════════════
// 9. SWOT KOLEKTIF
// ═══════════════════════════════════════════

function renderSWOTKolektif() {
    const swot = D.swot_kolektif;
    const types = [
        { key: 's', class: 'strengths', label: '💪 Strengths' },
        { key: 'w', class: 'weaknesses', label: '⚠️ Weaknesses' },
        { key: 'o', class: 'opportunities', label: '🌟 Opportunities' },
        { key: 't', class: 'threats', label: '🔥 Threats' }
    ];
    document.getElementById('swotKolektif').innerHTML = types.map(type => `
    <div class="swot-box ${type.class}">
      <h4>${type.label}</h4>
      <ul>${swot[type.key].map(item => `<li>${item}</li>`).join('')}</ul>
    </div>
  `).join('');
}

// ═══════════════════════════════════════════
// 10. WHITE PAPER — BLUEPRINT
// ═══════════════════════════════════════════

function renderBlueprint() {
    const bp = D.whitePaper.blueprint;
    const cpl = D.whitePaper.competencies;

    document.getElementById('blueprintSubtitle').textContent = bp.subtitle;

    const stepIcons = ['🌱', '🔗', '✍️'];
    document.getElementById('blueprintSteps').innerHTML = bp.steps.map((s, i) => `
    <div class="blueprint-step">
      <div class="step-icon">${stepIcons[i]}</div>
      <h4>${s.name}</h4>
      <p>${s.desc}</p>
      <div class="step-example">↳ ${s.example}</div>
    </div>
  `).join('');

    document.getElementById('cplTitle').textContent = cpl.title;
    document.getElementById('cplSubtitle').textContent = cpl.subtitle;
    document.getElementById('cplGrid').innerHTML = cpl.items.map(c => `
    <div class="cpl-card">
      <span class="cpl-code">${c.code}</span>
      <div class="cpl-info">
        <h4>${c.name}</h4>
        <p>${c.desc}</p>
      </div>
    </div>
  `).join('');
}

// ═══════════════════════════════════════════
// 11. SCORING TABLE
// ═══════════════════════════════════════════

function renderCommunityMedicine() {
    const cm = D.communityMedicine;
    const plan = cm.implementationPlan;
    const curriculum = cm.curriculum;
    const projection = cm.projection;
    const toolkit = cm.visualToolkit;

    document.getElementById('cmPlanSubtitle').textContent = plan.subtitle;
    document.getElementById('cmOperatingNarrative').textContent = plan.operatingModel.narrative;
    document.getElementById('cmOperatingBadges').innerHTML = plan.operatingModel.badges.map(item => `<span class="inovasi-tag">${item}</span>`).join('');
    document.getElementById('cmOperatingBullets').innerHTML = plan.operatingModel.bullets.map(item => `<li>${item}</li>`).join('');
    document.getElementById('cmAssumptions').innerHTML = plan.assumptions.map(item => `<li>${item}</li>`).join('');
    document.getElementById('cmTargetSummary').innerHTML = [
        { label: 'Target lokasi', value: cm.target.puskesmas },
        { label: 'Alamat', value: cm.target.lokasi },
        { label: 'Durasi', value: cm.target.durasi_rotasi },
        { label: 'Pendekatan', value: cm.target.pendekatan }
    ].map(item => `
    <div class="target-summary-item">
      <span class="recommendation-label">${item.label}</span>
      <strong>${item.value}</strong>
    </div>
  `).join('');

    document.getElementById('cmWorkstreams').innerHTML = plan.workstreams.map(item => `
    <div class="workstream-card">
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    </div>
  `).join('');

    document.getElementById('cmGanttNote').textContent = plan.ganttNote;
    document.getElementById('cmGanttWeekBands').innerHTML = `
    <div class="gantt-row-label muted">Timeline</div>
    <div class="gantt-track-timeline gantt-track-timeline-header">
      ${plan.gantt.weekBands.map(item => `
        <div class="gantt-week-band" style="grid-column:${item.start} / ${item.end + 1}">
          <strong>${item.label}</strong>
          <span>${item.focus}</span>
        </div>
      `).join('')}
    </div>
  `;
    document.getElementById('cmGanttDays').innerHTML = `
    <div class="gantt-row-label">Workstream</div>
    <div class="gantt-track-timeline gantt-track-timeline-header">
      ${plan.gantt.dayLabels.map(label => `<div class="gantt-day-cell">${label}</div>`).join('')}
    </div>
  `;
    document.getElementById('cmGanttTracks').innerHTML = plan.gantt.tracks.map(track => `
    <div class="gantt-track-row">
      <div class="gantt-row-label">
        <strong>${track.title}</strong>
        <span>${track.owner}</span>
        <p>${track.detail}</p>
      </div>
      <div class="gantt-track-timeline">
        ${plan.gantt.dayLabels.map(() => '<div class="gantt-grid-cell"></div>').join('')}
        ${track.blocks.map(block => `
          <div class="gantt-block tone-${track.tone}" style="grid-column:${block.start} / ${block.end + 1}">
            <span>${block.label}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
    document.getElementById('cmGanttMilestones').innerHTML = `
    <div class="gantt-row-label">
      <strong>Milestone</strong>
      <span>Checkpoint mingguan</span>
    </div>
    <div class="gantt-track-timeline gantt-milestone-line">
      ${plan.gantt.dayLabels.map(() => '<div class="gantt-grid-cell"></div>').join('')}
      ${plan.gantt.milestones.map(item => `
        <div class="gantt-milestone tone-${item.tone}" style="grid-column:${item.day} / ${item.day + 1}">
          <div class="gantt-milestone-dot"></div>
          <span>${item.label}</span>
        </div>
      `).join('')}
    </div>
  `;

    document.getElementById('cmDailyForecastNote').textContent = plan.dailyForecastNote;
    document.getElementById('cmDailyForecast').innerHTML = plan.dailyForecast.map(week => `
    <section class="daily-week-group">
      <div class="daily-week-header">
        <div>
          <div class="week-pill">${week.week}</div>
          <h3>${week.theme}</h3>
        </div>
      </div>
      <div class="daily-card-grid">
        ${week.days.map(day => `
          <article class="daily-card">
            <div class="daily-card-top">
              <div>
                <span class="daily-label">${day.label}</span>
                <h4>${day.day}</h4>
              </div>
              <span class="daily-owner">${day.owner}</span>
            </div>
            <div class="daily-block">
              <div class="curriculum-label">Pagi</div>
              <p>${day.am}</p>
            </div>
            <div class="daily-block">
              <div class="curriculum-label">Siang</div>
              <p>${day.pm}</p>
            </div>
            <div class="daily-block">
              <div class="curriculum-label">Output</div>
              <p>${day.output}</p>
            </div>
            <div class="daily-checkpoint">${day.checkpoint}</div>
          </article>
        `).join('')}
      </div>
    </section>
  `).join('');

    document.getElementById('cmWeekPlan').innerHTML = plan.weeks.map(week => `
    <article class="week-card">
      <div class="week-pill">${week.minggu}</div>
      <h3>${week.tema}</h3>
      <p class="week-focus">${week.fokus}</p>
      <div class="week-block">
        <div class="week-block-title">Kegiatan</div>
        <ul class="compact-list">${week.kegiatan.map(item => `<li>${item}</li>`).join('')}</ul>
      </div>
      <div class="week-block">
        <div class="week-block-title">Output</div>
        <ul class="compact-list">${week.output.map(item => `<li>${item}</li>`).join('')}</ul>
      </div>
    </article>
  `).join('');

    document.getElementById('cmCurriculumSubtitle').textContent = curriculum.subtitle;
    document.getElementById('cmStandards').innerHTML = curriculum.standards.map(item => `<span class="standard-badge">${item}</span>`).join('');
    document.getElementById('cmReferenceStandards').innerHTML = curriculum.referenceStandards.map(item => `
    <div class="reference-standard-card">
      <h3>${item.title}</h3>
      <p><span class="curriculum-label">Mengapa dipakai</span>${item.why}</p>
      <p><span class="curriculum-label">Implementasi di dashboard / rotasi</span>${item.application}</p>
    </div>
  `).join('');
    document.getElementById('cmCompetencyMap').innerHTML = curriculum.competencyMap.map(item => `
    <div class="curriculum-card">
      <h3>${item.domain}</h3>
      <p><span class="curriculum-label">Acuan</span>${item.skdi}</p>
      <p><span class="curriculum-label">Aktivitas Koas</span>${item.aktivitas}</p>
      <p><span class="curriculum-label">Evidence</span>${item.evidence}</p>
    </div>
  `).join('');
    document.getElementById('cmSupervision').innerHTML = curriculum.supervision.map(item => `<li>${item}</li>`).join('');

    document.getElementById('cmProjectionSubtitle').textContent = projection.subtitle;
    document.getElementById('cmRoles').innerHTML = projection.roles.map(item => `
    <div class="role-card">
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    </div>
  `).join('');
    document.getElementById('cmDeliverables').innerHTML = projection.deliverables.map(item => `<li>${item}</li>`).join('');
    document.getElementById('cmGuardrails').innerHTML = projection.guardrails.map(item => `<li>${item}</li>`).join('');
    document.getElementById('cmDailyLoad').innerHTML = projection.dailyLoad.map(item => `
    <div class="daily-load-card">
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    </div>
  `).join('');

    document.getElementById('cmToolkitSubtitle').textContent = toolkit.subtitle;
    document.getElementById('cmPanelPrinciples').innerHTML = toolkit.panelPrinciples.map(item => `
    <div class="workstream-card">
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    </div>
  `).join('');
    document.getElementById('cmFigureRecommendations').innerHTML = toolkit.recommendedFigures.map(item => `
    <div class="figure-card">
      <h4>${item.title}</h4>
      <p><span class="curriculum-label">Fungsi</span>${item.use}</p>
      <p><span class="curriculum-label">Paling cocok untuk</span>${item.fit}</p>
    </div>
  `).join('');
    document.getElementById('cmDriverAim').textContent = toolkit.driverDiagram.aim;
    document.getElementById('cmDriverDiagram').innerHTML = toolkit.driverDiagram.drivers.map(item => `
    <div class="driver-card">
      <h4>${item.title}</h4>
      <ul class="compact-list">${item.actions.map(action => `<li>${action}</li>`).join('')}</ul>
    </div>
  `).join('');
    document.getElementById('cmDeepthinkAccepted').innerHTML = toolkit.deepthinkTriage.accepted.map(item => `<li>${item}</li>`).join('');
    document.getElementById('cmDeepthinkDeferred').innerHTML = toolkit.deepthinkTriage.deferred.map(item => `<li>${item}</li>`).join('');
    document.getElementById('cmDeepthinkRejected').innerHTML = toolkit.deepthinkTriage.rejected.map(item => `<li>${item}</li>`).join('');
    document.getElementById('cmPhotoReferences').innerHTML = toolkit.photoReferences.map(item => `
    <article class="photo-reference-card">
      ${item.image
            ? `<img src="${item.image}" alt="${item.title}" loading="lazy">`
            : `<div class="photo-reference-fallback"><span>${item.title}</span></div>`}
      <div class="photo-reference-body">
        <div class="recommendation-label">${item.source}</div>
        <h3>${item.title}</h3>
        <p>${item.note}</p>
        <a href="${item.url}" target="_blank" rel="noreferrer">Buka sumber resmi</a>
        <span class="photo-credit">${item.credit}</span>
      </div>
    </article>
  `).join('');
    document.getElementById('cmBibliography').innerHTML = toolkit.bibliography.map(item => `
    <article class="bibliography-item">
      <div class="bibliography-meta">
        <span>${item.type}</span>
        <strong>${item.year}</strong>
      </div>
      <h4>${item.title}</h4>
      <p><strong>${item.org}</strong> - ${item.note}</p>
      <a href="${item.url}" target="_blank" rel="noreferrer">${item.url}</a>
    </article>
  `).join('');
}

function renderRecommendation() {
    const recommendation = D.communityMedicine.recommendation;
    const scoring = D.scoring;
    const names = {
        blooto: 'Blooto',
        mentikan: 'Mentikan',
        wates: 'Wates',
        gedongan: 'Gedongan',
        kranggan: 'Kranggan'
    };

    document.getElementById('cmRecommendationTitle').textContent = recommendation.title;
    document.getElementById('cmRecommendationSummary').textContent = recommendation.summary;
    document.getElementById('cmRecommendationRationale').innerHTML = recommendation.rationale.map(item => `<li>${item}</li>`).join('');
    document.getElementById('cmRecommendationWeeks').innerHTML = recommendation.weekSummary.map(item => `<li>${item}</li>`).join('');
    document.getElementById('cmRecommendationBadges').innerHTML = recommendation.badges.map(item => `<span class="inovasi-tag">${item}</span>`).join('');
    document.getElementById('cmRecommendationClosingLoop').textContent = recommendation.closingLoop;

    document.getElementById('scoringWinnerNarrative').innerHTML = Object.entries(scoring.winnerNarrative).map(([id, text]) => `
    <div class="winner-narrative-item">
      <h4>${names[id]}</h4>
      <p>${text}</p>
    </div>
  `).join('');
}

function renderScoringTable() {
    const table = document.getElementById('scoringTable');
    const scoring = D.scoring;
    const names = ['Blooto', 'Mentikan', 'Wates', 'Gedongan', 'Kranggan'];
    const ids = ['blooto', 'mentikan', 'wates', 'gedongan', 'kranggan'];

    const totals = ids.map(id => scoring.criteria.reduce((sum, c, i) => sum + (scoring.scores[id][i] * c.bobot / 100), 0));
    const maxTotal = Math.max(...totals);

    let html = `<thead><tr><th>Kriteria</th><th>Bobot</th>${names.map(n => `<th>${n}</th>`).join('')}</tr></thead><tbody>`;
    scoring.criteria.forEach((c, ci) => {
        html += `<tr><td>${c.nama}</td><td>${c.bobot}%</td>${ids.map(id => {
            const score = scoring.scores[id][ci];
            const cls = score >= 8 ? 'score-high' : score >= 6 ? 'score-mid' : 'score-low';
            return `<td class="${cls}">${score}/10</td>`;
        }).join('')}</tr>`;
    });
    html += `<tr class="score-winner"><td><strong>SKOR TOTAL</strong></td><td>100%</td>${totals.map(t => {
        const cls = t === maxTotal ? 'score-high' : '';
        return `<td class="${cls}">${t.toFixed(1)}</td>`;
    }).join('')}</tr></tbody>`;
    table.innerHTML = html;
}

// ═══════════════════════════════════════════
// 12. SCROLL ANIMATIONS & NAV
// ═══════════════════════════════════════════

function renderScoringExplainability() {
    const scoring = D.scoring;
    const names = {
        blooto: 'Blooto',
        mentikan: 'Mentikan',
        wates: 'Wates',
        gedongan: 'Gedongan',
        kranggan: 'Kranggan'
    };
    const ids = Object.keys(names);

    document.getElementById('scoringLegendSubtitle').textContent = scoring.legend.subtitle;
    document.getElementById('scoringFormula').textContent = scoring.legend.formula;
    document.getElementById('scoringDecisionGuide').innerHTML = scoring.decisionGuide.map(item => `
    <div class="decision-guide-item">
      <strong>${item.title}</strong>
      <p>${item.desc}</p>
    </div>
  `).join('');
    document.getElementById('scoringScaleBands').innerHTML = scoring.legend.bands.map(band => `
    <div class="scale-band">
      <strong>${band.label} - ${band.meaning}</strong>
      <p>${band.desc}</p>
    </div>
  `).join('');

    document.getElementById('scoringContributionGrid').innerHTML = ids.map(id => {
        const total = scoring.criteria.reduce((sum, criterion, ci) => sum + (scoring.scores[id][ci] * criterion.bobot / 100), 0);
        const rows = scoring.criteria.map((criterion, ci) => {
            const weighted = scoring.scores[id][ci] * criterion.bobot / 100;
            return `
          <div class="contribution-row">
            <span>${criterion.nama}</span>
            <div class="contribution-bar-track">
              <div class="contribution-bar" style="width:${scoring.scores[id][ci] * 10}%; background:${COLORS[id]};"></div>
            </div>
            <strong>${weighted.toFixed(2)}</strong>
          </div>
        `;
        }).join('');

        return `
      <div class="score-contribution-card">
        <div class="score-contribution-header">
          <h4>${names[id]}</h4>
          <span class="score-badge">${total.toFixed(1)}</span>
        </div>
        ${rows}
      </div>
    `;
    }).join('');

    document.getElementById('scoringRubricGrid').innerHTML = scoring.criteria.map((criterion, ci) => `
    <div class="rubric-card">
      <div class="rubric-card-header">
        <div>
          <h3>${criterion.nama}</h3>
          <p>${criterion.desc}</p>
        </div>
        <span class="weight-badge">Bobot ${criterion.bobot}%</span>
      </div>
      <p><span class="curriculum-label">Skor Rendah</span>${criterion.low}</p>
      <p><span class="curriculum-label">Skor Tinggi</span>${criterion.high}</p>
      <div class="criterion-score-list">
        ${ids.map(id => `
          <div class="criterion-score-item">
            <strong>${names[id]}</strong>
            <span class="score-badge">${scoring.scores[id][ci]}/10</span>
            <p>${scoring.breakdown[id][ci]}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function initScrollAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const links = Array.from(document.querySelectorAll('.nav-links a'));
    const sections = links
        .map(link => document.getElementById(link.getAttribute('href').slice(1)))
        .filter(Boolean);
    let activeSectionId = null;

    const setActiveLink = sectionId => {
        if (!sectionId || sectionId === activeSectionId) return;
        activeSectionId = sectionId;
        links.forEach(link => {
            const isActive = link.getAttribute('href') === `#${sectionId}`;
            link.classList.toggle('active', isActive);
            if (isActive && window.innerWidth <= 640) {
                link.scrollIntoView({
                    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        });
    };

    const sectionObserver = new IntersectionObserver(entries => {
        const activeEntry = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (activeEntry) setActiveLink(activeEntry.target.id);
    }, {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.2, 0.4, 0.65]
    });

    sections.forEach(section => sectionObserver.observe(section));
    setActiveLink('hero');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
}

// ═══════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initChartDefaults();
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    window.addEventListener('beforeprint', preparePrintView);
    window.addEventListener('afterprint', cleanupPrintView);

    renderHeroStats();
    renderFondasi();
    renderFramework();
    renderNasional();
    initMojokertoCharts();
    initPenyakitChart();
    renderPKMCards();
    initComparativeCharts();
    renderSWOTKolektif();
    renderBlueprint();
    renderCommunityMedicine();
    renderScoringTable();
    renderScoringExplainability();
    renderRecommendation();
    initCounterAnimations();
    initScrollAnimations();
    initNavbar();
});
