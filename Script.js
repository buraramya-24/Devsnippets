// Load all snippets from browser storage
function loadSnippets() {
  const snippets = JSON.parse(localStorage.getItem("snippets") || "[]");
  const container = document.getElementById("snippets");
  container.innerHTML = "";

  snippets.forEach((s, i) => {
    const div = document.createElement("div");
    div.className = "snippet";
    div.innerHTML = `
      <strong>${s.title}</strong>
      <em>(${s.tag})</em>
      <pre><code>${s.code}</code></pre>
      <button onclick="deleteSnippet(${i})">Delete</button>
    `;
    container.appendChild(div);
  });
}

// When form is submitted, save new snippet
document.getElementById("addForm").addEventListener("submit", e => {
  e.preventDefault();
  const title = document.querySelector("#addForm input").value;
  const code = document.querySelector("#addForm textarea").value;
  const tag = document.querySelector("#addForm input[type='text'][placeholder='Tag (e.g., js, python)']").value;

  const snippets = JSON.parse(localStorage.getItem("snippets") || "[]");
  snippets.push({ title, code, tag });
  localStorage.setItem("snippets", JSON.stringify(snippets));

  document.getElementById("addForm").reset();
  loadSnippets();
});

// Search snippets as you type
function searchSnippets() {
  const query = document.getElementById("search").value.toLowerCase();
  const snippets = document.querySelectorAll(".snippet");

  snippets.forEach(s => {
    const text = s.innerText.toLowerCase();
    s.style.display = text.includes(query) ? "block" : "none";
  });
}

// Delete a snippet by index
function deleteSnippet(index) {
  const snippets = JSON.parse(localStorage.getItem("snippets") || "[]");
  snippets.splice(index, 1);
  localStorage.setItem("snippets", JSON.stringify(snippets));
  loadSnippets();
}

// Load snippets when page opens
loadSnippets();
