
const username = document.getElementById('username').value;
const password = document.getElementById('password').value;
const loginButton = document.querySelector('.btn-login-entry');

const getValidationLogin = async () => {
    try {
        const response = await fetch("http://localhost:8080/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        if (response.ok) {
            const data = await response.json();
            if (data.status === "success") {
                window.location.href = "/inicio.html";
            } else {
                alert("Usuario ou senha incorretos");
            }
        }
    } catch (error) {
        alert("Erro na requisição");
    }
}


loginButton.addEventListener("click" , async (event) => {
    event.preventDefault();
    await getValidationLogin();
    
})