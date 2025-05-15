const namePacient = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const datebirth = document.getElementById("dateBirth");
const tell = document.getElementById("telephone");
const buttonRegister = document.querySelector(".btn-register");

const postRegisterPatient = async () => {
    try {
        const response = await fetch("http://localhost:8080/patient/register", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: namePacient.value,
                email: email.value,
                password: password.value,
                dateBirth: datebirth.value,
                telephone: tell.value
            })
        })

        console.log(datebirth.value)
        const data = await response.text();
        
        if (response.status === 202) {
            alert(data);
            window.location.href = "/web/pages/login-page.html";
        } else {
            console.log(response.status)
            alert(data);
        }
        
    } catch (error) {
        alert("Erro de requisição")
    }
}

buttonRegister.addEventListener("click", async (event) => {
    event.preventDefault();
    await postRegisterPatient();
})