class Credentials {

    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

}

let submit = document.getElementById("submit");
let username = document.getElementById("username_input");
let password = document.getElementById("password_input");
let warning = document.getElementById("warning");

submit.addEventListener("click", performSubmission);

document.addEventListener("keyup", function(event) {
    if ((isEmpty(username) || isEmpty(password)) && event.keyCode === 13) {
        emptyWarning();
    } else if(event.keyCode === 13){
        let credentials = JSON.stringify(new Credentials(username.value, password.value));
        authenticate(credentials);
    }
});

function performSubmission() {
    if(isEmpty(username) || isEmpty(password)) {
        emptyWarning();
    }
    else {
        let credentials = JSON.stringify(new Credentials(username.value, password.value));
        authenticate(credentials);
    }
}

function isEmpty(form) {
    return form.value === "";
}

function authenticate(credentials) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/auth", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            console.log("jwt: " + response.jwt);
        }
        else if (xhr.readyState === 4 && xhr.status !== 200){
            credentialsWarning();
        }
    };
    xhr.send(credentials);
}

function emptyWarning() {
    warning.style.display = "block";
    warning.innerText = "Fields should not be empty!";
    window.setTimeout("hideWarning();", 3000);

}

function credentialsWarning() {
    warning.style.display = "block";
    warning.innerText = "Incorrect credentials!";
    window.setTimeout("hideWarning();", 3000);
}

function hideWarning() {
    warning.textContent = '\u00a0';
}

