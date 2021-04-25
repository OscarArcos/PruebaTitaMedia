var card = document.getElementsByClassName("portfolio__container")[0];
var menu = document.getElementsByClassName("menu__navegacion-lista")[0];
const init = () => {
  goToPortfolio("All");
};

const buildCard = (card) => {
  const container = document.querySelector(".portfolio__container");
  const divPCard = document.createElement("div");
  const divSCard = document.createElement("div");
  const h2Card = document.createElement("h2");
  const pCard = document.createElement("p");
  const imgCard = document.createElement("img");

  container.append(divPCard);
  divPCard.append(imgCard);
  divPCard.append(divSCard);
  divSCard.append(h2Card);
  divSCard.append(pCard);

  divPCard.setAttribute("class", "portfolio__card");
  divSCard.setAttribute("class", "portfolio__card-info");
  imgCard.setAttribute("src", card.image);
  imgCard.setAttribute("class", "portfolio__card-image");
  pCard.innerHTML = card.description;
  pCard.setAttribute("class", "portfolio__card-description");
  h2Card.innerHTML = card.title;
  h2Card.setAttribute("class", "portfolio__card-title");
};

const changeView = (viewType) => {
  var totalCards = card.children;
  if (viewType === "realsize") {
    for (var valor of totalCards) {
      valor.classList.add("portfolio__cardRealSize");
    }
  } else {
    for (var valor of totalCards) {
      valor.classList.remove("portfolio__cardRealSize");
    }
  }
};

const buttonSelector = (data) => {
  var cardHidden = document.getElementsByClassName("portfolio__container")[0]
    .children;
  if (data.length > 9) {
    for (let i = 9; i < data.length; i++) {
      cardHidden[i].style.display = "none";
    }
    document.getElementById("showMore").style.display = "block";
    document.getElementById("showLess").style.display = "none";

    document.getElementById("showMore").addEventListener(
      "click",
      function (event) {
        for (let i = 9; i < data.length; i++) {
          cardHidden[i].style.display = "flex";
        }
        document.getElementById("showMore").style.display = "none";
        document.getElementById("showLess").style.display = "block";
      },
      false
    );

    document.getElementById("showLess").addEventListener(
      "click",
      function (event) {
        for (let i = 9; i < data.length; i++) {
          cardHidden[i].style.display = "none";
        }
        document.getElementById("showMore").style.display = "block";
        document.getElementById("showLess").style.display = "none";
      },
      false
    );
  } else {
    document.getElementById("showMore").style.display = "none";
    document.getElementById("showLess").style.display = "none";
  }
};
window.onload = function () {
  init();
};

const goToPortfolio = (event) => {
  filterArray(event);
  if (event === "All") {
    document.getElementById("all").classList.add("active");
    document.getElementById("branding").classList.remove("active");
    document.getElementById("photo").classList.remove("active");
    document.getElementById("web").classList.remove("active");
    document.getElementById("app").classList.remove("active");
    document.getElementById("all2").classList.add("active");
    document.getElementById("branding2").classList.remove("active");
    document.getElementById("photo2").classList.remove("active");
    document.getElementById("web2").classList.remove("active");
    document.getElementById("app2").classList.remove("active");
  }
  if (event === "Branding") {
    document.getElementById("branding").classList.add("active");
    document.getElementById("all").classList.remove("active");
    document.getElementById("photo").classList.remove("active");
    document.getElementById("web").classList.remove("active");
    document.getElementById("app").classList.remove("active");
    document.getElementById("branding2").classList.add("active");
    document.getElementById("all2").classList.remove("active");
    document.getElementById("photo2").classList.remove("active");
    document.getElementById("web2").classList.remove("active");
    document.getElementById("app2").classList.remove("active");
    window.location.href = '#portfolio';
  }
  if (event === "Web") {
    document.getElementById("web").classList.add("active");
    document.getElementById("branding").classList.remove("active");
    document.getElementById("photo").classList.remove("active");
    document.getElementById("all").classList.remove("active");
    document.getElementById("app").classList.remove("active");
    document.getElementById("web").classList.add("active");
    document.getElementById("branding2").classList.remove("active");
    document.getElementById("photo2").classList.remove("active");
    document.getElementById("all2").classList.remove("active");
    document.getElementById("app2").classList.remove("active");
    window.location.href = '#portfolio';
  }
  if (event === "Photography") {
    document.getElementById("photo").classList.add("active");
    document.getElementById("branding").classList.remove("active");
    document.getElementById("all").classList.remove("active");
    document.getElementById("web").classList.remove("active");
    document.getElementById("app").classList.remove("active");
    document.getElementById("photo2").classList.add("active");
    document.getElementById("branding2").classList.remove("active");
    document.getElementById("all2").classList.remove("active");
    document.getElementById("web2").classList.remove("active");
    document.getElementById("app2").classList.remove("active");
    window.location.href = '#portfolio';
  }
  if (event === "App") {
    document.getElementById("app").classList.add("active");
    document.getElementById("branding").classList.remove("active");
    document.getElementById("photo").classList.remove("active");
    document.getElementById("web").classList.remove("active");
    document.getElementById("all").classList.remove("active");
    document.getElementById("app2").classList.add("active");
    document.getElementById("branding2").classList.remove("active");
    document.getElementById("photo2").classList.remove("active");
    document.getElementById("web2").classList.remove("active");
    document.getElementById("all2").classList.remove("active");
    window.location.href = '#portfolio';
  }
};

const showMenu = () => {
  if (menu.classList.contains("shows")) {
    menu.classList.add("hide");
    menu.classList.remove("shows");
  } else if (menu.classList.contains("hide")) {
    menu.classList.add("shows");
    menu.classList.remove("hide");
  }
};

function myFunction(x) {
  if (x.matches) {
    // If media query matches
    menu.classList.add("hide");
  } else {
    menu.classList.remove("hide");
  }
}

var x = window.matchMedia("(max-width: 1319px)");
myFunction(x); // Call listener function at run time
x.addListener(myFunction); // Attach listener function on state changes

const filterArray = (dataFilter) => {
  const elementsCards = document.getElementsByClassName(
    "portfolio__container"
  )[0];
  elementsCards.innerHTML = "";
  fetch("./assets/data/data.json")
    .then((results) => results.json())
    .then((data) => {
      if (dataFilter === "All") {
        createCards(data.data);
        buttonSelector(data.data);
      } else {
        let newArray = data.data.filter(function (item) {
          return item.description === dataFilter;
        });
        createCards(newArray);
        buttonSelector(newArray);
      }
      changeView("realsize");
    });
};

const createCards = (array) => {
  let cantidadCards = array.length;
  for (let i = 0; i < cantidadCards; i++) {
    buildCard(array[i]);
  }
};
