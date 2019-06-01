{
    //On déclare nos variables
    let genresDiv = document.querySelector("#genres")
    let addGenreForm = document.querySelector("#addGenreForm")
    let nameGenre = document.querySelector("#nameGenre")
    let indexGenreSelected = null
    let genreSelected = null
    let titleAvis = document.querySelector("#titleForm")
       


    //On créé une fonction pour ajouter au tableau
    let addGenre = (genre) => {
        let row = `
        <tr role="row" id="genre-`+genre.id+`">
        <td>
            <center>
              <span class='deleteGenre' style="cursor:pointer;margin-right:10px"><i class="far fa-trash-alt"></i></span>
              <span class='editGenre' style="cursor:pointer"><i class="far fa-edit"></i></span>
            </center></td>
        <td>`+genre.name+`</td>
        </tr>`;

        if(genresCollection.length === 0){

            genresDiv.innerHTML=row;
        }else{
            genresDiv.innerHTML+=row;
        }
    }
    
    reloadGenre = () => {

        //Ménage de la zone
        genresDiv.innerHTML = '';
       
        //On ajoute un message si pas de genre disponible
        if(genresCollection.length === 0){
            genresDiv.innerHTML+=`
            <tr role="row">
            <td colspan="3"><center>Pas de genres</center></td>
            </tr>`;
        }else{
            

            for(let i = 0;i<genresCollection.length;i++){
                addGenre(genresCollection[i])
            }

            let editGenre = document.querySelectorAll(".editGenre")
            Array.from(editGenre).forEach((element) => {
                element.addEventListener('click', (event) => {
                modifFormEdit(element)
                });
            });

            let deleteGenre = document.querySelectorAll(".deleteGenre")
            Array.from(deleteGenre).forEach((element) => {
                element.addEventListener('click', (event) => {
                removeGenre(element)
                });
            });
        }
    }

    reloadGenre()
    

    //On ajoute au formulaire un évènement submit
    addGenreForm.addEventListener("submit",(event) => {

        //Si pas de genre sélectionné, on est en ajout
        if(genreSelected === null && indexGenreSelected === null){
            let genre = {
                id:genresCollection.length+1,
                name:nameGenre.value
            }  
            
            if(genre.name !== ""){  
                genresCollection.push(genre)    
                localStorage.setItem("genres",JSON.stringify(genresCollection));
                reloadGenre();
                addGenreForm.reset()
              
            }
        }else{
            //On modifie la valeur dans la collection et on la sauvegarde
            genresCollection[indexGenreSelected].name = nameGenre.value;
            localStorage.setItem("genres",JSON.stringify(genresCollection));

            //On reload le tableau pour qu'il affiche la modification
            reloadGenre()

            //On clean le formulaire et on remet à null l'index et l'objet sélectionné
            addGenreForm.reset()
            indexGenreSelected = null
            genreSelected = null

            //On modifie le titre du formulaire
            titleAvis.textContent = "Ajouter un genre"

        }

       
        
        
        event.preventDefault();
    })

    //Déclaration de la méthode modifFormEdit
    modifFormEdit = (element) => {
        //On va placer un index et objet genre sélectioné
        let idGenre = element.parentNode.parentNode.parentNode.id.split("-")[1]
        indexGenreSelected = idGenre-1;
        genreSelected = genresCollection[indexGenreSelected];
       
        //On modifie le titre du formulaire
        titleAvis.textContent = "Modification du genre"

        //On met le nom du genre dans le champ nameGenre
        nameGenre.value=genreSelected.name




    }

    //Déclaration de la méthode removeGenre
    removeGenre = (element) => {
        if ( confirm( "Voulez-vous réellement supprimer ce genre ?" ) ) {
            let idGenre = element.parentNode.parentNode.parentNode.id.split("-")[1]
            let index = idGenre-1;
            
            if(genresCollection.length > 1){
                genresCollection.splice(index,1)
            }else{
                genresCollection = []
            }
            localStorage.setItem("genres",JSON.stringify(genresCollection));
        
            //On reload le tableau pour qu'il affiche la modification
            reloadGenre()

        }

       
    }
    
    


}