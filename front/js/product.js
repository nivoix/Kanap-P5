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
            document.getElementById("colors").innerHTML  += `
            <option value="${color}">${color}</option>` 
        }     
    })
    .catch((error) => {
        return error;
    });


document.getElementById('addToCart').addEventListener('click', () => {
    checkInput ()
        
})

// récup infos de saisie et verif des éléments saisis
function checkInput () {
    let colorChoice = document.getElementById('colors').value
    if(colorChoice === "") {
        console.log('choisissez une couleur');
    }
    console.log(colorChoice);

    let quantity = document.getElementById('quantity').value
    if(quantity < 1 || quantity >99) {
        console.log('veuillez saisir une bonne quantité entre 1 et 100')
    }
    console.log(quantity);
    if (colorChoice != "" && quantity >= 1 && quantity < 100) {
        let productChoice = [id, colorChoice, quantity]
        addToLocalStorage(productChoice)
    }
}

function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
}

function getBasket() {
    let basket = localStorage.getItem("basket");
    if (basket == null) {
        return [];
    }else{
        return JSON.parse(basket)
    }
}
function addToLocalStorage (productChoice) {
    let basket = getBasket();
    basket.push(productChoice);
    saveBasket(basket);
}

