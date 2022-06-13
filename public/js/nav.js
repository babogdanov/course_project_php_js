fetch("../html/nav.html")
  .then((res) => res.text())
  .then((text) => {
    let oldelem = document.querySelector("script#replace_with_navbar");
    let newelem = document.createElement("div");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem, oldelem);
    changeNav();
  });

function changeNav() {
  var nav = document.getElementById("navbar");
  if (!localStorage.getItem("email")) {
    var signUpLink = document.createElement("a");
    signUpLink.setAttribute("href", "register-page.html");
    signUpLink.innerText = "Sign up";
    nav.appendChild(signUpLink);

    var logInLink = document.createElement("a");
    logInLink.setAttribute("href", "login-page.html");
    logInLink.innerText = "Log in";
    nav.appendChild(logInLink);
  } else {
    var logOutLink = document.createElement("a");
    logOutLink.setAttribute("href", "index.html");
    logOutLink.setAttribute("onclick", "logOut()");
    logOutLink.innerHTML = "Log out";
    nav.appendChild(logOutLink);
    var createLink = document.createElement("a");
    createLink.setAttribute("href", "table-create.html");
    createLink.innerHTML = "Create table";
    nav.appendChild(createLink);
    var detailedViewLink = document.createElement("a");
    detailedViewLink.setAttribute("href", "my-tables-page.html");
    detailedViewLink.innerHTML = "Tables list";
    nav.appendChild(detailedViewLink);
    var uploadLink = document.createElement("a");
    uploadLink.setAttribute("href", "upload-table.html");
    uploadLink.innerHTML = "Upload table";
    nav.appendChild(uploadLink);
  }
}

function logOut() {
  localStorage.setItem("email", "");
}