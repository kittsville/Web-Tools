const formEl = document.getElementById('search-form');
const inputEl = document.getElementById('search');
const tools = Array.from(document.getElementById('tools').children);

formEl.addEventListener('submit', ev => {
    ev.preventDefault();
    
    const visibleMenuItems = document.querySelectorAll("#tools > a:not([hidden])");

    if (visibleMenuItems.length === 1) {
        window.location.href = visibleMenuItems[0].getAttribute("href");
    }
})

inputEl.addEventListener('input', ev => {
    const searchQuery = ev.target.value.trim().toLowerCase();

    tools.forEach(tool => {
        const primaryText = tool.querySelector('.mdc-list-item__primary-text').textContent.toLowerCase();
        const secondaryText = tool.querySelector('.mdc-list-item__secondary-text').textContent.toLowerCase();

        const displayTool = primaryText.includes(searchQuery) || secondaryText.includes(searchQuery);

        tool.hidden = !displayTool;
    });
});

inputEl.focus();
