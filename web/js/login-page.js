
const email = document.getElementById('email');
const password = document.getElementById('password');
const loginButton = document.querySelector('.btn-login-entry');

const getValidationLogin = async () => {
    try {
        const response = await fetch("http://localhost:8080/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email : email.value,
                password : password.value
            })
        });

        const data = await response.json();
        
        if (response.status === 200) {
            localStorage.setItem("typeUser", data.typeUser);
            localStorage.setItem("userId", data.userId);
            
            if(data.typeUser === 1) {
                window.location.href = "/web/pages/inicio-paciente.html";
            } else if(data.typeUser === 2) { 
                window.location.href = "/web/pages/inicio-consultorio.html";
            }
      
        } else {
            alert(data);
        }
    } catch (error) {
        alert("Erro na requisição");
    }
}


loginButton.addEventListener("click" , async (event) => {
    event.preventDefault();
    await getValidationLogin();
    
})