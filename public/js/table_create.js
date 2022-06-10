var modal = document.getElementById("table-create-dialog");
const form = document.getElementById("table-dimensions-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const colsCount = document.getElementById("rows").value;
  const rowsCount = document.getElementById("columns").value;
  tableCreate(colsCount, rowsCount);
  modal.style.display = "none";
});

function tableCreate(colsCount, rowsCount) {
  var myTableDiv = document.getElementById("dynamic_table");

  var table = document.createElement("table");
  table.border = "1";

  var tableBody = document.createElement("tbody");
  table.appendChild(tableBody);

  for (var i = 0; i <= colsCount; i++) {
    var tr = document.createElement("tr");
    tableBody.appendChild(tr);

    for (var j = 0; j <= rowsCount; j++) {
      const isHeading = i === 0 || j === 0;
      const cellValue = !isHeading ? `Cell ${i}, ${j}` : `Heading ${i}, ${j}`;
 
      if (!isHeading) {
        var td = document.createElement("td");
        td.width = "75";
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("value", cellValue);
        td.appendChild(input);
        tr.appendChild(td);
      } else  {
        var th = document.createElement("th");
        th.width = "75";
        th.appendChild(document.createTextNode(cellValue));
        tr.appendChild(th);
      }

      
    }
  }
  myTableDiv.appendChild(table);
}
