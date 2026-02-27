// Drug Management System
// All identifiers and mappings are simulated; this does NOT integrate real FDB or Medi-Span data.

const els = {
  // nav
  navButtons: document.querySelectorAll('.nav-btn'),
  views: document.querySelectorAll('.view'),

  // drug master
  drugForm: document.getElementById('form-drug'),
  drugGeneric: document.getElementById('drug-generic'),
  drugBrand: document.getElementById('drug-brand'),
  drugNdc: document.getElementById('drug-ndc'),
  drugStrength: document.getElementById('drug-strength'),
  drugFormField: document.getElementById('drug-form'),
  drugRoute: document.getElementById('drug-route'),
  drugDea: document.getElementById('drug-dea'),
  drugStatus: document.getElementById('drug-status'),
  drugNotes: document.getElementById('drug-notes'),
  drugMsg: document.getElementById('msg-drug'),
  drugReset: document.getElementById('btn-reset-drug'),
  drugSearch: document.getElementById('drug-search'),
  drugsTableBody: document.querySelector('#table-drugs tbody'),
  drugsEmpty: document.getElementById('empty-drugs'),

  // FDB
  fdbForm: document.getElementById('form-fdb'),
  fdbDrugSelect: document.getElementById('fdb-drug'),
  fdbDrugId: document.getElementById('fdb-drug-id'),
  fdbGcn: document.getElementById('fdb-gcn'),
  fdbGpi: document.getElementById('fdb-gpi'),
  fdbNotes: document.getElementById('fdb-notes'),
  fdbMsg: document.getElementById('msg-fdb'),
  fdbReset: document.getElementById('btn-reset-fdb'),
  fdbTableBody: document.querySelector('#table-fdb tbody'),
  fdbEmpty: document.getElementById('empty-fdb'),

  // Medi-Span
  msForm: document.getElementById('form-medispan'),
  msDrugSelect: document.getElementById('medispan-drug'),
  msDrugId: document.getElementById('medispan-drug-id'),
  msGpi: document.getElementById('medispan-gpi'),
  msNotes: document.getElementById('medispan-notes'),
  msMsg: document.getElementById('msg-medispan'),
  msReset: document.getElementById('btn-reset-medispan'),
  msTableBody: document.querySelector('#table-medispan tbody'),
  msEmpty: document.getElementById('empty-medispan'),

  // Clinical blocks
  blkForm: document.getElementById('form-blocks'),
  blkDrugSelect: document.getElementById('blocks-drug'),
  blkBlackBox: document.getElementById('blk-blackbox'),
  blkHighAlert: document.getElementById('blk-high-alert'),
  blkLookalike: document.getElementById('blk-lookalike'),
  blkPreg: document.getElementById('blk-preg'),
  blkLact: document.getElementById('blk-lactation'),
  blkRenal: document.getElementById('blk-renal'),
  blkHepatic: document.getElementById('blk-hepatic'),
  blkNotes: document.getElementById('blk-notes'),
  blkMsg: document.getElementById('msg-blocks'),
  blkReset: document.getElementById('btn-reset-blocks'),
  blkTableBody: document.querySelector('#table-blocks tbody'),
  blkEmpty: document.getElementById('empty-blocks'),
};

const STORAGE = {
  drugs: 'dms.drugs.v1',
  fdb: 'dms.fdb.v1',
  medispan: 'dms.medispan.v1',
  blocks: 'dms.blocks.v1',
  view: 'dms.view.v1',
};

let state = {
  drugs: [],
  fdb: [],
  medispan: [],
  blocks: [],
  activeView: 'drugs',
  editingDrugId: null,
};

// --- init ---

init();

function init(){
  loadState();
  bindNav();
  bindDrugMaster();
  bindFdb();
  bindMedispan();
  bindBlocks();
  renderAll();
}

// --- persistence ---

function loadState(){
  state.drugs = readJson(STORAGE.drugs) || [];
  state.fdb = readJson(STORAGE.fdb) || [];
  state.medispan = readJson(STORAGE.medispan) || [];
  state.blocks = readJson(STORAGE.blocks) || [];
  const view = localStorage.getItem(STORAGE.view);
  if (view === 'drugs' || view === 'fdb' || view === 'medispan' || view === 'blocks'){
    state.activeView = view;
  }
}

function persist(){
  writeJson(STORAGE.drugs, state.drugs);
  writeJson(STORAGE.fdb, state.fdb);
  writeJson(STORAGE.medispan, state.medispan);
  writeJson(STORAGE.blocks, state.blocks);
  localStorage.setItem(STORAGE.view, state.activeView);
}

function readJson(key){
  try{
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}

function writeJson(key, value){
  localStorage.setItem(key, JSON.stringify(value));
}

function uid(){
  return Date.now().toString(36) + Math.random().toString(36).slice(2,8);
}

// --- navigation / views ---

function bindNav(){
  els.navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      if (!view || view === state.activeView) return;
      state.activeView = view;
      persist();
      updateView();
    });
  });
  updateView();
}

function updateView(){
  els.navButtons.forEach(btn => {
    const active = btn.dataset.view === state.activeView;
    btn.classList.toggle('is-active', active);
  });
  els.views.forEach(viewEl => {
    const id = viewEl.id.replace('view-','');
    const show = id === state.activeView;
    if (show){
      viewEl.hidden = false;
      viewEl.classList.add('is-active');
    } else {
      viewEl.hidden = true;
      viewEl.classList.remove('is-active');
    }
  });
}

// --- drug master ---

function bindDrugMaster(){
  if (!els.drugForm) return;

  els.drugForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveDrug();
  });

  els.drugReset?.addEventListener('click', () => {
    state.editingDrugId = null;
    els.drugForm.reset();
    setMsg(els.drugMsg, 'Cleared form.', '');
  });

  els.drugSearch?.addEventListener('input', () => renderDrugTable());
}

function saveDrug(){
  const payload = {
    generic: els.drugGeneric.value.trim(),
    brand: els.drugBrand.value.trim(),
    ndc: els.drugNdc.value.trim(),
    strength: els.drugStrength.value.trim(),
    form: els.drugFormField.value.trim(),
    route: els.drugRoute.value.trim(),
    dea: els.drugDea.value.trim(),
    status: els.drugStatus.value || 'active',
    notes: els.drugNotes.value.trim(),
  };

  if (!payload.generic){
    setMsg(els.drugMsg, 'Generic name is required.', 'err');
    els.drugGeneric.focus();
    return;
  }

  if (state.editingDrugId){
    const existing = state.drugs.find(d => d.id === state.editingDrugId);
    if (!existing){
      state.editingDrugId = null;
    } else {
      Object.assign(existing, payload);
    }
  } else {
    state.drugs.unshift({id: uid(), ...payload});
  }

  persist();
  renderAll();
  setMsg(els.drugMsg, 'Drug saved.', 'ok');
}

function renderDrugTable(){
  if (!els.drugsTableBody) return;
  els.drugsTableBody.innerHTML = '';

  const q = (els.drugSearch?.value || '').toLowerCase();
  const rows = state.drugs.filter(d => {
    if (!q) return true;
    const hay = [d.generic, d.brand, d.ndc, d.route, d.form].join(' ').toLowerCase();
    return hay.includes(q);
  });

  if (rows.length === 0){
    if (els.drugsEmpty) els.drugsEmpty.style.display = 'block';
    return;
  }
  if (els.drugsEmpty) els.drugsEmpty.style.display = 'none';

  for (const d of rows){
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(d.generic)}</td>
      <td>${escapeHtml(d.brand || '')}</td>
      <td>${escapeHtml(d.ndc || '')}</td>
      <td>${escapeHtml(d.strength || '')}</td>
      <td>${escapeHtml(d.route || '')}</td>
      <td>${escapeHtml(d.status || '')}</td>
    `;
    tr.addEventListener('click', () => loadDrugForEdit(d.id));
    els.drugsTableBody.appendChild(tr);
  }
}

function loadDrugForEdit(id){
  const d = state.drugs.find(x => x.id === id);
  if (!d || !els.drugForm) return;
  state.editingDrugId = id;
  els.drugGeneric.value = d.generic || '';
  els.drugBrand.value = d.brand || '';
  els.drugNdc.value = d.ndc || '';
  els.drugStrength.value = d.strength || '';
  els.drugFormField.value = d.form || '';
  els.drugRoute.value = d.route || '';
  els.drugDea.value = d.dea || '';
  els.drugStatus.value = d.status || 'active';
  els.drugNotes.value = d.notes || '';
  setMsg(els.drugMsg, 'Loaded drug into form for editing.', '');
}

// --- FDB (simulated) ---

function bindFdb(){
  if (!els.fdbForm) return;
  els.fdbForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveFdb();
  });
  els.fdbReset?.addEventListener('click', () => {
    els.fdbForm.reset();
    setMsg(els.fdbMsg, 'Cleared mapping form.', '');
  });
}

function saveFdb(){
  const drugId = els.fdbDrugSelect.value;
  if (!drugId){
    setMsg(els.fdbMsg, 'Select a drug first.', 'err');
    return;
  }
  const payload = {
    id: drugId,
    fdbDrugId: els.fdbDrugId.value.trim(),
    gcnSeqNo: els.fdbGcn.value.trim(),
    gpi: els.fdbGpi.value.trim(),
    notes: els.fdbNotes.value.trim(),
  };
  const idx = state.fdb.findIndex(m => m.id === drugId);
  if (idx >= 0) state.fdb[idx] = payload; else state.fdb.push(payload);
  persist();
  renderFdb();
  setMsg(els.fdbMsg, 'FDB mapping saved (simulated).', 'ok');
}

function renderFdb(){
  if (!els.fdbTableBody) return;
  els.fdbTableBody.innerHTML = '';
  if (!state.fdb.length){
    if (els.fdbEmpty) els.fdbEmpty.style.display = 'block';
    return;
  }
  if (els.fdbEmpty) els.fdbEmpty.style.display = 'none';
  for (const m of state.fdb){
    const drug = state.drugs.find(d => d.id === m.id);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(drug?.generic || '(missing)')}</td>
      <td>${escapeHtml(m.fdbDrugId || '')}</td>
      <td>${escapeHtml(m.gcnSeqNo || '')}</td>
      <td>${escapeHtml(m.gpi || '')}</td>
    `;
    tr.addEventListener('click', () => loadFdbIntoForm(m.id));
    els.fdbTableBody.appendChild(tr);
  }
}

function loadFdbIntoForm(drugId){
  const m = state.fdb.find(x => x.id === drugId);
  if (!m) return;
  els.fdbDrugSelect.value = drugId;
  els.fdbDrugId.value = m.fdbDrugId || '';
  els.fdbGcn.value = m.gcnSeqNo || '';
  els.fdbGpi.value = m.gpi || '';
  els.fdbNotes.value = m.notes || '';
  setMsg(els.fdbMsg, 'Loaded mapping into form for editing.', '');
}

// --- Medi-Span (simulated) ---

function bindMedispan(){
  if (!els.msForm) return;
  els.msForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveMedispan();
  });
  els.msReset?.addEventListener('click', () => {
    els.msForm.reset();
    setMsg(els.msMsg, 'Cleared mapping form.', '');
  });
}

function saveMedispan(){
  const drugId = els.msDrugSelect.value;
  if (!drugId){
    setMsg(els.msMsg, 'Select a drug first.', 'err');
    return;
  }
  const payload = {
    id: drugId,
    msDrugId: els.msDrugId.value.trim(),
    gpi: els.msGpi.value.trim(),
    notes: els.msNotes.value.trim(),
  };
  const idx = state.medispan.findIndex(m => m.id === drugId);
  if (idx >= 0) state.medispan[idx] = payload; else state.medispan.push(payload);
  persist();
  renderMedispan();
  setMsg(els.msMsg, 'Medi-Span mapping saved (simulated).', 'ok');
}

function renderMedispan(){
  if (!els.msTableBody) return;
  els.msTableBody.innerHTML = '';
  if (!state.medispan.length){
    if (els.msEmpty) els.msEmpty.style.display = 'block';
    return;
  }
  if (els.msEmpty) els.msEmpty.style.display = 'none';
  for (const m of state.medispan){
    const drug = state.drugs.find(d => d.id === m.id);
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(drug?.generic || '(missing)')}</td>
      <td>${escapeHtml(m.msDrugId || '')}</td>
      <td>${escapeHtml(m.gpi || '')}</td>
    `;
    tr.addEventListener('click', () => loadMedispanIntoForm(m.id));
    els.msTableBody.appendChild(tr);
  }
}

function loadMedispanIntoForm(drugId){
  const m = state.medispan.find(x => x.id === drugId);
  if (!m) return;
  els.msDrugSelect.value = drugId;
  els.msDrugId.value = m.msDrugId || '';
  els.msGpi.value = m.gpi || '';
  els.msNotes.value = m.notes || '';
  setMsg(els.msMsg, 'Loaded mapping into form for editing.', '');
}

// --- Clinical blocks ---

function bindBlocks(){
  if (!els.blkForm) return;
  els.blkForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveBlocks();
  });
  els.blkReset?.addEventListener('click', () => {
    els.blkForm.reset();
    setMsg(els.blkMsg, 'Cleared clinical block form.', '');
  });
}

function saveBlocks(){
  const drugId = els.blkDrugSelect.value;
  if (!drugId){
    setMsg(els.blkMsg, 'Select a drug first.', 'err');
    return;
  }

  const payload = {
    id: drugId,
    blackBox: !!els.blkBlackBox.checked,
    highAlert: !!els.blkHighAlert.checked,
    lookalike: !!els.blkLookalike.checked,
    preg: els.blkPreg.value,
    lactation: !!els.blkLact.checked,
    renal: !!els.blkRenal.checked,
    hepatic: !!els.blkHepatic.checked,
    notes: els.blkNotes.value.trim(),
  };
  const idx = state.blocks.findIndex(b => b.id === drugId);
  if (idx >= 0) state.blocks[idx] = payload; else state.blocks.push(payload);
  persist();
  renderBlocks();
  setMsg(els.blkMsg, 'Clinical block saved.', 'ok');
}

function renderBlocks(){
  if (!els.blkTableBody) return;
  els.blkTableBody.innerHTML = '';
  if (!state.blocks.length){
    if (els.blkEmpty) els.blkEmpty.style.display = 'block';
    return;
  }
  if (els.blkEmpty) els.blkEmpty.style.display = 'none';
  for (const b of state.blocks){
    const drug = state.drugs.find(d => d.id === b.id);
    const warnings = [
      b.blackBox ? 'Black box' : '',
      b.highAlert ? 'High-alert' : '',
      b.lookalike ? 'LASA' : '',
    ].filter(Boolean).join(', ') || '—';
    const preg = b.preg || '—';
    const rh = [b.renal ? 'Renal' : '', b.hepatic ? 'Hepatic' : ''].filter(Boolean).join(', ') || '—';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(drug?.generic || '(missing)')}</td>
      <td>${escapeHtml(warnings)}</td>
      <td>${escapeHtml(preg)}</td>
      <td>${escapeHtml(rh)}</td>
    `;
    tr.addEventListener('click', () => loadBlocksIntoForm(b.id));
    els.blkTableBody.appendChild(tr);
  }
}

function loadBlocksIntoForm(drugId){
  const b = state.blocks.find(x => x.id === drugId);
  if (!b) return;
  els.blkDrugSelect.value = drugId;
  els.blkBlackBox.checked = !!b.blackBox;
  els.blkHighAlert.checked = !!b.highAlert;
  els.blkLookalike.checked = !!b.lookalike;
  els.blkPreg.value = b.preg || '';
  els.blkLact.checked = !!b.lactation;
  els.blkRenal.checked = !!b.renal;
  els.blkHepatic.checked = !!b.hepatic;
  els.blkNotes.value = b.notes || '';
  setMsg(els.blkMsg, 'Loaded clinical block into form for editing.', '');
}

// --- shared rendering helpers ---

function renderAll(){
  renderDrugTable();
  refreshDrugDropdowns();
  renderFdb();
  renderMedispan();
  renderBlocks();
}

function refreshDrugDropdowns(){
  const options = state.drugs.map(d => `<option value="${escapeAttr(d.id)}">${escapeHtml(d.generic)}${d.brand ? ' ('+escapeHtml(d.brand)+')' : ''}</option>`).join('');
  if (els.fdbDrugSelect){
    els.fdbDrugSelect.innerHTML = '<option value="">Select drug…</option>' + options;
  }
  if (els.msDrugSelect){
    els.msDrugSelect.innerHTML = '<option value="">Select drug…</option>' + options;
  }
  if (els.blkDrugSelect){
    els.blkDrugSelect.innerHTML = '<option value="">Select drug…</option>' + options;
  }
}

function setMsg(node, text, kind){
  if (!node) return;
  node.textContent = text || '';
  node.classList.remove('ok','err');
  if (kind) node.classList.add(kind);
}

function escapeHtml(s){
  return String(s)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

function escapeAttr(s){
  return escapeHtml(s).replace(/"/g,'&quot;');
}
