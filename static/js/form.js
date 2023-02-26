let password = document.getElementById('password').value;
let repeatedPassword = document.getElementById('password2').value;
repeatedPassword.addEventListener("input", checkValues);

function checkValues(){
    while (repeatedPassword != password){ alert("Both passwords are different. Try again.")}
}