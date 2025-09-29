function loadData() {
  let data = JSON.parse(localStorage.getItem("m2_data")) || {};
  return data;
}

const container = document.getElementById("subjects-container");
if (container) {
  const subjects = loadData();

  container.innerHTML = "";
  for (let subject in subjects) {
    let div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `<h3>${subject}</h3>`;
    
    subjects[subject].forEach((pdf, index) => {
      div.innerHTML += `
        <div class="pdf-item">
          <span>${index+1}. ${pdf.title}</span>
          <div>
            <a href="${pdf.file}" target="_blank"><button>View</button></a>
            <a href="${pdf.file}" download><button>Download</button></a>
          </div>
        </div>
      `;
    });

    container.appendChild(div);
  }
}
