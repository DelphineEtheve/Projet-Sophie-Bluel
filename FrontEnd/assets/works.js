const modal = document.querySelector(".modal");

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
                displayWorks(filteredWorks);
            }
        });

        filtersContainer.appendChild(button);
    });
}
 // Affichage du bandeau noir du mode connecté
function displayBanner(){
     
    const banner = document.querySelector(".edit-banner");
    banner.style.display = "flex";
}

function displayEditButton(){
    const editProject = document.querySelector(".edit-projects")
    editProject.style.display = "flex";
}

// Affichage et gestion du logout
function updateAuthLink(){
     const authLink = document.querySelector("#auth-link");
    authLink.textContent = "logout"

    authLink.addEventListener("click", (event) => {
        if (authLink.textContent === "logout") {
        event.preventDefault();
        localStorage.removeItem("token");
        window.location.href = "index.html";
         }
    });
}

function openModal() {
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
}

function initModal(){
    
    const openButton =
    document.querySelector(".edit-projects");

    const closeButton =
        document.querySelector(".close-modal");

    openButton.addEventListener("click", openModal);

    closeButton.addEventListener("click", closeModal);
    modal.addEventListener("click", (event) => {
        if (event.target === modal) { 
            closeModal();
        }
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.style.display === "flex") {
        closeModal();
    }

});
}

function displayModalGallery(works) {

    const modalGallery =
        document.querySelector(".modal-gallery");

    modalGallery.innerHTML = "";

    works.forEach(work => {

        const figure =
            document.createElement("figure");

        const image =
            document.createElement("img");

        image.src = work.imageUrl;
        image.alt = work.title;

        figure.appendChild(image);

        modalGallery.appendChild(figure);

    });

}


// Gestion du mode édition
function initConnectedMode(){
    displayBanner()
    displayEditButton()
    updateAuthLink()
    initModal()    
   
}

async function init() {

    const works = await getWorks();
    displayWorks(works);
    displayModalGallery(works);

    const categories = await getCategories();
    displayFilters(categories, works);

   const token = localStorage.getItem("token");

    if (token) {
        initConnectedMode()
    }
}

init();
