// Récupération des données du formulaire de connexion.
const form = document.querySelector("form");

form.addEventListener("submit", async(event) => {
    event.preventDefault();

    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const errorMessage = document.querySelector("#error-message");

    const email = emailInput.value;
    const password = passwordInput.value;   

    emailInput.addEventListener("click", () => {      
        errorMessage.textContent = "";      
        emailInput.value = "";
        passwordInput.value = "";
       
    });

    passwordInput.addEventListener("click", () => {    
        errorMessage.textContent = "";
        emailInput.value = "";
        passwordInput.value = "";
    });

    
         // Vérification que les champs sont bien remplis.
        if (!email || !password) {
            alert("Veuillez remplir tous les champs.");
            return;
        }
    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    // Vérification que l'utilisateur n'a pas fait d'erreur en se connectant
    const data = await reponse.json();  
    if (reponse.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
    } else {
        errorMessage.textContent = "Erreur dans l'identifiant ou le mot de passe.";
  
    }
 
})
