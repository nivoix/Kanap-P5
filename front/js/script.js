// On fetch sur l'url
fetch("http://localhost:3000/api/products")
  // On transforme les data en Json
  .then((res) => res.json())
  // On peut utiliser les data
  .then((data) => {
    // regarder ce qu'on reçoit pour bien cibler l'objet
    // Ici je veut qu'un seul user, donc j'envoie [0] pour le 1er user
    console.log(data);
  })
  // Gestion d'erreur IMPORTANT
  .catch((error) => {
    // Si erreur dans URL, retourne l'erreur pour pas bloquer la création de la page
    return error;
    // OU mieux : créer une fonction qui affiche l'erreur dans une modal, un coin du site...
  });