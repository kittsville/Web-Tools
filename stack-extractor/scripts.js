document.getElementById('log-text').addEventListener('input', e => {
  let stackTrace;

  try {
    const logText = e.target.value;
    const rawJson = logText.split(/({.+)/)[1];
    const json = JSON.parse(rawJson);

    if (json.hasOwnProperty('StackTrace')) {
      stackTrace = json['StackTrace'];
    } else if (json.hasOwnProperty('stack_trace')) {
      stackTrace = json['stack_trace'];
    } else {
      throw new Error("JSON parsed but no 'StackTrace' or 'stack_trace' property found");
    }
  } catch (error) {
    stackTrace = "Failed to parse log:\n" + error.message;
  }

  document.getElementById('stack-trace').textContent = stackTrace;
});
