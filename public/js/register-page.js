'use strict';
const NAME_ID = "name";
const NAME_SECTION_ID = "name-section";
const NAME_ERROR_LABEL = "labelForFirstName";
const NAME_ERROR_MESSAGE = "First name is invalid!"
const LAST_NAME_ID = "last-name";
const LAST_NAME_SECTION_ID = "last-name-section";
const LAST_NAME_ERROR_LABEL = "labelForLastName";
const LAST_NAME_ERROR_MESSAGE = "Last name is invalid!";
const EMAIL_ID = "email";
const EMAIL_SECTION_ID = "email-section";
const EMAIL_ERROR_LABEL = "labelForEmail";
const EMAIL_ERROR_MESSAGE = "Email is invalid!";
const PASSWORD_ID = "password";
const PASSWORD_SECTION_ID = "password-section";
const PASSWORD_ERROR_LABEL = "labelForPassword";
const PASSWORD_ERROR_MESSAGE = "Password is invalid!";
const CONFIRM_PASSWORD_ID = "confirm-password";
const CONFIRM_PASSWORD_SECTION_ID = "confirm-password-section";
const CONFIRM_PASSWORD_ERROR_LABEL = "labelForConfirmPassword";
const CONFIRM_PASSWORD_ERROR_MESSAGE = "Passwords must match!";

function validateAndShowErrorMessageIfNeeded() {
    const isFirstNameValid = validateFirstName();
    const isLastNameValid = validateLastName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isPasswordConfirmed = validateConfirmPassword();
    if (isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid && isPasswordConfirmed) {
        const data = new FormData();
        data.append('name', document.getElementById("name").value);
        data.append('last-name', document.getElementById("last-name").value);
        data.append('email', document.getElementById("email").value);
        data.append('password', document.getElementById("password").value);
        fetch("../api/registration.php", {
            method: "POST",
            body: data
        })
            .then(function (response) {
                return response.text();
            })
            .then((body) => {
                alert("You have signed up successfully! Redirecting to sign in page...");
                location.href = '../login-page/login-page.html';
            });
    }


}

function validateFirstName() {
    const firstNameRegEx = /^[a-zA-Z'\-]{2,30}$/;
    const firstName = document.getElementById(NAME_ID).value;
    if (!firstNameRegEx.test(firstName)) {
        addLabelForWrongInput(NAME_ERROR_LABEL, NAME_ERROR_MESSAGE, NAME_ID, NAME_SECTION_ID);
        return false;
    } else {
        removeLabelForWrongInput(NAME_ERROR_LABEL, NAME_ID);
        return true;
    }
}

function validateLastName() {
    const lastNameRegEx = /^[a-zA-Z'\-]{2,30}$/;
    const lastName = document.getElementById(LAST_NAME_ID).value;
    if (!lastNameRegEx.test(lastName)) {
        addLabelForWrongInput(LAST_NAME_ERROR_LABEL, LAST_NAME_ERROR_MESSAGE, LAST_NAME_ID, LAST_NAME_SECTION_ID);
        return false;
    } else {
        removeLabelForWrongInput(LAST_NAME_ERROR_LABEL, LAST_NAME_ID);
        return true;
    }
}

function validateEmail() {
    const emailAddressPattern = /^[a-zA-Z0-9\-\_]+@[a-z\-]+.[a-z]+$/;
    const emailAddress = document.getElementById(EMAIL_ID).value;
    if (!emailAddressPattern.test(emailAddress)) {
        addLabelForWrongInput(EMAIL_ERROR_LABEL, EMAIL_ERROR_MESSAGE, EMAIL_ID, EMAIL_SECTION_ID);
        return false;
    } else {
        removeLabelForWrongInput(EMAIL_ERROR_LABEL, EMAIL_ID);
        return true;
    }
}

function validatePassword() {
    const passwordPattern = /^[a-z0-9]+$/i;
    const password = document.getElementById(PASSWORD_ID).value;
    if (password?.length < 8 || !passwordPattern.test(password)) {
        addLabelForWrongInput(PASSWORD_ERROR_LABEL, PASSWORD_ERROR_MESSAGE, PASSWORD_ID, PASSWORD_SECTION_ID);
        return false;
    } else {
        removeLabelForWrongInput(PASSWORD_ERROR_LABEL, PASSWORD_ID);
        return true;
    }
}

function validateConfirmPassword() {
    const passwordPattern = /^[a-z0-9]{8,}$/i;
    const password = document.getElementById(PASSWORD_ID).value;
    const confirmPassword = document.getElementById(CONFIRM_PASSWORD_ID).value;
    if (!passwordPattern.test(password) || password !== confirmPassword) {
        addLabelForWrongInput(CONFIRM_PASSWORD_ERROR_LABEL, CONFIRM_PASSWORD_ERROR_MESSAGE, CONFIRM_PASSWORD_ID, CONFIRM_PASSWORD_SECTION_ID);
        return false;
    } else {
        removeLabelForWrongInput(CONFIRM_PASSWORD_ERROR_LABEL, CONFIRM_PASSWORD_ID);
        return true;
    }
}

function addLabelForWrongInput(labelsId, labelsText, inputId, sectionId) {
    const labelTag = 'Label';
    const invalidFieldClassName = 'invalidField';
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
    document.getElementById(inputsId).className = '';
}
