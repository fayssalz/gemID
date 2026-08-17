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
    searchName: ''
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
    modalClose: document.getElementById('modal-close')
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
  // RESET
  // ========================
  function setupReset() {
    els.btnReset.addEventListener('click', () => {
      // Reset state
      state.riMin = 1.400; state.riMax = 3.000;
      state.birefMin = 0.000; state.birefMax = 0.300;
      state.sgMin = 1.00; state.sgMax = 7.50;
      state.hardnessMin = 1.0; state.hardnessMax = 10.0;
      state.optic = 'all';
      state.searchName = '';

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

      updateFill(els.riFill, els.riMin, els.riMax);
      updateFill(els.birefFill, els.birefMin, els.birefMax);
      updateFill(els.sgFill, els.sgMin, els.sgMax);
      updateFill(els.hardnessFill, els.hardnessMin, els.hardnessMax);

      render();
    });
  }

  // ========================
  // FILTERING
  // ========================
  function rangesOverlap(filterMin, filterMax, gemMin, gemMax) {
    return gemMin <= filterMax && gemMax >= filterMin;
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

    els.modalBody.innerHTML = `
      <div class="modal-gem-title">${gem.name}</div>
      ${gem.group ? `<div class="modal-gem-group">${gem.group}</div>` : '<div style="height:16px"></div>'}

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

    render();
  }

  // Start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
