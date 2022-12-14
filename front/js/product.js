//recuperation de l'url
const queryString_url_id = window.location.search;

// extraire id
const urlSearchParams = new URLSearchParams(queryString_url_id);

const id = urlSearchParams.get("id");



// récuperation de l'article
fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
        let image = ``
        image = `
        <img src="${data.imageUrl}" alt="${data.altTxt}">`
        document.getElementByClassName('item__img').innerHTML = image
    })
    .catch((error) => {
        return error;
    });

