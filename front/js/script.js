//On récupère les données de l'API avec une requête "fetch"
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => kanapData(data))
  .catch((error) => {
    document.getElementById('items').textContent = "aucun produit disponible"
    document.getElementById('items').style.color = "red"
    document.getElementById('items').style.fontSize = "28px"
    return error;
  });
//Création de l'élément "anchor"
function makeAnchor(id) {
  const anchor = document.createElement("a")
  anchor.href = "./product.html?id=" + id
  return anchor
}
//Création de l'élément "image"
function makeImage(imageUrl, altTxt) {
  const image = document.createElement("img")
  image.src = imageUrl
  image.alt = altTxt
  return image
}
//Création de l'élément "titre"
function makeTitle(name) {
  const h3 = document.createElement("h3")
  h3.textContent = name
  h3.classList.add("productName")
  return h3
}
//Création de l'élément "paragraphe"
function makeParagraph(description) {
  const p = document.createElement("p")
  p.textContent = description
  p.classList.add("productDescription")
  return p
}
//Ajout des éléments à l'article
function appendElementsToArticle(article, array) {
  array.forEach((item) => {
    article.appendChild(item)
  })
}
//Ajout de l'"anchor" à la classe "items" et ajout de l'"article" au lien "anchor"
function appendArticleToAnchor(anchor, article) {
  const items = document.querySelector("#items")
  items.appendChild(anchor)
  anchor.appendChild(article)
}
//Création de la boucle "forEach"
function kanapData(sofas) {
  sofas.forEach((sofa) => { //Pour chaque "sofa" récupéré de "sofas"
    const { _id, imageUrl, altTxt, name, description } = sofa //Un "sofa" contient : un _id, une imageUrl un altTxt, un name et une description
    //On créé les elements suivants
    const anchor = makeAnchor(_id)
    const article = document.createElement("article")
    const image = makeImage(imageUrl, altTxt)
    const h3 = makeTitle(name)
    const p = makeParagraph(description)
    appendElementsToArticle(article, [image, h3, p]) //Enfin, on ajoute l'image, le h3 et le p à l'article
    appendArticleToAnchor(anchor, article) //Et l'article au lien anchor
  })
}