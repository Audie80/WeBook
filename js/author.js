{
    let author = JSON.parse(localStorage.getItem("author"))

    let nameAuthor = document.querySelector("#nameAuthor")
    nameAuthor.textContent = author.firstname + " " + author.lastname


    let birthdayAuthor = document.querySelector("#birthdayAuthor")
    birthdayAuthor.textContent = author.birthday

    let authorBooksDiv = document.querySelector("#authorBooks")


    //On créé une fonction pour ajouter au tableau
    let addAuthorBooks = (book) => {

        let row = `
        <tr role="row" id="book-`+ book.id + `">
        <td class="authorBooksLink" style="cursor:pointer">`+ book.title + `</td>
        </tr>`;

        if (booksCollection.length === 0) {

            authorBooksDiv.innerHTML = row;
        } else {
            authorBooksDiv.innerHTML += row;
        }
    }

    reloadAuthorBooks = () => {

        //Ménage de la zone
        authorBooksDiv.innerHTML = '';

        //On ajoute un message si books pas disponible
        if (booksCollection.length === 0) {
            authorBooksDiv.innerHTML += `
            <tr role="row">
            <td colspan="8"><center>Aucun livre dans la base</center></td>
            </tr>`;
        } else {

            // Utilisation de la méthode indexOf qui permet de chercher dans le tableau si aucune valeur ne correspond
            let indexOf = 0;
            for (let i = 0; i < booksCollection.length; i++) {
                indexOf += booksCollection[i].author.firstname.indexOf(author.firstname, 0) + booksCollection[i].author.lastname.indexOf(author.lastname, 0);
                if (indexOf === -2 * booksCollection.length) {
                    authorBooksDiv.innerHTML = `
                            <tr role="row">
                            <td colspan="8"><center>Aucun livre enregistré</center></td>
                            </tr>`;
                }
                else if (booksCollection[i].author.firstname === author.firstname && booksCollection[i].author.lastname === author.lastname) {
                    addAuthorBooks(booksCollection[i]);
                }
            }

            let authorBooksLink = document.querySelectorAll(".authorBooksLink")
            Array.from(authorBooksLink).forEach((element) => {
                element.addEventListener('click', (event) => {
                    goToBookPage(element)
                });
            });

        }
    }

    reloadAuthorBooks()

    let goToBookPage = (element) => {
        let idBook = element.parentNode.id.split("-")[1]
        let index = idBook - 1;
        //On enregistre l'book sélectionné dans le localStorage
        localStorage.setItem("book", JSON.stringify(booksCollection[index]));
        //On fait un redirect sur la page book
        document.location = '/book.html'
    }
}