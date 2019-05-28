{
    let book = JSON.parse(localStorage.getItem("book"))

    let titleBook = document.querySelector("#titleBook")
    titleBook.textContent = book.title
    let idBookSelected = book.id;

    //On déclare nos variables pour l'ajout d'avis
    let avisDiv = document.querySelector("#avis")
    let addAvisForm = document.querySelector("#addAvisForm")
    let qualiteAvis = document.querySelector("#qualiteAvis")
    let textAvis = document.querySelector("#textAvis")

    let indexAvisSelected = null
    let avisSelected = null
    let titleFormAvis = document.querySelector("#titleFormAvis")

    //On créé une fonction pour ajouter au tableau
    let addAvis = (avis) => {

        let row = `
        <tr role="row" id="avis-`+ avis.id + `">
        <td>
            <center>
              <span class='deleteAvis' style="cursor:pointer;margin-right:10px"><i class="far fa-trash-alt"></i></span>
              <span class='editAvis' style="cursor:pointer"><i class="far fa-edit"></i></span>
            </center></td>
        <td>`+ avis.qualite + `</td>
        <td>`+ avis.text + `</td>
        </tr>`;

        if (avisCollection.length === 0) {

            avisDiv.innerHTML = row;
        } else {
            avisDiv.innerHTML += row;
        }
    }

    reloadAvis = () => {

        //Ménage de la zone
        avisDiv.innerHTML = '';

        //On ajoute un message si avis pas disponible
        if (avisCollection.length === 0) {
            avisDiv.innerHTML += `
            <tr role="row">
            <td colspan="8"><center>Aucun avis dans la base</center></td>
            </tr>`;
        } else {


            for (let i = 0; i < avisCollection.length; i++) {
                if(avisCollection[i].idBook === idBookSelected) {
                    addAvis(avisCollection[i]);
                }
            }

            let editAvis = document.querySelectorAll(".editAvis")
            Array.from(editAvis).forEach((element) => {
                element.addEventListener('click', (event) => {
                    modifFormEdit(element)
                });
            });

            let deleteAvis = document.querySelectorAll(".deleteAvis")
            Array.from(deleteAvis).forEach((element) => {
                element.addEventListener('click', (event) => {
                    removeAvis(element)
                });
            });
        }
    }

    reloadAvis()

    //On ajoute au formulaire un évènement submit
    addAvisForm.addEventListener("submit", (event) => {

        let avis = {
            id: avisCollection.length + 1,
            idBook: idBookSelected,
            qualite: qualiteAvis.value,
            text: textAvis.value
        }

        if (avis.qualite !== undefined && avis.text !== undefined) {

            //Si pas d'avis sélectionné, on est en ajout
            if (avisSelected === null && indexAvisSelected === null) {
                avisCollection.push(avis)
                localStorage.setItem("avis", JSON.stringify(avisCollection));
                reloadAvis();
                addAvisForm.reset()
            } else {
                //On modifie la valeur dans la collection et on la sauvegarde
                avis.id = avissCollection[indexAvisSelected].id
                avisCollection[indexAvisSelected] = avis

                localStorage.setItem("avis", JSON.stringify(avisCollection));

                //On reload le tableau pour qu'il affiche la modification
                reloadAvis()

                //On clean le formulaire et on remet à null l'index et l'objet sélectionné
                addAvisForm.reset()
                indexAvisSelected = null
                avisSelected = null

                //On modifie le titre du formulaire
                titleFormAvis.textContent = "Ajouter un avis"

            }
        }




        event.preventDefault();
    })

    //Déclaration de la méthode modifFormEdit
    modifFormEdit = (element) => {
        //On va placer un index et objet avis sélectioné
        let idAvis = element.parentNode.parentNode.parentNode.id.split("-")[1]
        indexAvisSelected = idAvis - 1;
        avisSelected = avisCollection[indexAvisSelected];

        //On modifie le titre du formulaire
        titleFormAvis.textContent = "Modification de l'avis"

        //On met les valeurs de l'avis dans les champs correspondants
        qualiteAvis.value = avisSelected.qualite
        textAvis.value = avisSelected.text

    }

    //Déclaration de la méthode removeBook
    removeAvis = (element) => {
        if (confirm("Voulez-vous réellement supprimer cet avis ?")) {

            let idAvis = element.parentNode.parentNode.parentNode.id.split("-")[1]
            let index = idAvis - 1;

            if (avisCollection.length > 1) {
                avisCollection.splice(index, 1)
            } else {
                avisCollection = []
            }
            localStorage.setItem("avis", JSON.stringify(avisCollection));

            //On reload le tableau pour qu'il affiche la modification
            reloadAvis()
        }

    }

}