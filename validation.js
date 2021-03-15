
// Validation of username and password.
function checkUser() {
    let counter = 0;
    let userName = document.getElementById("uname").value;
    let pass = document.getElementById("pass").value;
    debugger;
    if (userName != 'ABCD') {
        document.getElementById("uname").value = '';
        document.getElementById("uname").placeholder = "Invalid";

    }
    else {
        document.getElementById("uname").value = '';
        document.getElementById("uname").placeholder = "Valid";
        counter++;
    }

    if (pass != '1234') {
        document.getElementById("pass").placeholder = "Invalid";
        document.getElementById("pass").value = '';

    }
    else {
        document.getElementById("pass").placeholder = "Valid";
        document.getElementById("pass").value = '';
        counter++;
    }
    if (counter === 2) {
        document.getElementById("uname").placeholder = '';
        document.getElementById("pass").placeholder = '';
        document.getElementById("btn").href = "index.html";
    }
}


