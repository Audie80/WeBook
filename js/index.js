{
   /* Déclaration de variables */
    let statDivBooks = document.querySelector("#statDivBooks");
    let statDivAvis = document.querySelector("#statDivAvis");
    let statDivEditors = document.querySelector("#statDivEditors");
    let statDivAuthors = document.querySelector("#statDivAuthors");
    let statDivGenres = document.querySelector("#statDivGenres");
    let statDivFormats = document.querySelector("#statDivFormats");

    /* On va chercher les valeurs */
    let statBooks = booksCollection.length;
    let statAvis = avisCollection.length;
    let statEditors = editorsCollection.length;
    let statAuthors = authorsCollection.length;
    let statGenres = genresCollection.length;
    let statFormats = formatsCollection.length;

    /* On remplit le html avec les valeurs */
    statDivBooks.innerHTML += statBooks;
    statDivAvis.innerHTML += statAvis;
    statDivEditors.innerHTML += statEditors;
    statDivAuthors.innerHTML += statAuthors;
    statDivGenres.innerHTML += statGenres;
    statDivFormats.innerHTML += statFormats;
}