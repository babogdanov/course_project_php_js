"use strict";
const EMAIL_ID = "email";
const EMAIL_SECTION_ID = "email-section";
const EMAIL_ERROR_LABEL = "labelForEmail";
const EMAIL_ERROR_MESSAGE = "Email is invalid!";
const PASSWORD_ID = "password";
const PASSWORD_SECTION_ID = "password-section";
const PASSWORD_ERROR_LABEL = "labelForPassword";
const PASSWORD_ERROR_MESSAGE =
  "Password is invalid! It should consist of at least 6 small letters and/or numbers.";
const CONFIRM_PASSWORD_ID = "confirm-password";
const CONFIRM_PASSWORD_SECTION_ID = "confirm-password-section";
const CONFIRM_PASSWORD_ERROR_LABEL = "labelForConfirmPassword";
const CONFIRM_PASSWORD_ERROR_MESSAGE = "Passwords must match!";

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

function validateAndShowErrorMessageIfNeeded() {
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isPasswordConfirmed = validateConfirmPassword();
  if (isEmailValid && isPasswordValid && isPasswordConfirmed) {
    const data = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    fetch("../../src/register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data["status"] == 201) {
            tempAlert("Успешна регистрация! Пренасочване към вход.", 4000);
            setTimeout(function(){
                location.href = "login-page.html";
            },4000);
        } else if (data["status"] == 400) {
            console.log(data["message"]);
            tempAlert("Подадените данни не са валидни!", 4000);
        } else {
            console.log(data["message"]);
            tempAlert("Нещо много се обърка!", 4000);
        }
      });
  }
}

function validateEmail() {
  const emailAddressPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const emailAddress = document.getElementById(EMAIL_ID).value;
  if (!emailAddressPattern.test(emailAddress)) {
    addLabelForWrongInput(
      EMAIL_ERROR_LABEL,
      EMAIL_ERROR_MESSAGE,
      EMAIL_ID,
      EMAIL_SECTION_ID
    );
    return false;
  } else {
    removeLabelForWrongInput(EMAIL_ERROR_LABEL, EMAIL_ID);
    return true;
  }
}

function validatePassword() {
  const passwordPattern = /^[a-z0-9]+$/i;
  const password = document.getElementById(PASSWORD_ID).value;
  if (password?.length < 6 || !passwordPattern.test(password)) {
    addLabelForWrongInput(
      PASSWORD_ERROR_LABEL,
      PASSWORD_ERROR_MESSAGE,
      PASSWORD_ID,
      PASSWORD_SECTION_ID
    );
    return false;
  } else {
    removeLabelForWrongInput(PASSWORD_ERROR_LABEL, PASSWORD_ID);
    return true;
  }
}

function validateConfirmPassword() {
  const passwordPattern = /^[a-z0-9]{6,}$/i;
  const password = document.getElementById(PASSWORD_ID).value;
  const confirmPassword = document.getElementById(CONFIRM_PASSWORD_ID).value;
  if (!passwordPattern.test(password) || password !== confirmPassword) {
    addLabelForWrongInput(
      CONFIRM_PASSWORD_ERROR_LABEL,
      CONFIRM_PASSWORD_ERROR_MESSAGE,
      CONFIRM_PASSWORD_ID,
      CONFIRM_PASSWORD_SECTION_ID
    );
    return false;
  } else {
    removeLabelForWrongInput(CONFIRM_PASSWORD_ERROR_LABEL, CONFIRM_PASSWORD_ID);
    return true;
  }
}

function addLabelForWrongInput(labelsId, labelsText, inputId, sectionId) {
  const labelTag = "Label";
  const invalidFieldClassName = "invalidField";
  if (document.getElementById(labelsId)) {
    return;
  }
  const labelForError = document.createElement(labelTag);
  labelForError.innerText = labelsText;
  labelForError.className = "invalidLabel";
  labelForError.id = labelsId;
  document.getElementById(sectionId).appendChild(labelForError);
  document.getElementById(inputId).className = invalidFieldClassName;
}

function removeLabelForWrongInput(labelsId, inputsId) {
  let labelForUsername = document.getElementById(labelsId);
  if (labelForUsername) {
    labelForUsername.remove();
  }
  document.getElementById(inputsId).className = "";
}
