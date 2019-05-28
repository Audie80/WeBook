{
    //On déclare nos variables
    let authorsDiv = document.querySelector("#authors")
    let addAuthorForm = document.querySelector("#addAuthorForm")
    let firstnameAuthor = document.querySelector("#firstnameAuthor")
    let birthdayAuthor = document.querySelector("#birthdayAuthor")
    let birthdayInvalidAuthor = document.querySelector("#birthdayInvalidAuthor")
    let lastnameAuthor = document.querySelector("#lastnameAuthor")
    let indexAuthorSelected = null
    let authorSelected = null
    let titleAvis = document.querySelector("#titleForm")
       

    //On créé une fonction pour ajouter au tableau
    let addAuthor = (author) => {
        let row = `
        <tr role="row" id="author-`+author.id+`">
        <td>
            <center>
              <span class='deleteAuthor' style="cursor:pointer;margin-right:10px"><i class="far fa-trash-alt"></i></span>
              <span class='editAuthor' style="cursor:pointer"><i class="far fa-edit"></i></span>
            </center></td>
        <td class="authorLink" style="cursor:pointer">`+author.id+`</td>
        <td class="authorLink" style="cursor:pointer">`+author.firstname+`</td>
        <td class="authorLink" style="cursor:pointer">`+author.lastname+`</td>
        <td class="authorLink" style="cursor:pointer">`+author.birthday+`</td>
        </tr>`;

        if(authorsCollection.length === 0){

            authorsDiv.innerHTML=row;
        }else{
            authorsDiv.innerHTML+=row;
        }
    }
    
    reloadAuthor = () => {

        //Ménage de la zone
        authorsDiv.innerHTML = '';
       
        //On ajoute un message si pas d'auteur disponible
        if(authorsCollection.length === 0){
            authorsDiv.innerHTML+=`
            <tr role="row">
            <td colspan="6"><center>Aucun auteur dans la base</center></td>
            </tr>`;
        }else{
            

            for(let i = 0;i<authorsCollection.length;i++){
                addAuthor(authorsCollection[i])
            }

            let editAuthor = document.querySelectorAll(".editAuthor")
            Array.from(editAuthor).forEach((element) => {
                element.addEventListener('click', (event) => {
                modifFormEdit(element)
                });
            });

            let deleteAuthor = document.querySelectorAll(".deleteAuthor")
            Array.from(deleteAuthor).forEach((element) => {
                element.addEventListener('click', (event) => {
                removeAuthor(element)
                });
            });

            let authorLink = document.querySelectorAll(".authorLink")
            Array.from(authorLink).forEach((element) => {
                element.addEventListener('click', (event) => {
                goToAuthorPage(element)
                });
            });
        }
    }

    reloadAuthor()

    let verifyBirthday = (birthday) => {

        let date = new Date(birthday)
        if(date.getFullYear() > 1900 && date.getFullYear() <= 2001){
            birthdayAuthor.style.border = "1px solid #d1d3e2";
            birthdayInvalidAuthor.style.display="none";
            birthdayInvalidAuthor.textContent=""
            birthday = date.toLocaleDateString();
            return birthday; 
        }else{
            birthdayAuthor.style.border = "1px solid red";
            birthdayInvalidAuthor.style.display="block";
            birthdayInvalidAuthor.textContent="Vous devez saisir une date valide entre 1900 et 2001"
            return false;
        }
       
    }

    //On ajoute un controle onBlur sur le champ birthday
    birthdayAuthor.addEventListener("blur",(event) => {
        verifyBirthday(birthdayAuthor.value)
    })
    

    //On ajoute au formulaire un évènement submit
    addAuthorForm.addEventListener("submit",(event) => {
        let author = {
            id:authorsCollection.length+1,
            firstname:firstnameAuthor.value,
            birthday:birthdayAuthor.value,
            lastname:lastnameAuthor.value
        } 
        
        author.birthday = verifyBirthday(author.birthday);

        if(author.birthday !== false && author.firstname !== '' && author.lastname !== ''){
            
            //Si pas d'auteur sélectionné, on est en ajout
            if(authorSelected === null && indexAuthorSelected === null){  
                    authorsCollection.push(author)    
                    localStorage.setItem("authors",JSON.stringify(authorsCollection));
                    reloadAuthor();
                    addAuthorForm.reset() 
            }else{
                //On modifie la valeur dans la collection et on la sauvegarde
                authorsCollection[indexAuthorSelected].firstname = firstnameAuthor.value;
                authorsCollection[indexAuthorSelected].lastname = lastnameAuthor.value;
                authorsCollection[indexAuthorSelected].birthday = birthdayAuthor.value;
                localStorage.setItem("authors",JSON.stringify(authorsCollection));

                //On reload le tableau pour qu'il affiche la modification
                reloadAuthor()

                //On clean le formulaire et on remet à null l'index et l'objet sélectionné
                addAuthorForm.reset()
                indexAuthorSelected = null
                authorSelected = null

                //On modifie le titre du formulaire
                titleAvis.textContent = "Ajouter un auteur"

            }
        }
       
        
        
        event.preventDefault();
    })

    //Déclaration de la méthode modifFormEdit
    modifFormEdit = (element) => {
        //On va placer un index et objet author sélectioné
        let idAuthor = element.parentNode.parentNode.parentNode.id.split("-")[1]
        indexAuthorSelected = idAuthor-1;
        authorSelected = authorsCollection[indexAuthorSelected];
       
        //On modifie le titre du formulaire
        titleAvis.textContent = "Modification de l'auteur"

        //On met le nom de l'auteur dans le champ firstnameAuthor
        firstnameAuthor.value=authorSelected.firstname
        lastnameAuthor.value=authorSelected.lastname
        birthdayAuthor.value=authorSelected.birthday

    }

    //Déclaration de la méthode removeAuthor
    removeAuthor = (element) => {
        if ( confirm( "Voulez-vous réellement supprimer cet auteur ?" ) ) {
    
            let idAuthor = element.parentNode.parentNode.parentNode.id.split("-")[1]
            let index = idAuthor-1;
            
            if(authorsCollection.length > 1){
                authorsCollection.splice(index,1)
            }else{
                authorsCollection = []
            }
            localStorage.setItem("authors",JSON.stringify(authorsCollection));
        
            //On reload le tableau pour qu'il affiche la modification
            reloadAuthor()
        }
       
    }
    
    let goToAuthorPage = (element) => {
        let idAuthor = element.parentNode.id.split("-")[1]
        let index = idAuthor-1;
        
        //On enregistre l'author sélectionné dans le localStorage
        localStorage.setItem("author",JSON.stringify(authorsCollection[index]));
        //On fait un redirect sur la page author
        document.location = '/author.html'

            
    }

}