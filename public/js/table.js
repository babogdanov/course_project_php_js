function checkIfUserIsLogged() {
  if (!localStorage.getItem("email")) {
    alert("You have to be logged in to enter the page!");
    location.href = "../html/login-page.html";
  }
}

function tempAlert(msg, duration) {
  var el = document.createElement("div");
  el.setAttribute(
    "style",
    "padding:20px;margin-bottom:15px;background-color:white;color:black;text-align:center"
  );
  el.innerHTML = msg;
  setTimeout(function () {
    el.parentNode.removeChild(el);
  }, duration);
  var nav = document.getElementById("navbar");
  nav.parentNode.insertBefore(el, nav.nextSibling);
}

checkIfUserIsLogged();

// Quick and simple export target #table_id into a csv
function downloadTableAsCsv(separator = ";") {
  const name = !!document.getElementById("table_name")
    ? document.getElementById("table_name").value
    : table;
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
  var filename = `export_${name}_${new Date().toLocaleDateString()}.csv`;
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

function tableCreate(tableValues, name) {
  var myTableDiv = document.getElementById("dynamic_table");
  //FIXME: Remove if we get to the point of joining tables.
  if (myTableDiv.style.display === "block") {
    alert("Can't create another table yet.");
    return;
  }

  const rowsCount = !!tableValues
    ? tableValues.length
    : document.getElementById("rows").value;
  const colsCount = !!tableValues
    ? tableValues[0].length
    : document.getElementById("columns").value;
  console.log(colsCount, rowsCount);
  //FIXME: not working for text
  if (
    Number.isNaN(colsCount) ||
    colsCount <= 0 ||
    Number.isNaN(rowsCount) ||
    rowsCount <= 0
  ) {
    alert("Invalid values for columns and rows.");
    return;
  }
  var table = document.createElement("table");
  var tableName = document.createElement("input");
  tableName.setAttribute("id", "table_name");
  tableName.setAttribute("type", "text");
  tableName.setAttribute("value", !!name ? name : "Enter table name");
  var tableBody = document.createElement("tbody");
  table.appendChild(tableBody);

  for (var i = 0; i < rowsCount; i++) {
    var tr = document.createElement("tr");
    tableBody.appendChild(tr);
    for (var j = 0; j < colsCount; j++) {
      const cellName = !!tableValues ? tableValues[i][j] : `${i}-${j}`;

      var td = document.createElement("td");

      const input = document.createElement("input");
      input.setAttribute("type", "text");
      input.setAttribute("name", cellName);
      input.setAttribute("value", cellName);
      td.appendChild(input);
      tr.appendChild(td);
    }
  }
  myTableDiv.prepend(table);
  myTableDiv.prepend(tableName);
  myTableDiv.style.display = "block";

  !tableValues
    ? (document.getElementById("table-create-dialog").style.display = "none")
    : {};
}

function getAllTables() {
    var list = document.getElementById("myTables");

    fetch("../../src/getAllTables.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"email":localStorage.getItem("email")}),
    })
    .then((res) => res.json())
    .then((data) => {
        if (data["status"] == 200) {
            for (var table of data["tables"]) {
                var element =  document.createElement("li");
                var link = document.createElement("a");
                link.setAttribute("href", `table-detailed.html?id=${table.id}`);
                link.innerText = table["name"];
                element.appendChild(link);
                list.appendChild(element);
            }
        } else {
            console.log(data["message"]);
            tempAlert("Something went wrong!", 4000);
        }
    });
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

  callSaveAPI(document.getElementById("table_name").value, tableData);
}

function getDetailedTable(id) {
  fetch("../../src/getTable.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data["status"] == 200) {
        let table = JSON.parse(data["table"].table);
        let name = data["table"].name;
        tableCreate(table, name);
      } else {
        console.log(data["message"]);
        tempAlert("Something went wrong!", 4000);
      }
    });
}

function updateTable(id) {
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
    id: id,
    name: document.getElementById("table_name").value,
    table: tableData,
  };

  fetch("../../src/updateTable.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data["status"] == 204) {
        tempAlert(
          "Successfuly updated table!",
          4000
        );
      } else if (data["status"] == 400) {
        console.log(data["message"]);
        tempAlert("Passed values are not correct!", 4000);
        setTimeout(() => location.href="my-tables-page.html",4000);
      } else {
        console.log(data["message"]);
        tempAlert("Something went wrong!", 4000);
        window.location.reload();
        setTimeout(() => location.href="my-tables-page.html",4000);
      }
    });
}

function uploadTable() {
    const file = document.getElementsByName('uploadedfile')[0];
    const formData = new FormData();
    formData.append('csv', file.files[0]);

    fetch("../../src/readTableFromCSV.php", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data["status"] == 200) {
              callSaveAPI("uploaded",  data["table"]);
          } else if (data["status"] == 400) {
            console.log(data["message"]);
            tempAlert("The file isn't CSV", 4000);
          } else {
            console.log(data["message"]);
            tempAlert("Something went wrong!", 4000);
          }
        });
}

function callSaveAPI(name, tableData) {
    const data = {
        name: name,
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
        .then((res) => res.json())
        .then((data) => {
          if (data["status"] == 201) {
            tempAlert(
              "Successfuly saved table! Going to my tables.",
              4000
            );
            setTimeout(function () {
              location.href = "my-tables-page.html";
            }, 4000);
          } else if (data["status"] == 400) {
            console.log(data["message"]);
            tempAlert("Passed values are not correct!", 4000);
          } else {
            console.log(data["message"]);
            tempAlert("Something went wrong!", 4000);
          }
        });
}