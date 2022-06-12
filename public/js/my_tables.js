function checkIfUserIsLogged() {
    if (!localStorage.getItem("email")) {
      alert("You have to be logged in to enter the page!");
      location.href = "../html/login-page.html";
    }
}
  
checkIfUserIsLogged();

function getAllTables() {
    var list = document.getElementById("myTables");

    fetch("../../src/getAllTables.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"email":localStorage.getItem("email")}),
    })
    .then((res) => res.text())
    .then((data) => {
        var tables = JSON.parse(data);
        for (var table of tables) {
            var element =  document.createElement("li");
            var link = document.createElement("a");
            link.setAttribute("href", "#");
            link.innerText = table["name"];
            element.appendChild(link);
            list.appendChild(element);
        }
    });
}