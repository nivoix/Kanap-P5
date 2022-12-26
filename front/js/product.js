//recuperation de l'url
const queryString_url_id = window.location.search;

// extraire id
const urlSearchParams = new URLSearchParams(queryString_url_id);
const id = urlSearchParams.get("id");

// récuperation de l'article
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
    })
    .catch((error) => {
        return error;
    });

let alertColor = `<div id="alertColor" style="color:red;font-size:16px; font-weight:bold"></div>`
document.querySelector(".item__content__settings__color").innerHTML  += alertColor;

let alertQuantity = `<div  id="alertQuantity" style="color:red;font-size:16px; font-weight:bold"></div>`
        document.querySelector(".item__content__settings__quantity").innerHTML  += alertQuantity;
document.getElementById('addToCart').addEventListener('click', () => {
    checkInput ()
        
})

// récup infos de saisie et verif des éléments saisis
function checkInput () {
    let colorChoice = document.getElementById('colors').value
    if(colorChoice === "") {
        document.getElementById('alertColor').innerHTML  = 'Choisissez votre couleur' ;
    }else if (colorChoice !== ""){
        document.getElementById('alertColor').innerHTML  = ''
    }
    
    let quantity = document.getElementById('quantity').value
    if(quantity < 1 || quantity >99) {
        document.getElementById('alertQuantity').innerHTML = 'Veuillez saisir une quantité entre 1 et 99';
    }else if (quantity >= 1 && quantity < 100){
        document.getElementById('alertQuantity').innerHTML = ''
    }
    
    if (colorChoice != "" && quantity >= 1 && quantity < 100) {
        let productChoice = {
            id: id, 
            colorChoice: colorChoice,
            quantity: quantity
        }
        console.log(quantity);
        addToLocalStorage(productChoice)
        
    }
}

//enregistrer le panier
function saveBasket(product) {
    localStorage.setItem("basket", JSON.stringify(product));
}

//récuperer le panier
function getBasket() {
    let product = localStorage.getItem("basket");
    if (product == null) {
        return [];
    }else{
        return JSON.parse(product)
    }
}
//Ajout de produits dans LS
function addToLocalStorage (productChoice) {
    let product = getBasket();
    let quantity = document.getElementById('quantity').value
    let foundProductIndex = product.findIndex((i) => i.id === id && i.colorChoice === productChoice.colorChoice);
    console.log(foundProductIndex);
    if(foundProductIndex === -1) {
       
       product.push(productChoice)
    }else{
        product[foundProductIndex].quantity = parseInt(quantity) + parseInt(productChoice.quantity);
        
    }
    saveBasket(product);
}
