{
    let editor = JSON.parse(localStorage.getItem("editor"))

    let nameEditor = document.querySelector("#nameEditor")
    nameEditor.textContent = editor.name
    let creationEditor = document.querySelector("#creationEditor")
    creationEditor.textContent = editor.creation

    let editorBooksDiv = document.querySelector("#editorBooks")


    //On créé une fonction pour ajouter au tableau
    let addEditorBooks = (book) => {

        let row = `
        <tr role="row" id="book-`+ book.id + `">
        <td class="editorBooksLink" style="cursor:pointer">`+ book.title + `</td>
        </tr>`;

        if (booksCollection.length === 0) {

            editorBooksDiv.innerHTML = row;
        } else {
            editorBooksDiv.innerHTML += row;
        }
    }

    reloadEditorBooks = () => {

        //Ménage de la zone
        editorBooksDiv.innerHTML = '';

        //On ajoute un message si books pas disponible
        if (booksCollection.length === 0) {
            editorBooksDiv.innerHTML += `
            <tr role="row">
            <td colspan="8"><center>Aucun livre dans la base</center></td>
            </tr>`;
        } else {


            for (let i = 0; i < booksCollection.length; i++) {
                if (booksCollection[i].editor.name.indexOf(editor.name) === -1) {
                    editorBooksDiv.innerHTML = `
                    <tr role="row">
                    <td colspan="8"><center>Aucun livre enregistré</center></td>
                    </tr>`;
                }
                else if (booksCollection[i].editor.name === editor.name) {
                    addEditorBooks(booksCollection[i]);
                }
            }

            let editorBooksLink = document.querySelectorAll(".editorBooksLink")
            Array.from(editorBooksLink).forEach((element) => {
                element.addEventListener('click', (event) => {
                    goToBookPage(element)
                });
            });

        }
    }

    reloadEditorBooks()

    let goToBookPage = (element) => {
        let idBook = element.parentNode.id.split("-")[1]
        let index = idBook - 1;
        //On enregistre l'book sélectionné dans le localStorage
        localStorage.setItem("book", JSON.stringify(booksCollection[index]));
        //On fait un redirect sur la page book
        document.location = '/book.html'
    }
}