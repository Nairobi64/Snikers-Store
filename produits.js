// Recuperation des produits depuis le fichier json
const reponse = await fetch("objects-snikers.json");
const produits = await reponse.json();


// creation de la bouble qui permettra d'afficher tous les elements

for( let i=0 ; i < produits.length ; i++){

    const articles = produits[i];
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".Fiches");
    // Création d’une balise dédiée à une pièce automobile
    const formatElement = document.createElement("articles");
    // Création des balises 
    const imageElement = document.createElement('img');
    imageElement.src = articles.Images;
    
    const NomElement = document.createElement('h2');
    NomElement.innerText = articles.Nom;
    
    const PointureElement = document.createElement('p');
    PointureElement.innerText = `Taille: ${articles.Pointure}`;
    
    const DescriptionElement = document.createElement("P")
    DescriptionElement.innerText = articles.Description ?? "(Aucune description reseigne !)";
    
    const PrixElement = document.createElement('P');
    PrixElement.innerText = `Prix: ${articles.Prix} f (${articles.Prix < 35 ? "f" : "fff"})`;
    
    const CategorieElement = document.createElement('p');
    CategorieElement.innerText = articles.Categorie ?? "(Aucune categorie renseigne)";
    
    const stockElement = document.createElement("p")
    stockElement.innerText = articles.Stock ? "En stock" : "Rupture de stock";
    
    // stoquons nos articles dans un elements parent

    // ratachons le format articles a la section fiches
    sectionFiches.appendChild(formatElement)
    
    // ratachons chaque element au format articles
    formatElement.appendChild(imageElement);
    formatElement.appendChild(NomElement);
    formatElement.appendChild(PointureElement);
    formatElement.appendChild(DescriptionElement);
    formatElement.appendChild(PrixElement);
    formatElement.appendChild(CategorieElement);
    formatElement.appendChild(stockElement);

}

//gestion des bouttons 

const boutonTrier = document.querySelector(".btn-trie");
boutonTrier.addEventListener("click", function (){
    
    const pieceElement = Array.from(produits);
    pieceElement.sort(function (a, b){
        return a.Prix - b.Prix
    })
    console.log(pieceElement)
})

const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", function () {
    const piecesFiltrees = produits.filter(function (produit) {
        return produit.Prix <= 35;
    });
   console.log(piecesFiltrees)
});

//Correction Exercice
const boutonDecroissant = document.querySelector(".btn-decroissant");

boutonDecroissant.addEventListener("click", function () {
    const piecesOrdonnees = Array.from(produits);
    piecesOrdonnees.sort(function (a, b) {
        return b.Prix - a.Prix;
     });
     console.log(piecesOrdonnees);
});

const boutonNoDescription = document.querySelector(".btn-nodesc");

boutonNoDescription.addEventListener("click", function () {
    const piecesFiltrees = produits.filter(function (produit) {
        return !produit.Description
    });
   console.log(piecesFiltrees)
});
    
// Extraire les noms de la liste produits
const lesNoms = produits.map(produit => produit.Nom);
// parcourir la liste afin de supprimer les nons des produits non abordable.
for(let i = produits.length -1 ; i >= 0; i --){
    if(produits[i].Prix > 20){
        lesNoms.splice(i,1)
    }
    console.log(lesNoms)
}

// Affichage des noms 
// creation de la liste a puce
const uLpuce = document.createElement('ul')

for(let i = 0; i <= lesNoms.length; i++){
    const lipuce = document.createElement('li')
    lipuce.innerText = lesNoms[i];
    uLpuce.appendChild(lipuce)
}
const liste = document.querySelector('.abordables').appendChild(uLpuce)

// Affichage des liste disponibles
const nomsDisponibles = produits.map(produit => produit.Nom)
const prixDisponibles = produits.map(produit => produit.Prix)
// parcours de la liste
for(let index = produits.length -1; index >= 0; index --){
    if(produits[index].disponibiltes === false){
        nomsDisponibles.splice(index,1)
        prixDisponibles.splice(index,1)
    }
}

const disponiblesElement = document.createElement('ul');

for(let i=0 ; i < nomsDisponibles.length ; i++){
    const nomElement = document.createElement('li');
    nomElement.innerText = `${nomsDisponibles[i]} - ${prixDisponibles[i]} f`;
    disponiblesElement.appendChild(nomElement);
}

document.querySelector('.disponibles').appendChild(disponiblesElement);


// document.querySelector('.Fiches').innerHTML = '';
