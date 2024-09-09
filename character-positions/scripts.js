const textarea = document.getElementById("input-text");

const snakeCaseText = (input) => {
  const matches = input.match(matchBlocks);

  if (matches) {
    return matches.map((part) => part.toLowerCase()).join("_");
  } else {
    return "Failed to parse";
  }
};

textarea.addEventListener("input", (e) => {
  const outputEl = document.getElementById("output");
  outputEl.textContent = "";
  const template = document
    .getElementById("table-template")
    .content.cloneNode(true);
  const tbody = template.querySelector("tbody");

  e.target.value.split("").forEach((character, index) => {
    const tr = document.getElementById("row-template").content.cloneNode(true)
      .children[0];

    tr.querySelector("th").textContent = index + 1;
    tr.querySelector("td").textContent = character;

    tbody.appendChild(tr);
  });

  outputEl.appendChild(template);
});

const exampleText = `FooBarBux`;

document.getElementById("see-example").addEventListener("click", () => {
  textarea.value = exampleText;
  textarea.dispatchEvent(
    new Event("input", {
      bubbles: true,
      cancelable: true,
    })
  );
});
