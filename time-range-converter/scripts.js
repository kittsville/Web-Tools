const textarea = document.getElementById('input-text');

const padded = (number) => ('0' + number).slice(-2);

const g2lTimestamp = (formattedDateTime) => {
  const unix = Date.parse(formattedDateTime);

  return isNaN(unix) ? null : unix.toString();
};

const l2gTimestamp = (unix) => {
  const intUnix = parseInt(unix);

  if (isNaN(intUnix)) {
    return null;
  }
  
  try {
    const iso = (new Date(intUnix)).toISOString();
    iso.rem
    return ;
  } catch (e) {
    return null;
  }
};

const convertG2L = json => {
  return {
    "start": g2lTimestamp(json.from),
    "end": g2lTimestamp(json.to)
  };
}

const convertL2G = json => {
  return {
    "from": l2gTimestamp(json.start),
    "to": l2gTimestamp(json.end)
  };
};

const convert = (input) => {
  try {
    const json = JSON.parse(input);
    const isGrafanaFormatted = json.hasOwnProperty("from") && json.hasOwnProperty("to");
    const isLogScaleFormatted = json.hasOwnProperty("start") && json.hasOwnProperty("end");

    let converted;

    if (isGrafanaFormatted) {
      converted = convertG2L(json);
    } else if (isLogScaleFormatted) {
      converted = convertL2G(json);
    } else {
      converted = "Not recognise as either Grafana or LogScale time range formats";
    }
    const stringifiedConverted = JSON.stringify(converted);
    return {
      grafanaFormatted: isGrafanaFormatted ? input : stringifiedConverted,
      logScaleFormatted: isLogScaleFormatted ? input : stringifiedConverted
    }
  } catch (e) {
    return `Failed to parse JSON: ${e}`;
  }
}

textarea.addEventListener('input', e => {
  const {grafanaFormatted, logScaleFormatted} = convert(e.target.value);
  document.getElementById('output-text').textContent = grafanaFormatted;
  document.getElementById('output-text-2').textContent = logScaleFormatted;
});

const exampleInput = `{
    "start": "1758236400000",
    "end": "1758409199999",
    "timezone": "Europe/London"
}`;

document.getElementById('see-example').addEventListener('click', () => {
  textarea.value = exampleInput;
  textarea.dispatchEvent(new Event('input', {
    bubbles: true,
    cancelable: true,
  }));
});
