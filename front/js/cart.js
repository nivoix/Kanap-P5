let products = [];
let basket = getBasket();
// récupérer le panier
function getBasket() {
    let basket = localStorage.getItem("basket");
    if(basket == null){
        document.querySelector('h1').textContent = "Votre panier est vide";
    }else{
        return JSON.parse(basket)
    }
}
//enregistrer le panier
function saveBasket(basket) {
    localStorage.setItem("basket", JSON.stringify(basket));
}



// changement de quantité d'un produit
function changeQuantity(){
    let lastQuantity =  document.querySelectorAll(".itemQuantity");
    for(let v = 0; v < lastQuantity.length; v++){
        let lastValueQuantity = lastQuantity[v];
        lastValueQuantity.addEventListener ("change", function (e) {
            let eArticle = lastQuantity[v].closest("article");
            let eId = eArticle.getAttribute("data-id");
            let eColor = eArticle.getAttribute("data-color");
            let product = {
                id: eId,
                colorChoice: eColor,
                quantity: e.target.value
            }
            editProductLocalStorage(product);
            totalQuantityFromBasket ();
            totalPriceFromBasket();
        });
    }
}
//Ajout de produits dans LS
function editProductLocalStorage(product) {
    let basket = getBasket();
    let foundProductIndex = basket.findIndex((i) => i.id === product.id && i.colorChoice === product.colorChoice);
    if(foundProductIndex != -1){
        basket[foundProductIndex].quantity = product.quantity;
    }
    saveBasket(basket);
}
// quantité total de produit  
function totalQuantityFromBasket () {
    let basket = getBasket();
    let number = 0;
    for (let product of basket) {
        number += parseInt(product.quantity);
        let totalQuantity = document.getElementById('totalQuantity');
        totalQuantity.textContent = number;
    }
}

// prix total du panier
function totalPriceFromBasket () {
    let basket = getBasket();
    let price = 0;
    for(let product of basket) {
        for(let p = 0; p < products.length; p++) {
            if(product.id === products[p]._id){
                price += products[p].price * product.quantity;
                let totalPrice = document.getElementById('totalPrice');
                totalPrice.textContent = price; 
            }
        }
    }
}
// suprimer un produit
function removeProduct () {
    let remove = document.getElementsByClassName('deleteItem');
    for(let r = 0; r < remove.length; r++){
        remove[r].addEventListener('click', () => {
            let eArticle = remove[r].closest("article");
            let eId = eArticle.getAttribute("data-id");
            let eColor = eArticle.getAttribute("data-color");
            let product = {
                id: eId,
                colorChoice: eColor,
            }
            deleteFromBasket(product)    
        })
    }
}

//suppression de produits dans LS
function deleteFromBasket(product) {
            let basket = getBasket();
            basket = basket.filter(d => (d.id != product.id) || (d.colorChoice != product.colorChoice))
            saveBasket(basket);
            if(basket.length != 0){
                location.reload();
            }else{
                localStorage.removeItem('basket');
                location.reload();
            }
            
}
   
fetch(`http://localhost:3000/api/products`)
.then((res) => res.json())
.then((data) => {
    products = data;
    for(let x = 0; x < basket.length; x++) {
        let basket = getBasket();
            for(let y = 0; y < data.length; y++){
                if(basket[x].id === data[y]._id){
                //prix total pour le produit en fonction de sa quantité: let totalPriceProduct = (parseInt(data[y].price) * parseInt(basket[x].quantity))
                document.getElementById("cart__items").innerHTML +=
                        `<article class="cart__item" data-id=${basket[x].id} data-color=${basket[x].colorChoice}>
                            <div class="cart__item__img"><img src="${data[y].imageUrl}" alt="${data[y].description}"></div>
                            <div class="cart__item__content">
                                <div class="cart__item__content__description">
                                    <h2>${data[y].name}</h2>
                                    <p>${basket[x].colorChoice}</p>
                                    <p>${data[y].price}€</p>
                                </div>
                                <div class="cart__item__content__settings">
                                    <div class="cart__item__content__settings__quantity">
                                        <p>Qté : </p>
                                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basket[x].quantity}">
                                    </div>
                                    <div class="cart__item__content__settings__delete">
                                        <br>
                                        <p class="deleteItem">Supprimer</p>
                                    </div>
                                  </div>
                                </div>
                              </article>`                             
                }
            }
        }
// changement de quantité d'un produit
    changeQuantity();
// changement de quantité total de produit
    totalQuantityFromBasket();
// prix total du panier
    totalPriceFromBasket();
// sup product
    removeProduct();
})