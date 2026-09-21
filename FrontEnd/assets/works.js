// Récupération du backend
async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");

  // On convertit la réponse en JSON
  const works = await response.json();
  return works;
}

// Récupération des catégories depuis le backend
async function getCategories() {
    const response = await fetch(
    "http://localhost:5678/api/categories"
    );

  const categories = await response.json();
  return categories 
  }



// Affichage de la galerie
async function displayWorks(works) {
  //const works = await getWorks();

  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  works.forEach(work => {
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;

    const caption = document.createElement("figcaption");
    caption.textContent = work.title;

    figure.appendChild(img);
    figure.appendChild(caption);
    gallery.appendChild(figure);
  });
}




// Affichage des filtres
  function displayFilters(categories, works) {
    console.log(works);
    const filtersContainer = document.querySelector(".filters");
    const categoriesWithAll = [
        { id: 0, name: "Tous" },
        ...categories
    ];

    categoriesWithAll.forEach(category => {
        const button = document.createElement("button");
        button.textContent = category.name;

        if (category.id === 0) {
            button.classList.add("active");
        }
        
        button.addEventListener("click", () => {

            // Retire la classe active de tous les boutons
            document.querySelectorAll(".filters button")
            .forEach(btn => btn.classList.remove("active"));

            // Ajoute la classe active au bouton cliqué
            button.classList.add("active");
            
            if (category.id === 0) {
                displayWorks(works);

            } else {
                const filteredWorks = works.filter(work =>
                    work.categoryId === category.id
                );
                console.log(filteredWorks);
                displayWorks(filteredWorks);
            }
        });

        filtersContainer.appendChild(button);
    });
}

// Affichage du mode édition
function afficherModeEdition(){
    console.log("Je suis dans la fonction afficherModeEdition")
    const banner = document.querySelector(".edit-banner");
    banner.style.display = "flex";
}

async function init() {

    const works = await getWorks();
    displayWorks(works);

    const categories = await getCategories();
    displayFilters(categories, works);

   const token = localStorage.getItem("token");

    if (token) {
        afficherModeEdition()
    }
}

init();
