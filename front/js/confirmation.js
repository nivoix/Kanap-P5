//vider le localstorage
localStorage.clear()
//recuperation de l'url
const queryString_url_orderId = window.location.search;
// extraire orderId
const urlSearchParams = new URLSearchParams(queryString_url_orderId);
const orderId = urlSearchParams.get("orderId");

const numberOrder = document.getElementById('orderId')
numberOrder.textContent = orderId
numberOrder.style.display = "grid"