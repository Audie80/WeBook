{
    //On déclare nos variables
    let editorsDiv = document.querySelector("#editors")
    let addEditorForm = document.querySelector("#addEditorForm")
    let nameEditor = document.querySelector("#nameEditor")
    let creationEditor = document.querySelector("#creationEditor")
    let creationInvalidEditor = document.querySelector("#creationInvalidEditor")
    let codeEditor = document.querySelector("#codeEditor")
    let codeInvalidEditor = document.querySelector("#codeInvalidEditor")
    let indexEditorSelected = null
    let editorSelected = null
    let titleAvis = document.querySelector("#titleForm")
    let nbBooks = 0;
       

    //On créé une fonction pour ajouter au tableau
    let addEditor = (editor) => {
        let row = `
        <tr role="row" id="editor-`+editor.id+`">
        <td>
            <center>
              <span class='deleteEditor' style="cursor:pointer;margin-right:10px"><i class="far fa-trash-alt"></i></span>
              <span class='editEditor' style="cursor:pointer"><i class="far fa-edit"></i></span>
            </center></td>
        <td class="editorLink" style="cursor:pointer">`+editor.id+`</td>
        <td class="editorLink" style="cursor:pointer">`+editor.name+`</td>
        <td class="editorLink" style="cursor:pointer">`+editor.creation+`</td>
        <td class="editorLink" style="cursor:pointer">`+editor.code+`</td>
        <td class="editorLink" style="cursor:pointer">`+ editor.nbBooks +`</td>
        </tr>`;

        if(editorsCollection.length === 0){

            editorsDiv.innerHTML=row;
        }else{
            editorsDiv.innerHTML+=row;
        }
    }
    
    reloadEditor = () => {

        //Ménage de la zone
        editorsDiv.innerHTML = '';
       
        //On ajoute un message si pas d'éditeur disponible
        if(editorsCollection.length === 0){
            editorsDiv.innerHTML+=`
            <tr role="row">
            <td colspan="6"><center>Aucun éditeur dans la base</center></td>
            </tr>`;
        }else{
            
            let books = JSON.parse(localStorage.getItem("books"));
            for(let i = 0;i<editorsCollection.length;i++){
                    //Calcule le nombre de livres par éditeur
                    for (j = 0; j < books.length; j++) {
                        if (books[j].editor.name === editorsCollection[i].name) {
                            
                            nbBooks++;
                        }
                        editorsCollection[i].nbBooks = nbBooks;
                        localStorage.setItem("editors", JSON.stringify(editorsCollection));
                        
                    }
                nbBooks = 0;
                addEditor(editorsCollection[i])
            }

            let editEditor = document.querySelectorAll(".editEditor")
            Array.from(editEditor).forEach((element) => {
                element.addEventListener('click', (event) => {
                modifFormEdit(element)
                });
            });

            let deleteEditor = document.querySelectorAll(".deleteEditor")
            Array.from(deleteEditor).forEach((element) => {
                element.addEventListener('click', (event) => {
                removeEditor(element)
                });
            });

            let editorLink = document.querySelectorAll(".editorLink")
            Array.from(editorLink).forEach((element) => {
                element.addEventListener('click', (event) => {
                    goToEditorPage(element)
                });
            });
        }
    }

    reloadEditor()

    //On créé une fonction qui va vérifier un code 
    let verifyCode = (code) => {
        if(code !== '' && parseInt(code.substr(0,4)) === 9782 && code.length === 7){
            codeEditor.style.border = "1px solid #d1d3e2";
            codeInvalidEditor.style.display="none";
            codeInvalidEditor.textContent=""
            return true;
     
        }else{
            codeEditor.style.border = "1px solid red"; 
            codeInvalidEditor.style.display="block";
            codeInvalidEditor.textContent="Vous devez saisir un code valide commençant par 9782 et comportant 7 chiffres"
            return false;
        }
    }

    let verifyCreation = (creation) => {
        if(parseInt(creation) >= 1700 && parseInt(creation) <= 2019 && creation.length === 4){
            passCreation = true;
            creationEditor.style.border = "1px solid #d1d3e2";
            creationInvalidEditor.style.display="none";
            creationInvalidEditor.textContent=""
            return true;

        }else{
            passCreation = false;
            creationEditor.style.border = "1px solid red";
            creationInvalidEditor.style.display="block";
            creationInvalidEditor.textContent="Vous devez saisir une date valide entre 1700 et 2019"
            return false;
        }
    }

    //On ajoute un controle onBlur sur les 2 champs
    codeEditor.addEventListener("blur",(event) => {
        verifyCode(codeEditor.value)
    })
    creationEditor.addEventListener("blur",(event) => {
        verifyCreation(creationEditor.value)
    })
    

    //On ajoute au formulaire un évènement submit
    addEditorForm.addEventListener("submit",(event) => {
        let editor = {
            id:editorsCollection.length+1,
            name:nameEditor.value,
            creation:creationEditor.value,
            code:codeEditor.value,
            nbBooks: nbBooks
        } 
        
        if(verifyCode(editor.code) === true && verifyCreation(editor.creation) && editor.name !== ''){
            
            //Si pas d'éditeur sélectionné, on est en ajout
            if(editorSelected === null && indexEditorSelected === null){  
                    editorsCollection.push(editor)    
                    localStorage.setItem("editors",JSON.stringify(editorsCollection));
                    reloadEditor();
                    addEditorForm.reset() 
            }else{
                //On modifie la valeur dans la collection et on la sauvegarde
                editorsCollection[indexEditorSelected].name = nameEditor.value;
                editorsCollection[indexEditorSelected].code = codeEditor.value;
                editorsCollection[indexEditorSelected].creation = creationEditor.value;
                localStorage.setItem("editors",JSON.stringify(editorsCollection));

                //On reload le tableau pour qu'il affiche la modification
                reloadEditor()

                //On clean le formulaire et on remet à null l'index et l'objet sélectionné
                addEditorForm.reset()
                indexEditorSelected = null
                editorSelected = null

                //On modifie le titre du formulaire
                titleAvis.textContent = "Ajouter un éditeur"

            }
        }
       
        
        
        event.preventDefault();
    })

    //Déclaration de la méthode modifFormEdit
    modifFormEdit = (element) => {
        //On va placer un index et objet editor sélectioné
        let idEditor = element.parentNode.parentNode.parentNode.id.split("-")[1]
        indexEditorSelected = idEditor-1;
        editorSelected = editorsCollection[indexEditorSelected];
       
        //On modifie le titre du formulaire
        titleAvis.textContent = "Modification de l'éditeur"

        //On met le nom de l'éditeur dans le champ nameEditor
        nameEditor.value=editorSelected.name
        codeEditor.value=editorSelected.code
        creationEditor.value=editorSelected.creation

    }

    //Déclaration de la méthode removeEditor
    removeEditor = (element) => {
        if ( confirm( "Voulez-vous réellement supprimer cet éditeur ?" ) ) {
    
            let idEditor = element.parentNode.parentNode.parentNode.id.split("-")[1]
            let index = idEditor-1;
            
            if(editorsCollection.length > 1){
                editorsCollection.splice(index,1)
            }else{
                editorsCollection = []
            }
            localStorage.setItem("editors",JSON.stringify(editorsCollection));
        
            //On reload le tableau pour qu'il affiche la modification
            reloadEditor()
        }
       
    }
    
    //Déclaration de la méthode linkToEditor
    let goToEditorPage = (element) => {
        let idEditor = element.parentNode.id.split("-")[1]
        let index = idEditor - 1;

        //On enregistre l'éditeur sélectionné dans le localStorage
        localStorage.setItem("editor", JSON.stringify(editorsCollection[index]));
        //On fait un redirect sur la page editor.html
        document.location = '/editor.html'
    }
    


}