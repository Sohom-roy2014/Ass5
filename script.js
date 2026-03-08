function login(){

let username = document.getElementById("username").value;
let password = document.getElementById("password").value;

if(username === "admin" && password === "admin123"){

localStorage.setItem("login","true");
window.location.href="dashboard.html";

}
else{

document.getElementById("error").style.display="block";

}

}
