import {dataHandler} from "./data/dataHandler.js";

let password = document.getElementById('password').value;
let repeatedPassword = document.getElementById('password2').value;
repeatedPassword.addEventListener("input", checkPasswordValues);

function checkPasswordValues(password, password2){
    while (password2 != password){ alert("Both passwords are different. Try again.")}
}

checkPasswordValues(password, repeatedPassword);