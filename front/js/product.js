//recuperation de l'url
const queryString_url_id = window.location.search;
// extraire id
const urlSearchParams = new URLSearchParams(queryString_url_id);
const id = urlSearchParams.get("id");
// récuperation des infos de l'article suivant son id
fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((data) => {  
        document.querySelector('.item__img').innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`
        document.querySelector('.item__content__titlePrice').innerHTML = `<h1 id="title">${data.name}</h1>
        <p>Prix : <span id="price">${data.price}</span>€</p>`
        document.querySelector('#description').innerHTML = `<p id="description">${data.description}</p>`
        for(let color of data.colors) {
            document.getElementById("colors").innerHTML  += `<option value="${color}">${color}</option>` 
        }
        document.querySelector("title").textContent = data.name;
    })
    .catch((error) => {
        return error;
    });
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
    let quantity = document.getElementById('quantity').value
    if(quantity < 1 || quantity > 100) {
        document.getElementById('alertQuantity').innerHTML = 'Veuillez saisir une quantité entre 1 et 99';
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
    console.log(foundProductIndex);
    if(foundProductIndex === -1) {
        basket.push(productChoice)
    }else if((parseInt(quantity) + parseInt(basket[foundProductIndex].quantity)) > 100){
        document.getElementById('alertQuantity').innerHTML = `Veuillez saisir une quantité totale inférieure à 100, vous avez déjà ${(basket[foundProductIndex].quantity)} articles dans votre panier`;
    }else{    
        basket[foundProductIndex].quantity = parseInt(quantity) + parseInt(basket[foundProductIndex].quantity);
    }
    saveBasket(basket);
}