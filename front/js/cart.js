getBasket("basket");

//récuperer le panier
function getBasket(productChoice) {
    let basket = localStorage.getItem("basket");
    
    if (basket == null) {
        return [];
    }else{
        return JSON.parse(basket)
        console.log(basket)
    }
}

