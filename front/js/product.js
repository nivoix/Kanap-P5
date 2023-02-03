//recuperation de l'url
const queryString_url_id = window.location.search;
// extraire id
const urlSearchParams = new URLSearchParams(queryString_url_id);
const id = urlSearchParams.get("id");
// récuperation des infos de l'article suivant son id
fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((data) => kanapData(data));
    //Création de l'élément "image"
    function makeImage(imageUrl, altTxt) {
      const image = document.createElement("img");
      image.src = imageUrl;
      image.alt = altTxt;
      const parent = document.querySelector(".item__img");
      parent.appendChild(image);
    }
    //Création du titre du produit
    function makeTitle(name) {
      document.querySelector("#title").textContent = name;
    }
    //Création du prix du produit
    function makePrice(price) {
      document.querySelector("#price").textContent = price;
    }
    //Création de la description du produit
    function makeDescription(description) {
      document.querySelector("#description").textContent = description;
    }
    // Création de la selection de couleur
    function makeColors(colors) {
      const select = document.querySelector("#colors");
      colors.forEach((color) => {
        //Pour chaque "couleur" récupéré de "couleurs"
        const option = document.createElement("option"); //On créé une option
        option.value = color; //On lui donne la valeur
        option.textContent = color; //Et le texte
        select.appendChild(option); // On rajoute "option" à notre "select"
      });
    }
    //Pour chaque canapé récupéré de notre API
    function kanapData(sofa) {
      const { imageUrl, altTxt, name, description, price, colors } = sofa; //Un sofa contient : une imageUrl, un altTxt, un name, une description, un price et une colors
      //On créé les éléments suivants
      itemPrice = price;
      imgUrl = imageUrl
      altText = altTxt
      articleName = name
      articleDescription = description
      makeImage(imageUrl, altTxt);
      makeTitle(name);
      makePrice(price);
      makeDescription(description);
      makeColors(colors);
    }
//création de la div pour le message d'alerte si pas de couleur
let alertColor = `<div id="alertColor" style="color:red;font-size:16px; font-weight:bold"></div>`
document.querySelector(".item__content__settings__color").innerHTML  += alertColor;
//création de la div pour le message d'alerte si pas de quantité
let alertQuantity = `<div  id="alertQuantity" style="color:red;font-size:16px; font-weight:bold"></div>`
document.querySelector(".item__content__settings__quantity").innerHTML  += alertQuantity;
// récup infos de saisie
document.getElementById('addToCart').addEventListener('click', () => {
    checkInput ()
})
// verif des éléments saisis
function checkInput () {
    let colorChoice = document.getElementById('colors').value
    if(colorChoice === "") {
        document.getElementById('alertColor').innerHTML  = 'Choisissez votre couleur' ;
    }else if (colorChoice !== ""){
        document.getElementById('alertColor').innerHTML  = ''
    }
    let quantity = Math.floor(document.getElementById('quantity').value)
    if(quantity < 1 || quantity > 100 || quantity < 0) {
        document.getElementById('alertQuantity').innerHTML = 'Veuillez saisir une quantité entre 1 et 100';
    }else if (quantity >= 1 && quantity <= 100){
        document.getElementById('alertQuantity').innerHTML = ''
    }
    if (colorChoice != "" && quantity >= 1 && quantity <= 100) {
        let productChoice = {
            id: id, 
            colorChoice: colorChoice,
            quantity: quantity
        }
        addToLocalStorage(productChoice)
    }
}
//enregistrer le panier
function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
}
//récuperer le panier
function getBasket() {
    let basket = localStorage.getItem("basket");
    if (basket == null) {
        return [];
    }else{
        return JSON.parse(basket)
    }
}
//Ajout de produits dans LS
function addToLocalStorage (productChoice) {
    let basket = getBasket();
    let quantity = document.getElementById('quantity').value
    let foundProductIndex = basket.findIndex((i) => i.id === id && i.colorChoice === productChoice.colorChoice);
    if(foundProductIndex === -1) {
        basket.push(productChoice)
    }else if((parseInt(quantity) + parseInt(basket[foundProductIndex].quantity)) > 100){
        document.getElementById('alertQuantity').innerHTML = `Veuillez saisir une quantité totale inférieure à 100, vous avez déjà ${(basket[foundProductIndex].quantity)} articles dans votre panier`;
    }else{    
        basket[foundProductIndex].quantity = parseInt(quantity) + parseInt(basket[foundProductIndex].quantity);
    }
    saveBasket(basket);
}