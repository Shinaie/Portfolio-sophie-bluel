//****************************  Variables globales pour les données des travaux et d es catégories **********************//

let worksData = [];
let categoriesData = [];

//****************************  Fonction pour récupérer les données des travaux de l'API **********************//

const fetchWorks = async () => {
  await fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
      worksData = data;
      worksDisplay(worksData);
    });
};
fetchWorks();

//****************************  Fonction pour afficher les travaux dans la galerie **********************//

const worksDisplay = (worksData) => {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = worksData
    .map(
      (work) =>
        `<figure>
           <img src="${work.imageUrl}" alt="photo de ${work.title}">
           <figcaption>${work.title}</figcaption>
         </figure>`
    )
    .join(""); // J'enlève les virgules
};

//****************************  Fonction pour récupérer les données des catégories depuis l'API **********************//

const fetchCategories = async () => {
  await fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((data) => {
      buttons(data);
      categoriesData = data;
    });
};
fetchCategories();

//****************************  Fonction pour créer des boutons de filtre en fonction des catégories **********************//

const buttons = (categoriesData) => {
  const containerFilter = document.getElementById("container-filter");

  //****************************  Bouton "Tous" pour afficher tous les travaux **********************//

  const buttonAll = document.createElement("button");
  buttonAll.className = "btn";
  buttonAll.dataset.id = "0";
  buttonAll.textContent = "Tous";
  buttonAll.addEventListener("click", () => {
    filterWorks("Tous");
  });
  containerFilter.appendChild(buttonAll);

  //****************************  Création des boutons pour chaque catégorie **********************//

  categoriesData.forEach((category) => {
    const bouton = document.createElement("button");
    bouton.classList.add("btn");
    bouton.textContent = category.name;
    bouton.addEventListener("click", () => {
      filterWorks(category.name);
    });
    containerFilter.appendChild(bouton);
  });
};

//****************************  Fonction pour filtrer les travaux en fonction de la catégorie sélectionnée **********************//

const filterWorks = (categoryName) => {
  const worksFiltre =
    categoryName === "Tous"
      ? worksData
      : worksData.filter(
          (work) => work.category && categoryName === work.category.name
        );
  console.log(worksFiltre);
  worksDisplay(worksFiltre);
};

//****************************  Mode administrateur **********************//

const tokenAdmin = localStorage.getItem("token");
const administrator = document.querySelector(".js__modal");
const loginButton = document.getElementById("loginButton");
const blackBar = document.querySelector(".blackBar");

//****************************  Vérification de l'état de connexion et gestion du mode administrateur **********************//

const stateLoginButton = function () {
  if (tokenAdmin) {
    // l'utilisateur est connecté en mode administrateur
    loginButton.textContent = "logout";
    administrator.style.display = null;
    blackBar.style.display = null;
    loginButton.addEventListener("click", () => {
      localStorage.removeItem("token");
      alert("Vous avez été déconnecté.");
      stateLoginButton();
    });
  } else {
    loginButton.textContent = "login";
    administrator.style.display = "none";
  }
};
stateLoginButton();
