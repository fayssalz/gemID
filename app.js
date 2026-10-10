/**
 * GemID — Application Logic
 * Filtering, rendering, and interaction for gemstone identification
 */

(function () {
  'use strict';

  // ========================
  // COLOR MAP
  // ========================
  const COLOR_MAP = {
    red:    '#ef4444',
    pink:   '#ec4899',
    orange: '#f97316',
    yellow: '#eab308',
    green:  '#22c55e',
    blue:   '#3b82f6',
    violet: '#8b5cf6',
    brown:  '#a3754e',
    white:  '#e2e8f0',
    gray:   '#6b7280',
    black:  '#1f2937',
    grey:   '#6b7280'
  };

  // ========================
  // STATE
  // ========================
  const state = {
    riMin: 1.400,
    riMax: 3.000,
    birefMin: 0.000,
    birefMax: 0.300,
    sgMin: 1.00,
    sgMax: 7.50,
    hardnessMin: 1.0,
    hardnessMax: 10.0,
    optic: 'all',
    searchName: '',
    // Spectroscopy filter state
    spectroBands: [],        // Array of { nm: number } (active wavelength filters)
    spectroTolerance: 8,     // ± nm tolerance
    spectroMatchMode: 'all'  // 'all' | 'any'
  };


  // ========================
  // ELEMENTS
  // ========================
  const els = {
    riMin: document.getElementById('ri-min'),
    riMax: document.getElementById('ri-max'),
    riFill: document.getElementById('ri-fill'),
    riMinInput: document.getElementById('ri-min-input'),
    riMaxInput: document.getElementById('ri-max-input'),
    riRangeLabel: document.getElementById('ri-range-label'),

    birefMin: document.getElementById('biref-min'),
    birefMax: document.getElementById('biref-max'),
    birefFill: document.getElementById('biref-fill'),
    birefMinInput: document.getElementById('biref-min-input'),
    birefMaxInput: document.getElementById('biref-max-input'),
    birefRangeLabel: document.getElementById('biref-range-label'),

    sgMin: document.getElementById('sg-min'),
    sgMax: document.getElementById('sg-max'),
    sgFill: document.getElementById('sg-fill'),
    sgMinInput: document.getElementById('sg-min-input'),
    sgMaxInput: document.getElementById('sg-max-input'),
    sgRangeLabel: document.getElementById('sg-range-label'),

    hardnessMin: document.getElementById('hardness-min'),
    hardnessMax: document.getElementById('hardness-max'),
    hardnessFill: document.getElementById('hardness-fill'),
    hardnessMinInput: document.getElementById('hardness-min-input'),
    hardnessMaxInput: document.getElementById('hardness-max-input'),
    hardnessRangeLabel: document.getElementById('hardness-range-label'),

    opticChips: document.getElementById('optic-chips'),
    searchName: document.getElementById('search-name'),
    resultsGrid: document.getElementById('results-grid'),
    emptyState: document.getElementById('empty-state'),
    matchCount: document.getElementById('match-count'),
    btnReset: document.getElementById('btn-reset'),
    modal: document.getElementById('gem-modal'),
    modalBody: document.getElementById('modal-body'),
    modalClose: document.getElementById('modal-close'),

    // Spectroscopy elements
    spectroToggle: document.getElementById('spectro-toggle'),
    spectroChevron: document.getElementById('spectro-chevron'),
    spectroBody: document.getElementById('spectro-filter-body'),
    spectroBadge: document.getElementById('spectro-badge'),
    spectroBar: document.getElementById('spectro-bar'),
    spectroPreviewLine: document.getElementById('spectro-preview-line'),
    spectroNmInput: document.getElementById('spectro-nm-input'),
    spectroAddBtn: document.getElementById('spectro-add-btn'),
    spectroTolerance: document.getElementById('spectro-tolerance'),
    spectroActiveBands: document.getElementById('spectro-active-bands'),
    spectroClearBtn: document.getElementById('spectro-clear-btn'),
    spectroMatchAll: document.getElementById('spectro-match-all'),
    spectroMatchAny: document.getElementById('spectro-match-any')
  };



  // ========================
  // DUAL RANGE SLIDER LOGIC
  // ========================
  function updateFill(fillEl, minEl, maxEl) {
    const min = parseFloat(minEl.min);
    const max = parseFloat(minEl.max);
    const valMin = parseFloat(minEl.value);
    const valMax = parseFloat(maxEl.value);
    const pctMin = ((valMin - min) / (max - min)) * 100;
    const pctMax = ((valMax - min) / (max - min)) * 100;
    fillEl.style.left = pctMin + '%';
    fillEl.style.width = (pctMax - pctMin) + '%';
  }

  function setupDualRange(minSlider, maxSlider, minInput, maxInput, fillEl, labelEl, stateKeyMin, stateKeyMax, decimals) {
    function sync(source) {
      let valMin = parseFloat(minSlider.value);
      let valMax = parseFloat(maxSlider.value);

      // Prevent overlap
      if (valMin > valMax) {
        if (source === 'min') {
          valMin = valMax;
          minSlider.value = valMin;
        } else {
          valMax = valMin;
          maxSlider.value = valMax;
        }
      }

      state[stateKeyMin] = valMin;
      state[stateKeyMax] = valMax;
      minInput.value = valMin.toFixed(decimals);
      maxInput.value = valMax.toFixed(decimals);
      labelEl.textContent = valMin.toFixed(decimals) + ' – ' + valMax.toFixed(decimals);
      updateFill(fillEl, minSlider, maxSlider);
      render();
    }

    minSlider.addEventListener('input', () => sync('min'));
    maxSlider.addEventListener('input', () => sync('max'));

    function syncFromInput(source) {
      let valMin = parseFloat(minInput.value);
      let valMax = parseFloat(maxInput.value);
      const min = parseFloat(minSlider.min);
      const max = parseFloat(minSlider.max);

      if (isNaN(valMin)) valMin = min;
      if (isNaN(valMax)) valMax = max;
      valMin = Math.max(min, Math.min(max, valMin));
      valMax = Math.max(min, Math.min(max, valMax));

      if (valMin > valMax) {
        if (source === 'min') valMin = valMax;
        else valMax = valMin;
      }

      minSlider.value = valMin;
      maxSlider.value = valMax;
      state[stateKeyMin] = valMin;
      state[stateKeyMax] = valMax;
      minInput.value = valMin.toFixed(decimals);
      maxInput.value = valMax.toFixed(decimals);
      labelEl.textContent = valMin.toFixed(decimals) + ' – ' + valMax.toFixed(decimals);
      updateFill(fillEl, minSlider, maxSlider);
      render();
    }

    minInput.addEventListener('change', () => syncFromInput('min'));
    maxInput.addEventListener('change', () => syncFromInput('max'));

    // Initial
    updateFill(fillEl, minSlider, maxSlider);
  }

  // ========================
  // CHIP LOGIC
  // ========================
  function setupChips() {
    els.opticChips.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;

      const value = chip.dataset.value;
      state.optic = value;

      els.opticChips.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      render();
    });
  }

  // ========================
  // SEARCH
  // ========================
  function setupSearch() {
    let debounceTimer;
    els.searchName.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        state.searchName = els.searchName.value.trim().toLowerCase();
        render();
      }, 150);
    });
  }

  // ========================
  // SPECTROSCOPY
  // ========================

  // Convert nm wavelength (400–700) to % left position on the bar
  function nmToPercent(nm) {
    // Bar goes from 700nm (left=0%) to 400nm (right=100%)
    return ((700 - nm) / 300) * 100;
  }

  // Get realistic fading gradient for absorption bands (mimicking handheld diffraction grating spectroscope optics)
  function getBandGradient(start, end) {
    const isCutoffViolet = Math.min(start, end) <= 425;
    const isCutoffRed = Math.max(start, end) >= 665;

    if (isCutoffViolet && isCutoffRed) {
      return 'linear-gradient(to right, rgba(0,0,0,0.92), rgba(0,0,0,0.92))';
    }
    // Violet cutoff on right (towards 400nm)
    if (isCutoffViolet) {
      return 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.9) 75%, rgba(0,0,0,0.96) 100%)';
    }
    // Red cutoff on left (towards 700nm)
    if (isCutoffRed) {
      return 'linear-gradient(to right, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.9) 25%, rgba(0,0,0,0.6) 80%, rgba(0,0,0,0) 100%)';
    }
    // Standard broad absorption band: soft feathered fade at the flanks with intense dark absorption core
    return 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.62) 18%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.62) 82%, rgba(0,0,0,0) 100%)';
  }

  // Get a representative color for a given wavelength
  function nmToColor(nm) {
    if (nm >= 660) return '#ff2020';
    if (nm >= 620) return '#ff6000';
    if (nm >= 590) return '#ff9900';
    if (nm >= 570) return '#ffe000';
    if (nm >= 520) return '#40cc40';
    if (nm >= 490) return '#00ccaa';
    if (nm >= 460) return '#2266ff';
    if (nm >= 430) return '#5533cc';
    return '#8800cc';
  }

  function spectroAddBand(nm) {
    nm = Math.round(nm * 2) / 2; // round to 0.5nm
    nm = Math.max(400, Math.min(700, nm));
    // Avoid near-duplicates within tolerance
    const tol = state.spectroTolerance;
    const exists = state.spectroBands.some(b => Math.abs(b.nm - nm) <= tol / 2);
    if (exists) return;
    state.spectroBands.push({ nm });
    spectroRenderBands();
    render();
  }

  function spectroRemoveBand(nm) {
    state.spectroBands = state.spectroBands.filter(b => b.nm !== nm);
    spectroRenderBands();
    render();
  }

  function spectroClearAll() {
    state.spectroBands = [];
    spectroRenderBands();
    render();
  }

  function spectroRenderBands() {
    const bar = els.spectroBar;
    const bandsContainer = els.spectroActiveBands;
    const badge = els.spectroBadge;

    // Remove old markers (keep preview line)
    bar.querySelectorAll('.spectro-line-marker, .spectro-tolerance-band').forEach(el => el.remove());

    // Add markers on the bar
    const tol = state.spectroTolerance;
    state.spectroBands.forEach(b => {
      const pct = nmToPercent(b.nm);

      // Tolerance band
      const tolPctWidth = (tol / 300) * 100;
      const bandEl = document.createElement('div');
      bandEl.className = 'spectro-tolerance-band';
      bandEl.style.left = (pct - tolPctWidth) + '%';
      bandEl.style.width = (tolPctWidth * 2) + '%';
      bar.appendChild(bandEl);

      // Line marker (absorption black hairline with indicator pip)
      const marker = document.createElement('div');
      marker.className = 'spectro-line-marker';
      marker.style.left = pct + '%';
      marker.setAttribute('data-nm', b.nm + 'nm');
      marker.title = `${b.nm}nm — click to remove`;
      marker.addEventListener('click', (e) => {
        e.stopPropagation();
        spectroRemoveBand(b.nm);
      });
      bar.appendChild(marker);
    });

    // Render chip list
    bandsContainer.innerHTML = '';
    if (state.spectroBands.length === 0) {
      bandsContainer.innerHTML = '<span style="font-size:10px;color:var(--text-muted);font-style:italic;">Click spectrum bar to add bands…</span>';
    } else {
      state.spectroBands.forEach(b => {
        const chip = document.createElement('span');
        chip.className = 'spectro-band-chip';
        chip.style.background = nmToColor(b.nm);
        chip.innerHTML = `${b.nm}nm <button class="chip-remove" title="Remove ${b.nm}nm">✕</button>`;
        chip.querySelector('.chip-remove').addEventListener('click', () => spectroRemoveBand(b.nm));
        bandsContainer.appendChild(chip);
      });
    }

    // Update badge
    const count = state.spectroBands.length;
    badge.textContent = count + (count === 1 ? ' band' : ' bands');
    badge.classList.toggle('has-active', count > 0);
  }

  function setupSpectroscopy() {
    const bar = els.spectroBar;
    const previewLine = els.spectroPreviewLine;

    // ── Collapsible toggle ──
    function toggleSpectro() {
      const isOpen = els.spectroBody.classList.toggle('open');
      els.spectroChevron.classList.toggle('open', isOpen);
      els.spectroToggle.setAttribute('aria-expanded', isOpen);
    }
    els.spectroToggle.addEventListener('click', toggleSpectro);
    els.spectroToggle.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSpectro(); }
    });

    // ── Interactive spectrum bar: click to add ──
    bar.addEventListener('click', (e) => {
      const rect = bar.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      const nm = 700 - (pct * 300);
      spectroAddBand(Math.round(nm));
    });

    // ── Preview line follows mouse ──
    bar.addEventListener('mousemove', (e) => {
      const rect = bar.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      const nm = Math.round(700 - (pct * 300));
      previewLine.style.left = (pct * 100) + '%';
      previewLine.setAttribute('title', nm + 'nm');
      els.spectroNmInput.value = nm;
    });

    // ── Manual input + Add button ──
    els.spectroAddBtn.addEventListener('click', () => {
      const nm = parseFloat(els.spectroNmInput.value);
      if (!isNaN(nm)) spectroAddBand(nm);
    });
    els.spectroNmInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const nm = parseFloat(els.spectroNmInput.value);
        if (!isNaN(nm)) spectroAddBand(nm);
      }
    });

    // ── Tolerance selector ──
    els.spectroTolerance.addEventListener('change', () => {
      state.spectroTolerance = parseInt(els.spectroTolerance.value, 10);
      spectroRenderBands();
      render();
    });

    // ── Match mode toggle ──
    els.spectroMatchAll.addEventListener('click', () => {
      state.spectroMatchMode = 'all';
      els.spectroMatchAll.classList.add('active');
      els.spectroMatchAny.classList.remove('active');
      render();
    });
    els.spectroMatchAny.addEventListener('click', () => {
      state.spectroMatchMode = 'any';
      els.spectroMatchAny.classList.add('active');
      els.spectroMatchAll.classList.remove('active');
      render();
    });

    // ── Clear all ──
    els.spectroClearBtn.addEventListener('click', spectroClearAll);

    // ── Preset buttons ──
    document.querySelectorAll('.spectro-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lines = btn.dataset.lines.split(',').map(Number);
        const mode = btn.dataset.mode || 'all';
        state.spectroBands = [];
        lines.forEach(nm => state.spectroBands.push({ nm }));
        state.spectroMatchMode = mode;
        els.spectroMatchAll.classList.toggle('active', mode === 'all');
        els.spectroMatchAny.classList.toggle('active', mode === 'any');
        // Open the panel if not already open
        if (!els.spectroBody.classList.contains('open')) {
          els.spectroBody.classList.add('open');
          els.spectroChevron.classList.add('open');
          els.spectroToggle.setAttribute('aria-expanded', 'true');
        }
        spectroRenderBands();
        render();
      });
    });

    // Initial render
    spectroRenderBands();
  }


  function setupReset() {
    els.btnReset.addEventListener('click', () => {
      // Reset state
      state.riMin = 1.400; state.riMax = 3.000;
      state.birefMin = 0.000; state.birefMax = 0.300;
      state.sgMin = 1.00; state.sgMax = 7.50;
      state.hardnessMin = 1.0; state.hardnessMax = 10.0;
      state.optic = 'all';
      state.searchName = '';
      // Reset spectroscopy
      state.spectroBands = [];
      state.spectroTolerance = 8;
      state.spectroMatchMode = 'all';

      // Reset sliders
      els.riMin.value = 1.400; els.riMax.value = 3.000;
      els.riMinInput.value = '1.400'; els.riMaxInput.value = '3.000';
      els.riRangeLabel.textContent = '1.400 – 3.000';

      els.birefMin.value = 0.000; els.birefMax.value = 0.300;
      els.birefMinInput.value = '0.000'; els.birefMaxInput.value = '0.300';
      els.birefRangeLabel.textContent = '0.000 – 0.300';

      els.sgMin.value = 1.00; els.sgMax.value = 7.50;
      els.sgMinInput.value = '1.00'; els.sgMaxInput.value = '7.50';
      els.sgRangeLabel.textContent = '1.00 – 7.50';

      els.hardnessMin.value = 1.0; els.hardnessMax.value = 10.0;
      els.hardnessMinInput.value = '1.0'; els.hardnessMaxInput.value = '10.0';
      els.hardnessRangeLabel.textContent = '1.0 – 10.0';

      els.opticChips.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      els.opticChips.querySelector('[data-value="all"]').classList.add('active');

      els.searchName.value = '';
      els.spectroTolerance.value = '8';
      els.spectroMatchAll.classList.add('active');
      els.spectroMatchAny.classList.remove('active');

      updateFill(els.riFill, els.riMin, els.riMax);
      updateFill(els.birefFill, els.birefMin, els.birefMax);
      updateFill(els.sgFill, els.sgMin, els.sgMax);
      updateFill(els.hardnessFill, els.hardnessMin, els.hardnessMax);

      spectroRenderBands();
      render();
    });
  }

  // ========================
  // FILTERING
  // ========================
  function rangesOverlap(filterMin, filterMax, gemMin, gemMax) {
    return gemMin <= filterMax && gemMax >= filterMin;
  }

  // Helper to normalize strings for robust spectroscopy lookup
  function cleanGemKey(str) {
    if (!str) return '';
    return str.replace(/\s*\([^)]*\)/g, '').trim().toLowerCase();
  }

  // Resolve the spectroscopy data for a gem — checks name, group, and varieties
  function getGemSpectroscopy(gem) {
    if (typeof SPECTROSCOPY_DB === 'undefined') return null;
    if (SPECTROSCOPY_DB[gem.name]) return SPECTROSCOPY_DB[gem.name];

    // Cleaned name (e.g. "Jadeite (Jade)" -> "Jadeite", "Iolite (Cordierite)" -> "Iolite")
    const cleanName = gem.name.replace(/\s*\([^)]*\)/g, '').trim();
    if (SPECTROSCOPY_DB[cleanName]) return SPECTROSCOPY_DB[cleanName];

    // Group-level match
    if (gem.group) {
      if (SPECTROSCOPY_DB[gem.group]) return SPECTROSCOPY_DB[gem.group];
      const cleanGroup = gem.group.replace(/\s*\([^)]*\)/g, '').trim();
      if (SPECTROSCOPY_DB[cleanGroup]) return SPECTROSCOPY_DB[cleanGroup];
    }

    // Variety name match
    if (gem.varieties && gem.varieties.length > 0) {
      for (const v of gem.varieties) {
        if (SPECTROSCOPY_DB[v]) return SPECTROSCOPY_DB[v];
        const cleanV = v.replace(/\s*\([^)]*\)/g, '').trim();
        if (SPECTROSCOPY_DB[cleanV]) return SPECTROSCOPY_DB[cleanV];
      }
    }

    // Case-insensitive / normalized fallback
    const targetClean = cleanGemKey(gem.name);
    for (const [key, val] of Object.entries(SPECTROSCOPY_DB)) {
      if (cleanGemKey(key) === targetClean) return val;
    }

    return null;
  }

  // Check if a gem's spectroscopy lines or broad bands fall within active filter bands (± tolerance)
  function gemMatchesSpectro(gem) {
    if (state.spectroBands.length === 0) return true; // no spectro filter active
    const spectro = getGemSpectroscopy(gem);
    if (!spectro) return false;
    const hasLines = spectro.lines && spectro.lines.length > 0;
    const hasBands = spectro.bands && spectro.bands.length > 0;
    if (!hasLines && !hasBands) return false; // no spectrum = no match

    const tol = state.spectroTolerance;
    const allLines = spectro.lines || [];
    const allBands = spectro.bands || [];

    function bandHit(filterBand) {
      // Direct characteristic line hit
      const hitLine = allLines.some(line => Math.abs(line - filterBand.nm) <= tol);
      // Broad absorption band hit
      const hitBand = allBands.some(b => {
        const min = Math.min(b.start, b.end) - tol;
        const max = Math.max(b.start, b.end) + tol;
        return filterBand.nm >= min && filterBand.nm <= max;
      });
      return hitLine || hitBand;
    }

    if (state.spectroMatchMode === 'all') {
      return state.spectroBands.every(bandHit);
    } else {
      return state.spectroBands.some(bandHit);
    }
  }

  function filterGems() {
    return GEMSTONES.filter(gem => {
      // RI overlap
      if (!rangesOverlap(state.riMin, state.riMax, gem.ri.min, gem.ri.max)) return false;

      // Birefringence overlap
      if (!rangesOverlap(state.birefMin, state.birefMax, gem.birefringence.min, gem.birefringence.max)) return false;

      // SG overlap
      if (!rangesOverlap(state.sgMin, state.sgMax, gem.sg.min, gem.sg.max)) return false;

      // Hardness overlap
      if (!rangesOverlap(state.hardnessMin, state.hardnessMax, gem.hardness.min, gem.hardness.max)) return false;

      // Optic character
      if (state.optic !== 'all') {
        const gemOptic = gem.optic.toUpperCase();
        const filterOptic = state.optic.toUpperCase();
        // Match if the gem's optic contains the filter value
        // e.g., "DR/AGG" matches both "DR" and "AGG"
        if (!gemOptic.includes(filterOptic)) return false;
      }

      // Name search
      if (state.searchName) {
        const q = state.searchName;
        const nameMatch = gem.name.toLowerCase().includes(q);
        const groupMatch = gem.group.toLowerCase().includes(q);
        const varietyMatch = gem.varieties.some(v => v.toLowerCase().includes(q));
        if (!nameMatch && !groupMatch && !varietyMatch) return false;
      }

      // Spectroscopy filter
      if (!gemMatchesSpectro(gem)) return false;

      return true;
    });
  }

  // ========================
  // RENDERING
  // ========================
  function getOpticClass(optic) {
    const o = optic.toUpperCase();
    if (o.includes('AGG')) return 'agg';
    if (o.includes('DR')) return 'dr';
    return 'sr';
  }

  function getOpticLabel(optic) {
    return optic;
  }

  function createGemCard(gem, index) {
    const card = document.createElement('div');
    card.className = 'gem-card';
    card.style.animationDelay = (index * 30) + 'ms';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', 'View details for ' + gem.name);

    const riDisplay = gem.ri.min === gem.ri.max
      ? gem.ri.norm.toFixed(3)
      : gem.ri.min.toFixed(3) + ' – ' + gem.ri.max.toFixed(3);

    const birefDisplay = gem.birefringence.norm === 0 && gem.birefringence.max === 0
      ? 'None'
      : gem.birefringence.min === gem.birefringence.max
        ? gem.birefringence.norm.toFixed(3)
        : gem.birefringence.min.toFixed(3) + ' – ' + gem.birefringence.max.toFixed(3);

    const sgDisplay = gem.sg.min === gem.sg.max
      ? gem.sg.norm.toFixed(2)
      : gem.sg.min.toFixed(2) + ' – ' + gem.sg.max.toFixed(2);

    const hardnessDisplay = gem.hardness.min === gem.hardness.max
      ? gem.hardness.min.toFixed(1)
      : gem.hardness.min.toFixed(1) + ' – ' + gem.hardness.max.toFixed(1);

    // Color dots
    const colorDots = gem.colors.slice(0, 10).map(c => {
      const hex = COLOR_MAP[c.toLowerCase()] || '#888';
      return `<span class="color-dot" style="background:${hex}" title="${c}"></span>`;
    }).join('');

    // Varieties
    const varietyTags = gem.varieties.slice(0, 4).map(v =>
      `<span class="variety-tag">${v}</span>`
    ).join('');
    const moreVarieties = gem.varieties.length > 4
      ? `<span class="variety-tag">+${gem.varieties.length - 4} more</span>`
      : '';

    // ── Mini Spectrum Bar ──
    const spectro = getGemSpectroscopy(gem);
    let miniSpectrumHTML = '';
    if (spectro && ((spectro.lines && spectro.lines.length > 0) || (spectro.bands && spectro.bands.length > 0))) {
      const tol = state.spectroTolerance;
      const isFiltering = state.spectroBands.length > 0;
      const linesHTML = (spectro.lines || []).map(nm => {
        const pct = ((700 - nm) / 300) * 100;
        const matchesFilter = isFiltering && state.spectroBands.some(b => Math.abs(b.nm - nm) <= tol);
        const matchClass = matchesFilter ? ' mini-line-match' : '';
        return `<div class="mini-line${matchClass}" style="left:${pct}%;" title="${nm}nm"></div>`;
      }).join('');
      // Band overlays with fading gradient
      const bandsHTML = (spectro.bands || []).map(b => {
        const startPct = ((700 - b.start) / 300) * 100;
        const endPct = ((700 - b.end) / 300) * 100;
        const left = Math.min(startPct, endPct);
        const width = Math.abs(endPct - startPct);
        const grad = getBandGradient(b.start, b.end);
        return `<div class="mini-absorption" style="left:${left}%;width:${width}%;background:${grad};transform:none;" title="${b.strength || ''}"></div>`;
      }).join('');

      const keyLines = (spectro.lines && spectro.lines.length > 0)
        ? spectro.lines.slice(0, 6).map(nm => {
            const matches = isFiltering && state.spectroBands.some(b => Math.abs(b.nm - nm) <= tol);
            return `<span class="gem-spectrum-nm ${matches ? 'matched-nm' : ''}">${nm}</span>`;
          }).join(' ') + ' nm'
        : (spectro.bands && spectro.bands.length > 0 ? `<span class="gem-spectrum-nm">${spectro.bands[0].start}–${spectro.bands[0].end} nm band</span>` : '');

      miniSpectrumHTML = `
        <div class="gem-mini-spectrum ${isFiltering ? 'gem-spectrum-match-highlight' : ''}">
          ${bandsHTML}${linesHTML}
        </div>
        ${keyLines ? `<div class="gem-spectrum-label">${keyLines}</div>` : ''}
      `;
    }

    card.innerHTML = `
      <div class="gem-card-header">
        <div>
          <div class="gem-name">${gem.name}</div>
          ${gem.group ? `<div class="gem-group">${gem.group}</div>` : ''}
        </div>
        <span class="gem-optic-badge ${getOpticClass(gem.optic)}">${getOpticLabel(gem.optic)}</span>
      </div>
      <div class="gem-props">
        <div class="gem-prop">
          <span class="gem-prop-label">RI</span>
          <span class="gem-prop-value">${riDisplay}</span>
        </div>
        <div class="gem-prop">
          <span class="gem-prop-label">Birefringence</span>
          <span class="gem-prop-value">${birefDisplay}</span>
        </div>
        <div class="gem-prop">
          <span class="gem-prop-label">SG</span>
          <span class="gem-prop-value">${sgDisplay}</span>
        </div>
        <div class="gem-prop">
          <span class="gem-prop-label">Hardness</span>
          <span class="gem-prop-value">${hardnessDisplay}</span>
        </div>
      </div>
      <div class="gem-colors">${colorDots}</div>
      ${gem.varieties.length > 0 ? `<div class="gem-varieties">${varietyTags}${moreVarieties}</div>` : ''}
      ${miniSpectrumHTML}
    `;

    card.addEventListener('click', () => openModal(gem));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(gem);
      }
    });

    return card;
  }



  function render() {
    const filtered = filterGems();
    els.resultsGrid.innerHTML = '';

    if (filtered.length === 0) {
      els.emptyState.style.display = 'flex';
      els.resultsGrid.style.display = 'none';
    } else {
      els.emptyState.style.display = 'none';
      els.resultsGrid.style.display = 'grid';

      filtered.forEach((gem, i) => {
        els.resultsGrid.appendChild(createGemCard(gem, i));
      });
    }

    // Update match count
    const total = GEMSTONES.length;
    const count = filtered.length;
    els.matchCount.textContent = count === total
      ? `${count} gems`
      : `${count} of ${total} match`;
  }

  // ========================
  // MODAL
  // ========================
  function openModal(gem) {
    const riDisplay = gem.ri.min === gem.ri.max
      ? gem.ri.norm.toFixed(3)
      : gem.ri.min.toFixed(3) + ' – ' + gem.ri.max.toFixed(3) + ` (norm: ${gem.ri.norm.toFixed(3)})`;

    const birefDisplay = gem.birefringence.norm === 0 && gem.birefringence.max === 0
      ? 'None (SR)'
      : gem.birefringence.min === gem.birefringence.max
        ? gem.birefringence.norm.toFixed(3)
        : gem.birefringence.min.toFixed(3) + ' – ' + gem.birefringence.max.toFixed(3);

    const sgDisplay = gem.sg.min === gem.sg.max
      ? gem.sg.norm.toFixed(2)
      : gem.sg.min.toFixed(2) + ' – ' + gem.sg.max.toFixed(2) + ` (norm: ${gem.sg.norm.toFixed(2)})`;

    const hardnessDisplay = gem.hardness.min === gem.hardness.max
      ? gem.hardness.min.toFixed(1)
      : gem.hardness.min.toFixed(1) + ' – ' + gem.hardness.max.toFixed(1);

    const colorPills = gem.colors.map(c => {
      const hex = COLOR_MAP[c.toLowerCase()] || '#888';
      return `<span class="modal-color-pill">
        <span class="modal-color-swatch" style="background:${hex}"></span>
        ${c.charAt(0).toUpperCase() + c.slice(1)}
      </span>`;
    }).join('');

    const varietyTags = gem.varieties.map(v =>
      `<span class="modal-variety-tag">${v}</span>`
    ).join('');

    // ── Build Spectroscopy Modal Section ──
    const spectroData = getGemSpectroscopy(gem);
    let spectroSection = '';
    if (spectroData && ((spectroData.lines && spectroData.lines.length > 0) || (spectroData.bands && spectroData.bands.length > 0))) {
      const modalLinesHTML = (spectroData.lines || []).map(nm => {
        const pct = ((700 - nm) / 300) * 100;
        return `<div class="modal-abs-line" style="left:${pct}%;" title="${nm}nm"></div>`;
      }).join('');
      const modalBandsHTML = (spectroData.bands || []).map(b => {
        const startPct = ((700 - b.start) / 300) * 100;
        const endPct = ((700 - b.end) / 300) * 100;
        const left = Math.min(startPct, endPct);
        const width = Math.abs(endPct - startPct);
        const grad = getBandGradient(b.start, b.end);
        return `<div class="modal-abs-band" style="left:${left}%;width:${width}%;background:${grad};transform:none;" title="${b.strength}"></div>`;
      }).join('');
      const pillsHTML = (spectroData.lines || []).map(nm => {
        const color = nmToColor(nm);
        return `<span class="modal-spectro-pill" style="background:${color}20;border-color:${color}55;color:#e2e8f0;">${nm} nm</span>`;
      }).join('');
      const bandDetailHTML = (spectroData.bands || []).map(b => {
        const color = nmToColor((b.start + b.end) / 2);
        return `<div class="modal-spectro-band-row"><div class="modal-spectro-band-swatch" style="background:${color}"></div><span>${b.start}–${b.end} nm — ${b.strength}</span></div>`;
      }).join('');
      spectroSection = `
      <div class="modal-section">
        <div class="modal-section-title">⟨λ⟩ Absorption Spectroscopy (UV-Vis)</div>
        <div class="modal-spectrum-container">
          <div class="modal-spectrum-nm-labels"><span>700</span><span>650</span><span>600</span><span>550</span><span>500</span><span>450</span><span>400 nm</span></div>
          <div class="modal-spectrum-bar">${modalBandsHTML}${modalLinesHTML}</div>
        </div>
        ${pillsHTML ? `<div class="modal-spectro-lines-list">${pillsHTML}</div>` : ''}
        ${bandDetailHTML ? `<div class="modal-spectro-band-detail">${bandDetailHTML}</div>` : ''}
        <div class="modal-spectro-meta">
          ${spectroData.chromophore ? `<span><strong>Chromophore:</strong> ${spectroData.chromophore}</span>` : ''}
          ${spectroData.bookRef ? `<span><strong>Ref:</strong> ${spectroData.bookRef}</span>` : ''}
        </div>
        ${spectroData.description ? `<div class="modal-comments" style="margin-top:8px;font-size:11px;">${spectroData.description}</div>` : ''}
      </div>`;
    }

    els.modalBody.innerHTML = `
      <div class="modal-gem-title">${gem.name}</div>
      ${gem.group ? `<div class="modal-gem-group">${gem.group}</div>` : '<div style="height:16px"></div>'}

      ${spectroSection}

      <div class="modal-section">
        <div class="modal-section-title">Optical Properties</div>
        <div class="modal-props-grid">
          <div class="modal-prop">
            <span class="gem-prop-label">Refractive Index</span>
            <span class="gem-prop-value">${riDisplay}</span>
          </div>
          <div class="modal-prop">
            <span class="gem-prop-label">Birefringence</span>
            <span class="gem-prop-value">${birefDisplay}</span>
          </div>
          <div class="modal-prop">
            <span class="gem-prop-label">Optical Character</span>
            <span class="gem-prop-value">${gem.optic}</span>
          </div>
          <div class="modal-prop">
            <span class="gem-prop-label">Crystal System</span>
            <span class="gem-prop-value">${gem.crystalSystem}</span>
          </div>
          <div class="modal-prop">
            <span class="gem-prop-label">Pleochroism</span>
            <span class="gem-prop-value">${gem.pleochroism}</span>
          </div>
          <div class="modal-prop">
            <span class="gem-prop-label">Transparency</span>
            <span class="gem-prop-value">${gem.transparency}</span>
          </div>
        </div>
      </div>

      <div class="modal-section">
        <div class="modal-section-title">Physical Properties</div>
        <div class="modal-props-grid">
          <div class="modal-prop">
            <span class="gem-prop-label">Specific Gravity</span>
            <span class="gem-prop-value">${sgDisplay}</span>
          </div>
          <div class="modal-prop">
            <span class="gem-prop-label">Mohs Hardness</span>
            <span class="gem-prop-value">${hardnessDisplay}</span>
          </div>
          <div class="modal-prop">
            <span class="gem-prop-label">UV Fluorescence</span>
            <span class="gem-prop-value">${gem.fluorescence}</span>
          </div>
        </div>
      </div>

      ${gem.phenomena ? `
      <div class="modal-section">
        <div class="modal-section-title">Phenomena & Visual Characteristics</div>
        <div class="modal-comments">${gem.phenomena}</div>
      </div>` : ''}

      <div class="modal-section">
        <div class="modal-section-title">Color Range</div>
        <div class="modal-colors-row">${colorPills}</div>
      </div>

      ${gem.varieties.length > 0 ? `
      <div class="modal-section">
        <div class="modal-section-title">Varieties</div>
        <div class="modal-varieties-list">${varietyTags}</div>
      </div>` : ''}

      <div class="modal-section">
        <div class="modal-section-title">Identification Notes</div>
        <div class="modal-comments">${gem.comments}</div>
      </div>
    `;

    els.modal.classList.add('active');
    els.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    els.modal.classList.remove('active');
    els.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function setupModal() {
    els.modalClose.addEventListener('click', closeModal);
    els.modal.addEventListener('click', (e) => {
      if (e.target === els.modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && els.modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // ========================
  // INIT
  // ========================
  function init() {
    setupDualRange(
      els.riMin, els.riMax, els.riMinInput, els.riMaxInput,
      els.riFill, els.riRangeLabel, 'riMin', 'riMax', 3
    );
    setupDualRange(
      els.birefMin, els.birefMax, els.birefMinInput, els.birefMaxInput,
      els.birefFill, els.birefRangeLabel, 'birefMin', 'birefMax', 3
    );
    setupDualRange(
      els.sgMin, els.sgMax, els.sgMinInput, els.sgMaxInput,
      els.sgFill, els.sgRangeLabel, 'sgMin', 'sgMax', 2
    );
    setupDualRange(
      els.hardnessMin, els.hardnessMax, els.hardnessMinInput, els.hardnessMaxInput,
      els.hardnessFill, els.hardnessRangeLabel, 'hardnessMin', 'hardnessMax', 1
    );

    setupChips();
    setupSearch();
    setupReset();
    setupModal();
    setupSpectroscopy();

    render();
  }

  // Start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
