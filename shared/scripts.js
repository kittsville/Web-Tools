// Initialises Material Design Components
// See: https://github.com/material-components/material-components-web#javascript
Array.from(document.getElementsByClassName('mdc-text-field')).forEach(mdc.textField.MDCTextField.attachTo);
Array.from(document.getElementsByTagName('button')).forEach(mdc.iconButton.MDCIconButtonToggle.attachTo);
Array.from(document.getElementsByTagName('ul')).forEach(mdc.list.MDCList.attachTo);

Array.from(document.getElementsByTagName('pre')).forEach(preEl => {
    const copyEl = document.createElement('span');
    copyEl.classList.add('material-icons', 'copy');
    copyEl.textContent = 'content_copy';
    copyEl.title = 'Copy to clipboard';
    copyEl.addEventListener('click', () => navigator.clipboard.writeText(preEl.textContent));

    const wrapperEl = document.createElement('div');
    wrapperEl.classList.add('pre-wrapper');
    wrapperEl.appendChild(copyEl);
    preEl.after(wrapperEl);
    wrapperEl.appendChild(preEl);
});

navigator.serviceWorker.register('/worker.js').catch(e => {
    document.body.appendChild( document.createTextNode( e.toString() ) );
    throw e;
});
