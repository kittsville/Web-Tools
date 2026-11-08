const MAX_BYTES = 6 * 1024 * 1024;
const MAX_ROWS = 5000;
const MAX_COLUMNS = 30;

const form = document.getElementById('fetch-form');
const urlInput = document.getElementById('csv-url');
const headerInput = document.getElementById('header-row');
const statusEl = document.getElementById('status');
const errorEl = document.getElementById('error');
const resultsEl = document.getElementById('results');
const searchInput = document.getElementById('row-search');
const matchCountEl = document.getElementById('match-count');
const headerRowEl = document.querySelector('.mdc-data-table__header-row');
const tbodyEl = document.querySelector('.mdc-data-table__content');

let records = null;
let requestSeq = 0;

const checkbox = mdc.checkbox.MDCCheckbox.attachTo(document.querySelector('.mdc-checkbox'));
const formField = mdc.formField.MDCFormField.attachTo(document.querySelector('.mdc-form-field'));
formField.input = checkbox;

const parseHttpUrl = (rawUrl) => {
  const trimmed = rawUrl.trim();
  if (!trimmed) {
    throw new Error('Enter a CSV URL.');
  }

  let url;
  try {
    url = new URL(trimmed);
  } catch (e) {
    throw new Error('Enter a valid URL.');
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('URL must use http or https.');
  }

  return url;
};

const parseCsv = (text) => {
  const result = Papa.parse(text, {
    delimiter: ',',
    header: false,
    skipEmptyLines: false,
  });

  const quoteError = result.errors.find((error) => error.type === 'Quotes');
  if (quoteError) {
    throw new Error(`Could not parse the CSV. ${quoteError.message}.`);
  }

  let rows = result.data;
  // Papa Parse keeps an extra empty row when the file ends in a newline.
  if (text.endsWith('\n') || text.endsWith('\r')) {
    const last = rows[rows.length - 1];
    if (last && last.length === 1 && last[0] === '') {
      rows = rows.slice(0, -1);
    }
  }

  if (rows.length === 0) {
    throw new Error('CSV is empty.');
  }

  if (rows.length > MAX_ROWS) {
    throw new Error('CSV has more than 5,000 rows.');
  }

  const width = rows.reduce((max, row) => Math.max(max, row.length), 0);
  if (width === 0) {
    throw new Error('CSV is empty.');
  }
  if (width > MAX_COLUMNS) {
    throw new Error('CSV has more than 30 columns.');
  }

  return rows;
};

const columnLabel = (index) => {
  const useHeader = headerInput.checked;
  if (!useHeader) {
    return `Column ${index + 1}`;
  }

  const header = records[0];
  if (index < header.length) {
    return header[index];
  }

  return `Column ${index + 1}`;
};

const dataRows = () => headerInput.checked ? records.slice(1) : records;

const applySearch = () => {
  const query = searchInput.value.toLowerCase();
  const rows = tbodyEl.querySelectorAll('tr');
  let visible = 0;

  rows.forEach((row) => {
    const matches = query === '' || row._filterValues.some((value) => value.includes(query));
    row.hidden = !matches;
    if (matches) {
      visible += 1;
    }
  });

  const total = rows.length;
  if (query === '') {
    matchCountEl.textContent = `${total} ${total === 1 ? 'row' : 'rows'}`;
  } else {
    matchCountEl.textContent = `${visible} of ${total} ${total === 1 ? 'row' : 'rows'}`;
  }
};

const renderTable = () => {
  const width = records.reduce((max, row) => Math.max(max, row.length), 0);
  headerRowEl.replaceChildren();

  for (let index = 0; index < width; index += 1) {
    const th = document.createElement('th');
    th.className = 'mdc-data-table__header-cell';
    th.scope = 'col';
    th.textContent = columnLabel(index);
    headerRowEl.appendChild(th);
  }

  const fragment = document.createDocumentFragment();
  dataRows().forEach((record) => {
    const tr = document.createElement('tr');
    tr.className = 'mdc-data-table__row';
    const values = [];

    for (let index = 0; index < width; index += 1) {
      const value = index < record.length ? record[index] : '';
      values.push(value);
      const td = document.createElement('td');
      td.className = 'mdc-data-table__cell';
      td.textContent = value;
      tr.appendChild(td);
    }

    tr._filterValues = values.map((value) => value.toLowerCase());
    fragment.appendChild(tr);
  });

  tbodyEl.replaceChildren(fragment);
  resultsEl.hidden = false;
  applySearch();
};

const clearOutput = () => {
  errorEl.hidden = true;
  errorEl.textContent = '';
  matchCountEl.textContent = '';
  resultsEl.hidden = true;
  records = null;
  searchInput.value = '';
  headerRowEl.replaceChildren();
  tbodyEl.replaceChildren();
};

const showError = (message) => {
  statusEl.textContent = '';
  errorEl.hidden = false;
  errorEl.textContent = message;
};

const fetchCsv = async (rawUrl) => {
  const seq = ++requestSeq;
  clearOutput();
  statusEl.textContent = 'Fetching…';

  try {
    const url = parseHttpUrl(rawUrl);
    const pageUrl = new URL(location.href);
    pageUrl.searchParams.set('csv', url.toString());
    history.replaceState(null, '', pageUrl);

    let response;
    try {
      response = await fetch(url.toString(), { credentials: 'omit' });
    } catch (e) {
      throw new Error('Could not fetch the CSV. The host may not allow cross-origin requests, or the address could not be reached.');
    }

    if (!response.ok) {
      throw new Error(`Could not fetch the CSV (HTTP ${response.status}).`);
    }

    const buffer = await response.arrayBuffer();
    if (buffer.byteLength > MAX_BYTES) {
      throw new Error('CSV is larger than 6 MB.');
    }

    const text = new TextDecoder('utf-8').decode(buffer);
    const rows = parseCsv(text);
    if (seq !== requestSeq) {
      return;
    }

    records = rows;
    statusEl.textContent = '';
    renderTable();
  } catch (e) {
    if (seq !== requestSeq) {
      return;
    }
    records = null;
    resultsEl.hidden = true;
    showError(e.message);
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  fetchCsv(urlInput.value);
});

headerInput.addEventListener('change', () => {
  if (records) {
    renderTable();
  }
});

searchInput.addEventListener('input', () => {
  if (records) {
    applySearch();
  }
});

const initialUrl = new URL(location.href).searchParams.get('csv');
if (initialUrl) {
  urlInput.value = initialUrl;
}
