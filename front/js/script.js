//recuperer les articles
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => {
    //construire l'html avec une boucle pour les 8 articles
    let change = ``
    for(let article of data){
      change += `
        <a href="./product.html?id=${article._id}">
        <article>
          <img src="${article.imageUrl}" alt="${article.altTxt}">
          <h3 class="productName">${article.name}</h3>
          <p class="productDescription">${article.description}</p>
        </article>
      </a>`
    }
    //injecter l'html dans le dom
    document.querySelector('#items').innerHTML = change
    
  })
  .catch((error) => {
    document.getElementById('items').textContent = "aucun produit disponible"
    document.getElementById('items').style.color = "red"
    document.getElementById('items').style.fontSize = "28px"
    return error;
  });
  