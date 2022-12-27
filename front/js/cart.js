// récupérer le panier
const basket = JSON.parse(localStorage.getItem("basket"));

// récup des infos de chaque produit du panier
basket.forEach(productChoice => {
    
    fetch(`http://localhost:3000/api/products/${productChoice.id}`)
    .then((res) => res.json())
        
    .then((data) => { 
        document.getElementById("cart__items").innerHTML += 
        `<article class="cart__item" data-id="{${productChoice.id}}" data-color=${productChoice.colorChoice}>
            <div class="cart__item__img"><img src="${data.imageUrl}" alt="${data.description}"></div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${data.name}</h2>
                    <p>${productChoice.colorChoice}</p>
                    <p>${data.price}€</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : ${productChoice.quantity} </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="0">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <br>
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`
    })
});

//création de la div pour le message d'alerte si pas de quantité
let alertQuantity = `<div  id="alertQuantity" style="color:red;font-size:16px; font-weight:bold"></div>`
console.log(alertQuantity);
//document.querySelector(".cart__item__content__settings__quantity").innerHTML  += alertQuantity;

document.querySelector(".itemQuantity").addEventListener('change' , () => {
    checkInput ();
})

function checkInput () {
let quantity = document.querySelector(".itemQuantity").value
    if(quantity < 1 || quantity >99) {
        document.getElementById('alertQuantity').innerHTML = 'Veuillez saisir une quantité entre 1 et 99';
    }else if (quantity >= 1 && quantity < 100){
        document.getElementById('alertQuantity').innerHTML = ''
    }
}



    

    
    
        
    
    

    


