class Credentials {

    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

}

let submit = document.getElementById("submit");
let username = document.getElementById("username_input");
let password = document.getElementById("password_input");

submit.addEventListener("click", performSubmission);

document.addEventListener("keyup", function(event) {
    if ((isEmpty(username) || isEmpty(password)) && event.keyCode === 13) {
        alert("One of the fields is empty!");
    } else if(event.keyCode === 13){
        credentials = JSON.stringify(new Credentials(username.value, password.value));
        authenticate(credentials);
    }
});

function performSubmission() {
    if(isEmpty(username) || isEmpty(password)) {
        alert("One of the fields is empty!");
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
        else if (xhr.status !== 200){
            alert("Incorrect credentials!");
        }
    };
    xhr.send(credentials);
}

