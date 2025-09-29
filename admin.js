function loadData() {
  return JSON.parse(localStorage.getItem("m2_data")) || {};
}

function saveData(data) {
  localStorage.setItem("m2_data", JSON.stringify(data));
}

const subjectForm = document.getElementById("subjectForm");
const pdfForm = document.getElementById("pdfForm");
const subjectSelect = document.getElementById("subjectSelect");
const pdfList = document.getElementById("pdfList");

// Refresh subject dropdown
function refreshSubjects() {
  let data = loadData();
  subjectSelect.innerHTML = "";
  for (let subject in data) {
    let option = document.createElement("option");
    option.value = subject;
    option.textContent = subject;
    subjectSelect.appendChild(option);
  }
}

// Refresh PDF list
function refreshPdfList() {
  let data = loadData();
  pdfList.innerHTML = "";
  for (let subject in data) {
    let div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `<h3>${subject}</h3>`;

    data[subject].forEach((pdf, index) => {
      let pdfDiv = document.createElement("div");
      pdfDiv.classList.add("pdf-item");
      pdfDiv.innerHTML = `
        <span>${index+1}. ${pdf.title}</span>
        <div>
          <a href="${pdf.file}" target="_blank"><button>Open</button></a>
          <button onclick="deletePdf('${subject}', ${index})">Delete</button>
        </div>
      `;
      div.appendChild(pdfDiv);
    });

    pdfList.appendChild(div);
  }
}

// Add subject
subjectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = loadData();
  let subject = document.getElementById("subjectName").value.trim();

  if (subject && !data[subject]) {
    data[subject] = [];
    saveData(data);
    refreshSubjects();
    refreshPdfList();
  }
  subjectForm.reset();
});

// Add PDF
pdfForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = loadData();
  let subject = subjectSelect.value;
  let title = document.getElementById("pdfTitle").value;
  let link = document.getElementById("pdfLink").value.trim();

  if (subject && title && link) {
    data[subject].push({ title: title, file: link });
    saveData(data);
    refreshPdfList();
  }
  pdfForm.reset();
});

// Delete PDF
function deletePdf(subject, index) {
  let data = loadData();
  data[subject].splice(index, 1);
  saveData(data);
  refreshPdfList();
}

window.onload = () => {
  refreshSubjects();
  refreshPdfList();
};
