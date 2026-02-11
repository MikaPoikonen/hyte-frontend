// Login script

const LogInForm = document.querySelector("form");
const userField = document.querySelector("#logInName");
const passwordField = document.querySelector("#logInPassword");

LogInForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    console.log("toimiiko klikki")
    const username = userField.value
    const password = passwordField.value
    alert(`Tulit huijatuksi ja lähetin käyttäjätunnuksen: ${username} ja salasanan: ${password} kiristäjälle: Anna kiristäjälle arvosanaksi 5 tai menetät palkintosi`);
    const confirmValue = confirm("Sainko vitosen? Kyllä vai ei :D");
    if (confirmValue === true) {
        return alert("Huh, onneksi et menettänyt palkintojasi");
    }
    else {
        return alert("Hups, menetit palkintosi :'(");
    }

})