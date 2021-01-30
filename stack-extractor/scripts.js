document.getElementById('log-text').addEventListener('input', e => {
  const logText = e.target.value;
  const rawJson = logText.split(/({.+)/)[1];
  const json = JSON.parse(rawJson);
  const stackTrace = json.hasOwnProperty('StackTrace') ? json['StackTrace'] : json['stack_trace'];

  document.getElementById('stack-trace').textContent = stackTrace;
});
