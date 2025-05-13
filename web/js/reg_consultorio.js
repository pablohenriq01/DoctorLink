const nameDoctor = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const specialty = document.getElementById("specialty");
const startTime = document.getElementById("start-time");
const endTime = document.getElementById("end-time");
const registerButton = document.querySelector(".btn-register");

const postValidationRegister = async () => { 
    try {
        const response = await fetch("http://localhost:8080/doctor/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: nameDoctor.value,
                email: email.value,
                password: password.value,
                specialty: specialty.value,
                startTime: startTime.value,
                endTime: endTime.value
            })
        })

        if (response.status === 202) {
            const data = await response.json();
            alert("Doutor registrado com sucesso");

        } else {
            alert("Erro ao registrar o médico");
        }
    } catch (error) {
        alert("Erro na requisição");
    }
}

registerButton.addEventListener("click", async (event) => {
    event.preventDefault();
    await postValidationRegister();
})

