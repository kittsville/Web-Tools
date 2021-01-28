document.getElementById('log-text').addEventListener('input', e => {
  const logText = e.target.value;
  const rawJson = logText.split(/({.+)/)[1];
  const json = JSON.parse(rawJson);
  const stackTrace = json.hasOwnProperty('StackTrace') ? json['StackTrace'] : json['stack_trace'];

  document.getElementById('stack-trace').textContent = stackTrace;
});

// Initialises Material Design Components
// See: https://github.com/material-components/material-components-web#javascript
Array.from(document.getElementsByClassName('mdc-text-field')).forEach(mdc.textField.MDCTextField.attachTo);
Array.from(document.getElementsByTagName('button')).forEach(mdc.iconButton.MDCIconButtonToggle.attachTo);
