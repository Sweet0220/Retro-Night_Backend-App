let submit = document.getElementById("submit");
let username = document.getElementById("username_input");
let password = document.getElementById("password_input");

submit.addEventListener("click", performSubmission);

document.addEventListener("keyup", function(event) {
    if((isEmpty(username) || isEmpty(password)) && event.keyCode === 13) {
        alert("One of the fields is empty!");
    }
    else {
        console.log("meye");
    }
});

function performSubmission() {
    if(isEmpty(username) || isEmpty(password)) {
        alert("One of the fields is empty!");
    }
    else {
        console.log("meye");
    }
}

function isEmpty(form) {
    return form.value == "";
}

