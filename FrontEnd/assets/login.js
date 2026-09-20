// Récupération des données du formulaire de connexion.
const form = document.querySelector("form");

form.addEventListener("submit", async(event) => {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

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
    console.log(reponse);
    console.log(reponse.status);
    console.log(reponse.data)


})
