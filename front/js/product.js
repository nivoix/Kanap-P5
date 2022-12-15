//recuperation de l'url
const queryString_url_id = window.location.search;

// extraire id
const urlSearchParams = new URLSearchParams(queryString_url_id);

const id = urlSearchParams.get("id");

// récuperation de l'article
fetch(`http://localhost:3000/api/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);        
        document.querySelector('.item__img').innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`
        document.querySelector('.item__content__titlePrice').innerHTML = `<h1 id="title">${data.name}</h1>
        <p>Prix : <span id="price">${data.price}</span>€</p>`
        document.querySelector('#description').innerHTML = `<p id="description">${data.description}</p>`
        let colorChoise = ``
        for(let color of data.colors) {
            colorChoise +=`
            <option value="${color}">${color}</option>`
            console.log(color);
            document.getElementById("colors").innerHTML = colorChoise

        }
    })
    .catch((error) => {
        return error;
    });

