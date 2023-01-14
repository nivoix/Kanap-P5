//recuperation de l'url
const queryString_url_orderId = window.location.search;
//console.log(queryString_url_orderId);
// extraire orderId
const urlSearchParams = new URLSearchParams(queryString_url_orderId);
const orderId = urlSearchParams.get("orderId");
//console.log(orderId);

const numberOrder = document.getElementById('orderId')

numberOrder.textContent = orderId
//numberOrder.style.overflow-wrap: break-word