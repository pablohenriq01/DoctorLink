
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

        const data = await response.text();
        
        if (response.status === 202) {
            
      
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