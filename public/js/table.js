function checkIfUserIsLogged() {
  if (!localStorage.getItem("email")) {
    alert("You have to be logged in to enter the page!");
    location.href = "../html/login-page.html";
  }
}

checkIfUserIsLogged();

// Quick and simple export target #table_id into a csv
function download_table_as_csv(separator = ",") {
  // Select rows from table_id
  var rows = document.querySelectorAll("#dynamic_table table tbody tr");

  // Construct csv
  var csv = [];
  for (var i = 0; i < rows.length; i++) {
    var row = [],
      cols = rows[i].querySelectorAll("td");
    for (var j = 0; j < cols.length; j++) {
      var data = cols[j].firstChild.value;
      // Clean innertext to remove multiple spaces and jumpline (break csv)
      data = data.replace(/(\r\n|\n|\r)/gm, "").replace(/(\s\s)/gm, " ");
      // Escape double-quote with double-double-quote (see https://stackoverflow.com/questions/17808511/properly-escape-a-double-quote-in-csv)
      data = data.replace(/"/g, '""');
      // Push escaped string
      row.push('"' + data + '"');
    }
    csv.push(row.join(separator));
  }
  var csv_string = csv.join("\n");
  // Download it
  var filename =
    "export_table" + "_" + new Date().toLocaleDateString() + ".csv";
  var link = document.createElement("a");
  link.style.display = "none";
  link.setAttribute("target", "_blank");
  link.setAttribute(
    "href",
    "data:text/csv;charset=utf-8," + encodeURIComponent(csv_string)
  );
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function tableCreate() {
  
  var myTableDiv = document.getElementById("dynamic_table");
  //FIXME: Remove if we get to the point of joining tables.
  if (myTableDiv.style.display === "block") {
    alert("Can't create another table yet.");
    return;
  }
  const colsCount = document.getElementById("rows").value;
  const rowsCount = document.getElementById("columns").value;
  console.log(colsCount,rowsCount)
  //FIXME: not working for text
  if(Number.isNaN(colsCount) || colsCount <= 0 || Number.isNaN(rowsCount) || rowsCount <= 0){
    alert("Invalid values for columns and rows.");
    return;
  }
  var table = document.createElement("table");
  var tableName = document.createElement("input");
  tableName.setAttribute("id", "table_name");
  tableName.setAttribute("type", "text");
  tableName.setAttribute("value", "Enter table name");
  myTableDiv.appendChild(tableName);
  var tableBody = document.createElement("tbody");
  table.appendChild(tableBody);

  for (var i = 0; i < colsCount; i++) {
    var tr = document.createElement("tr");
    tableBody.appendChild(tr);
    for (var j = 0; j < rowsCount; j++) {
      const cellName = `${i}-${j}`;

      var td = document.createElement("td");

      const input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("name", cellName);
      input.setAttribute("value", cellName);
      td.appendChild(input);
      tr.appendChild(td);
    }
  }
  myTableDiv.appendChild(table);
  myTableDiv.style.display = "block";
  document.getElementById("table-create-dialog").style.display = "none";
}

function saveTable() {
  var rows = document.querySelectorAll("#dynamic_table table tbody tr");
  var tableData = [];
  for (var i = 0; i < rows.length; i++) {
    var currRow = [];
    var cols = rows[i].querySelectorAll("td");
    for (var j = 0; j < cols.length; j++) {
      currRow.push(cols[j].firstChild.value);
    }
    tableData.push(currRow);
  }

  const data = {
    name: document.getElementById("table_name").value,
    creator: localStorage.getItem("email"),
    rows: tableData.length,
    columns: tableData[0].length,
    table: tableData,
  };

  fetch("../../src/saveTable.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  .then((res) => res.text())
  .then((data) => {
    location.href = "../html/my-tables-page.html";
  });
}