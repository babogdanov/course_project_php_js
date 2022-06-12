// Get the modal
var dialog = document.getElementById("table-create-dialog");

// Get the button that opens the modal
var btn = document.getElementById("dialog-toggle-button");

// Get the <span> element that closes the modal
var span = document.getElementById("dialog-close-icon");

// When the user clicks on the button, open the modal
btn.onclick = function () {
  dialog.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  dialog.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == dialog) {
    dialog.style.display = "none";
  }
};
