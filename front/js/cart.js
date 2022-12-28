// récupérer le panier
const basket = JSON.parse(localStorage.getItem("basket"));
if(basket === null){
    document.querySelector('h1').textContent = "Votre panier est vide";
}

// récup des infos de chaque produit du panier
basket.forEach(productChoice => {
    
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
              let qty = document.querySelector(`(data-id=${productChoice.id} data-color=${productChoice.colorChoice})>".itemQuantity"`).value;
              console.log(qty); 
    })
    
      
});






    

    
    
        
    
    

    


