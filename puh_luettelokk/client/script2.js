// Ladataan taulukko heti sivun avauksen jälkeen
document.addEventListener("DOMContentLoaded", loadPage);

//Viitataan taulukkoon, johon tiedot lisätään ja lomakkeeseen, johon käyttäjä syöttää tiedot
const userDisplay = document.querySelector(".table");
const exampleForm = document.getElementById("puhelintieto_lomake");

//Luodaan muuttuja, johon muokattavan henkilön id tallennetaan
let editingId = null;

//Haetaan tiedot json-serveriltä ja päivitetään taulukko
function loadPage() {
  fetch("http://localhost:3000/items")
    .then((res) => res.json())
    .then((data) => {
      displayUser(data);
    });
}

//Luodaan taulukko.
//Poistetaan vanhat tiedot (userDisplay.innerHTML)
//Lisätään otsikot
//Kutsutaan displayRow(), joka lisää tiedot riveille
function displayUser(data) {
  userDisplay.innerHTML = `
    <thead>
      <tr>
        <th>Id</th>
        <th>Nimi</th>
        <th>Puhelin</th>
        <th>Poista</th>
        <th>Muokkaa</th>
      </tr>
    </thead>
  `;
  displayRow(data);
}

//Lisätään tiedot taulukkoon käymällä jokainen käyttäjä läpi.
//Luodaan uusi rivi (tr)
//Päivitetään taulukko
function displayRow(data) {
  const tbody = document.createElement("tbody");
  data.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.nimi}</td>
      <td>${user.puhelin}</td>
      <td><button class="btn btn-danger" onClick="removeRow(${user.id})">x</button></td>
      <td><button class="btn btn-warning" onClick="updateRow(${user.id}, '${user.nimi}', '${user.puhelin}')">Muokkaa</button></td>
    `;
    tbody.appendChild(row);
  });
  userDisplay.appendChild(tbody);
}

//Täytetää lomake muokattavan henkilön tiedoilla.
//Piilotetaan Luo uusi puhelintieto -painike ja näytetään Tallenna tiedot -painike
function updateRow(id, nimi, puhelin) {
  document.getElementById("nimi").value = nimi;
  document.getElementById("puhelin").value = puhelin;
  editingId = id;

  document.getElementById("saveChangesBtn").style.display = "block";
  document.getElementById("submitBtn").style.display = "none";
}

//Tallennetaan muokattu tieto json-serverille json muodossa.
//Ladataan sivu uudelleen.
async function saveEdit() {
  if (editingId === null) return;

  const updatedData = {
    nimi: document.getElementById("nimi").value,
    puhelin: document.getElementById("puhelin").value,
  };

  await fetch(`http://localhost:3000/items/${editingId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });

  editingId = null;
  document.getElementById("puhelintieto_lomake").reset();
  document.getElementById("saveChangesBtn").style.display = "none";
  document.getElementById("submitBtn").style.display = "block";
  loadPage();
}

//Poistetaan rivi (DELETE) json-serveristä ja ladataan sivu uudelleen.
async function removeRow(id) {
  await fetch(`http://localhost:3000/items/${id}`, { method: "DELETE" });
  loadPage();
}

//Lähetetään lomake (tiedon lisääminen ja muokkaaminen).
//Jos editingId ei ole tyhjä kutsutaan saveEdit() metodia.
//Jos lisätään uusi tieto, luodaan newEntry ja lähetetään tiedot json-serverille (POST).
//Ladataan sivu uudelleen.
exampleForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (editingId !== null) {
    saveEdit();
  } else {
    const newEntry = {
      nimi: document.getElementById("nimi").value,
      puhelin: document.getElementById("puhelin").value,
    };

    await fetch("http://localhost:3000/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEntry),
    });

    document.getElementById("puhelintieto_lomake").reset();
    loadPage();
  }
});
