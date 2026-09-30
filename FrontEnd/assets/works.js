const modal = document.querySelector(".modal");
const galleryView = document.querySelector(".modal-gallery-view");
const addPhotoView = document.querySelector(".modal-add-photo");
const backButton = document.querySelector(".back-modal");
const imageInput = document.querySelector("#image");
const titleInput = document.querySelector("#title");
const categorySelect = document.querySelector("#category");
const validateButton = document.querySelector(".validate-btn");


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


// Affichage du bouton "modifer"
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

// Ouverture de la modale
function openModal() {
    modal.style.display = "flex";
    showGalleryView();
}

// Fermeture de la modale
function closeModal() {
    modal.style.display = "none";
    resetAddPhotoForm();
}

// Gestion de l'ouverture et de la fermeture de la modale
function initModal(){
    
    const openButton = document.querySelector(".edit-projects");
    const closeButton = document.querySelector(".close-modal");
   
    
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

    backButton.addEventListener("click",showGalleryView);
}

// Affichage de la gallery dans la modale avec l'icône "poubelle"
function displayModalGallery(works) {

    const modalGallery = document.querySelector(".modal-gallery");

    modalGallery.innerHTML = "";
    backButton.style.display = "none";

    works.forEach(work => {

        const figure = document.createElement("figure");
        const image = document.createElement("img");

        image.src = work.imageUrl;
        image.alt = work.title;

        const trashIcon = document.createElement("i");

        trashIcon.classList.add(
            "fa-solid",
            "fa-trash-can",
            "trash-icon"
        );

        figure.appendChild(image);
        figure.appendChild(trashIcon);
        modalGallery.appendChild(figure);

              
        // Gestion de la suppression des projets
        trashIcon.addEventListener("click", async () => {
            const token = localStorage.getItem("token");
            const reponse = await fetch(`http://localhost:5678/api/works/${work.id}`,
             {
              method: "DELETE",
              headers: {
                 Authorization:
                `Bearer ${token}`
              }
            });     
           
            if (reponse.ok) {

                const updatedWorks = await getWorks();
                displayWorks(updatedWorks);
                displayModalGallery(updatedWorks);
            }
        });       
    });

 }
 // Affichage de la gallery et masquage de l'ajout de photo dans la modale
 function showGalleryView() {
    console.log("showGalleryView");
    galleryView.style.display = "block";
    addPhotoView.style.display = "none";
    backButton.style.display = "none";
    resetAddPhotoForm();
   
}

// Affichage de l'ajout de photo dans la modale et masquage de la gallery
function showAddPhotoView() {
    galleryView.style.display = "none";
    addPhotoView.style.display = "block";
    backButton.style.display = "block";
}

// Gestion de l'affichage de l'ajout de la photo
function initAddPhotoView() {
    const addPhotoButton = document.querySelector(".add-photo");
    addPhotoButton.addEventListener("click", showAddPhotoView);

    
}
// Récupération d'une photo
function initUploadImage() {

    const uploadButton = document.querySelector(".upload-btn");
    
    uploadButton.addEventListener("click", () => {
        imageInput.click();
    });

    imageInput.addEventListener("change", () => {
        const file = imageInput.files[0];
        const previewImage = document.querySelector(".preview-image");
        const imageIcon = document.querySelector(".upload-area i");
        const uploadText = document.querySelector(".upload-area p");


        previewImage.src = URL.createObjectURL(file);
        previewImage.style.display = "block";

        imageIcon.style.display = "none";
        uploadButton.style.display = "none";
        uploadText.style.display = "none";
    });
}

// Affichage des catégories pour la liste
function displayCategories(categories) {

    categorySelect.innerHTML = "";

    const emptyOption = document.createElement("option");

    emptyOption.value = "";
    emptyOption.textContent = "";

    categorySelect.appendChild(emptyOption);

    categories.forEach(category => {

        const option = document.createElement("option");

        option.value = category.id;
        option.textContent = category.name;

        categorySelect.appendChild(option);
    });
}

// Vérification de la validité du formulaire
function checkFormValidity() {

    const hasImage = imageInput.files.length > 0;
    const hasTitle = titleInput.value.trim() !== "";    
    const hasCategory = categorySelect.value !== "";
   
    if (hasImage && hasTitle && hasCategory) {
        validateButton.style.backgroundColor = "#1D6154";

    } else {
        validateButton.style.backgroundColor = "#A7A7A7";
    }
}
// Appel de la vérification à chaque changement
function initFormValidation() {
  
    imageInput.addEventListener("change", checkFormValidity);
    titleInput.addEventListener("input", checkFormValidity);
    categorySelect.addEventListener("change",checkFormValidity);
}

// Remise du formulaire d'ajout à l'état initial
function resetAddPhotoForm() {

    imageInput.value = "";
    titleInput.value = "";
    categorySelect.value = "";

    const previewImage = document.querySelector(".preview-image");
    const imageIcon = document.querySelector(".upload-area i");
    const uploadButton = document.querySelector(".upload-btn");
    const uploadText = document.querySelector(".upload-area p");

    previewImage.style.display = "none";
    imageIcon.style.display = "block";
    uploadButton.style.display = "block";
    uploadText.style.display = "block";

    validateButton.style.backgroundColor = "#A7A7A7";
}

// Création du formData
function createFormData() {

    const formData = new FormData();

    formData.append("image", imageInput.files[0]);
    formData.append("title", titleInput.value);
    formData.append("category", categorySelect.value);
   
    return formData;
}

// Appel de la fonction formData si validation du formulaire
function initAddWork() {

    validateButton.addEventListener("click", addWork);        

}

// Gestion de l'ajout d'un projet dans l'API
async function addWork() {

    const token = localStorage.getItem("token");

    const formData = createFormData();

    const response = await fetch("http://localhost:5678/api/works",{
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        });

    console.log(response.status);

    if (response.ok) {
        const updatedWorks = await getWorks();

        displayWorks(updatedWorks);
        displayModalGallery(updatedWorks);

        resetAddPhotoForm();

        showGalleryView();
    }
}

// Gestion du mode édition
function initConnectedMode(){
    displayBanner()
    displayEditButton()
    updateAuthLink()
    initModal()    
    initAddPhotoView()
    initUploadImage()
    initFormValidation()
    initAddWork()
}

async function init() {

    const works = await getWorks();
    displayWorks(works);
    displayModalGallery(works);

    const categories = await getCategories();
    displayFilters(categories, works);
    displayCategories(categories);
    

   const token = localStorage.getItem("token");

    if (token) {
        initConnectedMode()
    }
}

init();
