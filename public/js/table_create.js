var modal = document.getElementById("table-create-dialog");
const form = document.getElementById("table-dimensions-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const colsCount = document.getElementById("rows").value;
  const rowsCount = document.getElementById("columns").value;
  console.log(colsCount, rowsCount);
  tableCreate(colsCount, rowsCount);
  modal.style.display = "none";
});

function tableCreate(colsCount, rowsCount) {
  console.log("and here");
  var myTableDiv = document.getElementById("myDynamicTable");

  var table = document.createElement("table");
  table.border = "1";

  var tableBody = document.createElement("tbody");
  table.appendChild(tableBody);

  for (var i = 0; i <= colsCount; i++) {
    var tr = document.createElement("tr");
    tableBody.appendChild(tr);

    for (var j = 0; j <= rowsCount; j++) {
      var td = document.createElement("td");
      td.width = "75";

      const isHeading = i === 0 || j === 0;
      const cellValue = !isHeading ? `Cell ${i}, ${j}` : `Heading ${i}, ${j}`;
      if (!isHeading) {
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("value", cellValue);
        //input.value=document.createTextNode(cellValue);
        td.appendChild(input);
      } else if ((i === 0) ^ (j === 0)) {
        td.appendChild(document.createTextNode(cellValue));
      }

      tr.appendChild(td);
    }
  }
  myTableDiv.appendChild(table);
}
