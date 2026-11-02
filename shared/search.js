const formEl = document.getElementById('search-form');
const inputEl = document.getElementById('search');
const tools = Array.from(document.getElementById('tools').children);

let selectedEl = null;

function visibleTools() {
    return tools.filter(tool => !tool.hidden);
}

function setSelected(el) {
    if (selectedEl) {
        selectedEl.classList.remove('is-selected');
        selectedEl.removeAttribute('aria-selected');
    }

    selectedEl = el;

    if (selectedEl) {
        selectedEl.classList.add('is-selected');
        selectedEl.setAttribute('aria-selected', 'true');
        selectedEl.scrollIntoView({ block: 'nearest' });
    }
}

formEl.addEventListener('submit', ev => {
    ev.preventDefault();

    const visible = visibleTools();
    const target = selectedEl && !selectedEl.hidden
        ? selectedEl
        : (visible.length === 1 ? visible[0] : null);

    if (target) {
        window.location.href = target.getAttribute('href');
    }
});

inputEl.addEventListener('keydown', ev => {
    if (ev.key !== 'ArrowDown' && ev.key !== 'ArrowUp') return;

    const visible = visibleTools();
    if (!visible.length) return;

    ev.preventDefault();

    const current = visible.indexOf(selectedEl);
    const next = ev.key === 'ArrowDown'
        ? (current < 0 ? 0 : Math.min(current + 1, visible.length - 1))
        : (current < 0 ? visible.length - 1 : Math.max(current - 1, 0));

    setSelected(visible[next]);
});

inputEl.addEventListener('input', ev => {
    const searchQuery = ev.target.value.trim().toLowerCase();

    tools.forEach(tool => {
        const primaryText = tool.querySelector('.mdc-list-item__primary-text').textContent.toLowerCase();
        const secondaryText = tool.querySelector('.mdc-list-item__secondary-text').textContent.toLowerCase();

        const displayTool = primaryText.includes(searchQuery) || secondaryText.includes(searchQuery);

        tool.hidden = !displayTool;
    });

    if (selectedEl && selectedEl.hidden) {
        setSelected(null);
    }
});

inputEl.focus();
