{
    //On déclare nos variables
    let booksDiv = document.querySelector("#books")
    let addBookForm = document.querySelector("#addBookForm")
    let titleBook = document.querySelector("#titleBook")
    let authorBook = document.querySelector("#authorBook")
    let genreBook = document.querySelector("#genreBook")
    let editorBook = document.querySelector("#editorBook")
    let formatBook = document.querySelector("#formatBook")
    let countPageBook = document.querySelector("#countPageBook")
    let releaseBook = document.querySelector("#releaseBook")
    let priceBook = document.querySelector("#priceBook")
    let isbnBook = document.querySelector("#isbnBook")
    let resumeBook = document.querySelector("#resumeBook")

    // Variables pour les statistiques
    let statDivAvisPos = document.querySelector("#statDivAvisPos");
    let statDivAvisNeg = document.querySelector("#statDivAvisNeg");
    let statDivAvisMoy = document.querySelector("#statDivAvisMoy");
    let statDivAvisNb = document.querySelector("#statDivAvisNb");
    let statAvisPos = 0;
    let statAvisNeg = 0;
    let statAvisMoy = 0;
    let StatAvisNb = 0;


    let isbnInvalidBook = document.querySelector("#isbnInvalidBook")
    let releaseInvalidBook = document.querySelector("#releaseInvalidBook")

    let indexBookSelected = null
    let bookSelected = null
    let titleForm = document.querySelector("#titleForm")


    //On calcule les statistiques
    for (let i = 0; i < avisCollection.length; i++) {
        statAvisMoy += parseInt(avisCollection[i].qualite, 10);
        if (avisCollection[i].qualite >= 50) {
            statAvisPos++;
        } else {
            statAvisNeg++;
        }
    }
    statAvisMoy /= avisCollection.length;
    StatAvisNb = avisCollection.length / booksCollection.length;

    //On remplit les statistiques
    statDivAvisPos.innerHTML += statAvisPos + ' / ' + avisCollection.length;
    statDivAvisNeg.innerHTML += statAvisNeg + ' / ' + avisCollection.length;
    statDivAvisMoy.innerHTML += Math.round(statAvisMoy * 100) / 100;
    statDivAvisNb.innerHTML += Math.round(StatAvisNb * 100) / 100;


    //On va aller remplir nos listes déroulantes
    let addAuthorList = (author) => {
        authorBook.innerHTML += `<option value="` + author.id + `">` + author.firstname + ` ` + author.lastname + `</option>`;
    }

    for (let i = 0; i < authorsCollection.length; i++) {
        addAuthorList(authorsCollection[i], i)
    }

    let addGenreList = (genre) => {
        genreBook.innerHTML += `<option value="` + genre.id + `">` + genre.name + `</option>`;
    }

    for (let i = 0; i < genresCollection.length; i++) {
        addGenreList(genresCollection[i], i)
    }

    let addEditorList = (editor) => {
        editorBook.innerHTML += `<option value="` + editor.id + `">` + editor.name + `</option>`;
    }

    for (let i = 0; i < editorsCollection.length; i++) {
        addEditorList(editorsCollection[i], i)
    }

    let addFormatList = (format) => {
        formatBook.innerHTML += `<option value="` + format.id + `">` + format.name + `</option>`;
    }

    for (let i = 0; i < formatsCollection.length; i++) {
        addFormatList(formatsCollection[i], i)
    }

    //On créé une fonction pour ajouter au tableau
    let addBook = (book) => {

        let row = `
        <tr role="row" id="book-`+ book.id + `">
        <td>
            <center>
              <span class='deleteBook' style="cursor:pointer;margin-right:10px"><i class="far fa-trash-alt"></i></span>
              <span class='editBook' style="cursor:pointer"><i class="far fa-edit"></i></span>
            </center></td>
        <td class="bookLink" style="cursor:pointer">`+ book.id + `</td>
        <td class="bookLink" style="cursor:pointer">`+ book.title + `</td>
        <td class="bookLink" style="cursor:pointer">`+ book.author.firstname + ` ` + book.author.lastname + `</td>
        <td class="bookLink" style="cursor:pointer">`+ book.release + `</td>
        <td class="bookLink" style="cursor:pointer">`+ book.genre.name + `</td>
        <td class="bookLink" style="cursor:pointer">`+ book.editor.name + `</td>
        </tr>`;

        if (booksCollection.length === 0) {

            booksDiv.innerHTML = row;
        } else {
            booksDiv.innerHTML += row;
        }
    }

    reloadBook = () => {

        //Ménage de la zone
        booksDiv.innerHTML = '';

        //On ajoute un message si livre pas disponible
        if (booksCollection.length === 0) {
            booksDiv.innerHTML += `
            <tr role="row">
            <td colspan="8"><center>Aucun livre dans la base</center></td>
            </tr>`;
        } else {


            for (let i = 0; i < booksCollection.length; i++) {
                addBook(booksCollection[i])
            }

            let editBook = document.querySelectorAll(".editBook")
            Array.from(editBook).forEach((element) => {
                element.addEventListener('click', (event) => {
                    modifFormEdit(element)
                });
            });

            let deleteBook = document.querySelectorAll(".deleteBook")
            Array.from(deleteBook).forEach((element) => {
                element.addEventListener('click', (event) => {
                    removeBook(element)
                });
            });

            let bookLink = document.querySelectorAll(".bookLink")
            Array.from(bookLink).forEach((element) => {
                element.addEventListener('click', (event) => {
                    goToBookPage(element)
                });
            });
        }
    }

    reloadBook()

    let verifyRelease = (release) => {
        if (parseInt(release) >= 1700 && parseInt(release) <= 2019 && release.length === 4) {
            releaseBook.style.border = "1px solid #d1d3e2";
            releaseInvalidBook.style.display = "none";
            releaseInvalidBook.textContent = ""
            return release;
        } else {
            releaseBook.style.border = "1px solid red";
            releaseInvalidBook.style.display = "block";
            releaseInvalidBook.textContent = "Vous devez saisir une date valide entre 1700 et 2019"
            return false;
        }

    }

    //On ajoute un controle onBlur sur le champ release
    releaseBook.addEventListener("blur", (event) => {
        verifyRelease(releaseBook.value)
    })

    let verifyISBN = (isbn) => {
        if (isbn !== '' && isbn.length === 13) {
            isbnBook.style.border = "1px solid #d1d3e2";
            isbnInvalidBook.style.display = "none";
            isbnInvalidBook.textContent = ""
            return isbn;

        } else {
            isbnBook.style.border = "1px solid red";
            isbnInvalidBook.style.display = "block";
            isbnInvalidBook.textContent = "Vous devez saisir un ISBN valide comportant 13 chiffres"
            return false;
        }

    }


    //On ajoute un controle onBlur sur le champ isbn
    isbnBook.addEventListener("blur", (event) => {
        verifyISBN(isbnBook.value)
    })



    //On ajoute au formulaire un évènement submit
    addBookForm.addEventListener("submit", (event) => {

        let book = {
            id: booksCollection.length + 1,
            title: titleBook.value,
            countPage: parseInt(countPageBook.value),
            release: releaseBook.value,
            price: parseFloat(priceBook.value),
            isbn: isbnBook.value,
            resume: resumeBook.value,
            editor: editorBook.value
        }


        for (let i = 0; i < authorsCollection.length; i++) {
            if (authorsCollection[i].id === parseInt(authorBook.value)) {
                book.author = authorsCollection[i]
                break;
            }
        }

        for (let i = 0; i < genresCollection.length; i++) {
            if (genresCollection[i].id === parseInt(genreBook.value)) {
                book.genre = genresCollection[i]
                break;
            }
        }

        for (let i = 0; i < formatsCollection.length; i++) {
            if (formatsCollection[i].id === parseInt(formatBook.value)) {
                book.format = formatsCollection[i]
                break;
            }
        }
        for (let i = 0; i < editorsCollection.length; i++) {
            if (editorsCollection[i].id === parseInt(editorBook.value)) {
                book.editor = editorsCollection[i]
                break;
            }
        }



        book.release = verifyRelease(book.release);
        book.isbn = verifyISBN(book.isbn);


        if (book.release !== false && book.title !== ''
            && book.author !== undefined && book.author.lastname !== undefined && book.author.firstname !== undefined
            && book.genre !== undefined && book.genre.name !== undefined
            && book.editor !== undefined && book.editor.name !== undefined
            && book.format !== undefined && book.format.name !== undefined
            && book.countPage !== '' && book.price !== ''
            && book.isbn !== false && book.resume !== '') {

            //Si pas de livre sélectionné, on est en ajout
            if (bookSelected === null && indexBookSelected === null) {
                booksCollection.push(book)
                localStorage.setItem("books", JSON.stringify(booksCollection));
                reloadBook();
                addBookForm.reset()
            } else {
                //On modifie la valeur dans la collection et on la sauvegarde
                book.id = booksCollection[indexBookSelected].id
                booksCollection[indexBookSelected] = book

                localStorage.setItem("books", JSON.stringify(booksCollection));

                //On reload le tableau pour qu'il affiche la modification
                reloadBook()

                //On clean le formulaire et on remet à null l'index et l'objet sélectionné
                addBookForm.reset()
                indexBookSelected = null
                bookSelected = null

                //On modifie le titre du formulaire
                titleForm.textContent = "Ajouter un livre"

            }
        }




        event.preventDefault();
    })

    //Déclaration de la méthode modifFormEdit
    modifFormEdit = (element) => {
        //On va placer un index et objet book sélectioné
        let idBook = element.parentNode.parentNode.parentNode.id.split("-")[1]
        indexBookSelected = idBook - 1;
        bookSelected = booksCollection[indexBookSelected];

        //On modifie le titre du formulaire
        titleForm.textContent = "Modification du livre"

        //On met le nom du livre dans le champ firstnameBook
        titleBook.value = bookSelected.title
        authorBook.value = bookSelected.author.id
        genreBook.value = bookSelected.genre.id
        editorBook.value = bookSelected.editor.id
        formatBook.value = bookSelected.format.id
        formatBook.value = bookSelected.format.id
        countPageBook.value = bookSelected.countPage
        releaseBook.value = bookSelected.release
        priceBook.value = bookSelected.price
        isbnBook.value = bookSelected.isbn
        resumeBook.value = bookSelected.resume

    }

    //Déclaration de la méthode removeBook
    removeBook = (element) => {
        if (confirm("Voulez-vous réellement supprimer ce livre ?")) {

            let idBook = element.parentNode.parentNode.parentNode.id.split("-")[1]
            let index = idBook - 1;

            if (booksCollection.length > 1) {
                booksCollection.splice(index, 1)
            } else {
                booksCollection = []
            }
            localStorage.setItem("books", JSON.stringify(booksCollection));

            //On reload le tableau pour qu'il affiche la modification
            reloadBook()
        }

    }

    let goToBookPage = (element) => {
        let idBook = element.parentNode.id.split("-")[1]
        let index = idBook - 1;

        //On enregistre l'book sélectionné dans le localStorage
        localStorage.setItem("book", JSON.stringify(booksCollection[index]));
        //On fait un redirect sur la page book
        document.location = '/book.html'
    }

}