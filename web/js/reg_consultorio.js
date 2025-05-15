const nameConsultancy = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const specialty = document.getElementById("specialty");
const startTime = document.getElementById("start-time");
const endTime = document.getElementById("end-time");
const registerButton = document.querySelector(".btn-register");

const postRegisterConsultancy = async () => {
    try {
        const response = await fetch("http://localhost:8080/doctor/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nameConsultancy: nameConsultancy.value,
                email: email.value,
                password: password.value,
                specialty: specialty.value,
                startTime: startTime.value,
                endTime: endTime.value
            })
        })
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

registerButton.addEventListener("click", async (event) => {
    event.preventDefault();
    await postRegisterConsultancy();
})

