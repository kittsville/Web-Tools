const inputEl = document.getElementById('search');
const tools = Array.from(document.getElementById('tools').children);

inputEl.addEventListener('input', ev => {
    const searchQuery = ev.target.value.trim().toLowerCase();

    tools.forEach(tool => {
        const primaryText = tool.querySelector('.mdc-list-item__primary-text').textContent.toLowerCase();
        const secondaryText = tool.querySelector('.mdc-list-item__secondary-text').textContent.toLowerCase();

        const displayTool = primaryText.includes(searchQuery) || secondaryText.includes(searchQuery);

        tool.hidden = !displayTool;
    });
});
