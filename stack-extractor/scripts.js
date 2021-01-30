document.getElementById('log-text').addEventListener('input', e => {
  let stackTrace;

  try {
    const logText = e.target.value;
    const rawJson = logText.split(/({.+)/)[1];
    const json = JSON.parse(rawJson);
    stackTrace = json.hasOwnProperty('StackTrace') ? json['StackTrace'] : json['stack_trace'];
  } catch (error) {
    stackTrace = "Failed to parse log:\n" + error.message;
  }

  document.getElementById('stack-trace').textContent = stackTrace;
});
