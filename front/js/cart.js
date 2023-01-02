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




   
let basket = getBasket();
console.log(basket);
fetch(`http://localhost:3000/api/products`)
.then((res) => res.json())
.then((data) => { 
    for(let x = 0; x < basket.length; x++) {
    let basket = getBasket();
        for(let y = 0; y < data.length; y++){
        //console.log(data[y].colors);
            if(basket[x].id === data[y]._id){
            let totalPriceProduct = (parseInt(data[y].price) * parseInt(basket[x].quantity))
        //console.log(basket[x].id);
            document.getElementById("cart__items").innerHTML += 
                    
                    `<article class="cart__item" data-id=${basket[x].id} data-color=${basket[x].colorChoice}>
                        <div class="cart__item__img"><img src="${data[y].imageUrl}" alt="${data[y].description}"></div>
                        <div class="cart__item__content">
                            <div class="cart__item__content__description">
                                <h2>${data[y].name}</h2>
                                <p>${basket[x].colorChoice}</p>
                                <p>${totalPriceProduct}€</p>
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
// changement de quantité 
    let lastQuantity =  document.querySelectorAll(".itemQuantity");
    console.log(lastQuantity);
    for(let v = 0; v < lastQuantity.length; v++){
            let lastValueQuantity = lastQuantity[v];
            console.log(lastValueQuantity);
            lastValueQuantity.addEventListener ("change", function (e) {
                console.log(e.target.value);
                let eArticle = lastQuantity[v].closest("article");
                let eId = eArticle.getAttribute("data-id");
                //console.log(eId);
                let eColor = eArticle.getAttribute("data-color");
                //console.log(eColor);
                let product = {
                    id: eId,
                    colorChoice: eColor,
                    quantity: e.target.value
                }
                //console.log(product);
                addToLocalStorage(product);
                location.reload();
            });
    }
let totalQuantity = document.getElementById('totalQuantity');
totalQuantity.textContent = totalQuantityFromBasket ();    
})

//Ajout de produits dans LS
function addToLocalStorage(product) {
    let basket = getBasket();
    let foundProductIndex = basket.findIndex((i) => i.id === product.id && i.colorChoice === product.colorChoice);
    console.log(product.colorChoice);
    if(foundProductIndex === -1) {
       basket.push(product);
    }else{
        console.log(product.quantity);
        basket[foundProductIndex].quantity = product.quantity;
        
    }
    saveBasket(basket);
}
// quantit total de produit  
function totalQuantityFromBasket () {
    let basket = getBasket();
    let number = 0;
    for (let product of basket) {
        number += parseInt(product.quantity);
    }
    return number;
}   
  



    
// récup des infos de chaque produit du panier et afficher le panier
/* basket.forEach(productChoice => {
    
    fetch(`http://localhost:3000/api/products/${productChoice.id}`)
    .then((res) => res.json())
    .then((data) => { 
        let totalPriceProduct = (parseInt(data.price) * parseInt(productChoice.quantity))
        
        document.getElementById("cart__items").innerHTML += 
        `<article class="cart__item" data-id=${productChoice.id} data-color=${productChoice.colorChoice}>
            <div class="cart__item__img"><img src="${data.imageUrl}" alt="${data.description}"></div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${data.name}</h2>
                    <p>${productChoice.colorChoice}</p>
                    <p>${totalPriceProduct}€</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productChoice.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <br>
                        <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`   
    })
    .catch((error) => {
        return error;
    });
}); */

/* function deleteFromBasket(productChoice) {
    let basket = getBasket();
    basket = basket.filter(p => p.id != productChoice.id);
    saveBasket();
}

function changeQuantity (productChoice, quantity) {
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id === productChoice.id && p.colorChoice === productChoice.colorChoice);
    console.log(foundProduct);
    if(foundProduct != undefined) {
        foundProduct.quantity = quantity;
        console.log(quantity);
     }if (foundProduct.quantity <= 0) {
        deleteFromBasket(foundProduct);
     } else {
        saveBasket(basket);
     }
} */







    

    
    
        
    
    

    


