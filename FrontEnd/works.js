// Récupération du backend
async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");

  // On convertit la réponse en JSON
  const works = await response.json();

  return works;
}

getWorks();

// Affichage de la galerie
async function displayWorks() {
  const works = await getWorks();

  const gallery = document.querySelector(".gallery");

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

displayWorks();
