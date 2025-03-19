(() => {
  fetch("http://localhost:3000/items")
    .then((res) => res.json())
    .then((data) => {
      displayUser(data);
    });
})();
const userDisplay = document.querySelector(".table");
displayUser = (data) => {
  userDisplay.innerHTML = `
    <thead>
      <tr>
        <th>Id</th>
        <th>Nimi</th>
        <th>Puhelin</th>
      </tr>
    </thead>
  `;
  displayRow(data);
};

displayRow = (data) => {
  data.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${user.id}</td>
    <td>${user.nimi}</td>
    <td>${user.puhelin}</td>
  `;
    tbody.appendChild(row);
  });
  userDisplay.appendChild(tbody);
};
