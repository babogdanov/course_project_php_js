function checkIfUserIsLogged() {
    if (!localStorage.getItem("email")) {
      alert("You have to be logged in to enter the page!");
      location.href = "../html/login-page.html";
    }
}

checkIfUserIsLogged();

function tempAlert(msg,duration) {
    var el = document.createElement("div");
    el.setAttribute("style","padding:20px;margin-bottom:15px;background-color:white;color:black;text-align:center");
    el.innerHTML = msg;
    setTimeout(function(){
     el.parentNode.removeChild(el);
    },duration);
    var nav = document.getElementById("navbar");
    nav.parentNode.insertBefore(el, nav.nextSibling);
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
        } else if (data["status"] == 400) {
            console.log(data["message"]);
            tempAlert("Подадените данни не са валидни!", 4000);
        } else {
            console.log(data["message"]);
            tempAlert("Нещо много се обърка!", 4000);
        }
    });
}