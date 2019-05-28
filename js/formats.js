{
    //On déclare nos variables
    let formatsDiv = document.querySelector("#formats")
    let addFormatForm = document.querySelector("#addFormatForm")
    let nameFormat = document.querySelector("#nameFormat")
    let indexFormatSelected = null
    let formatSelected = null
    let titleAvis = document.querySelector("#titleForm")
       


    //On créé une fonction pour ajouter au tableau
    let addFormat = (format) => {
        let row = `
        <tr role="row" id="format-`+format.id+`">
        <td>
            <center>
              <span class='deleteFormat' style="cursor:pointer;margin-right:10px"><i class="far fa-trash-alt"></i></span>
              <span class='editFormat' style="cursor:pointer"><i class="far fa-edit"></i></span>
            </center></td>
        <td>`+format.id+`</td>
        <td>`+format.name+`</td>
        </tr>`;

        if(formatsCollection.length === 0){

            formatsDiv.innerHTML=row;
        }else{
            formatsDiv.innerHTML+=row;
        }
    }
    
    reloadFormat = () => {

        //Ménage de la zone
        formatsDiv.innerHTML = '';
       
        //On ajoute un message si pas de format disponible
        if(formatsCollection.length === 0){
            formatsDiv.innerHTML+=`
            <tr role="row">
            <td colspan="3"><center>Pas de formats</center></td>
            </tr>`;
        }else{
            

            for(let i = 0;i<formatsCollection.length;i++){
                addFormat(formatsCollection[i])
            }

            let editFormat = document.querySelectorAll(".editFormat")
            Array.from(editFormat).forEach((element) => {
                element.addEventListener('click', (event) => {
                modifFormEdit(element)
                });
            });

            let deleteFormat = document.querySelectorAll(".deleteFormat")
            Array.from(deleteFormat).forEach((element) => {
                element.addEventListener('click', (event) => {
                removeFormat(element)
                });
            });
        }
    }

    reloadFormat()
    

    //On ajoute au formulaire un évènement submit
    addFormatForm.addEventListener("submit",(event) => {

        //Si pas de format sélectionné, on est en ajout
        if(formatSelected === null && indexFormatSelected === null){
            let format = {
                id:formatsCollection.length+1,
                name:nameFormat.value
            }  
            
            if(format.name !== ""){  
                formatsCollection.push(format)    
                localStorage.setItem("formats",JSON.stringify(formatsCollection));
                reloadFormat();
                addFormatForm.reset()
              
            }
        }else{
            //On modifie la valeur dans la collection et on la sauvegarde
            formatsCollection[indexFormatSelected].name = nameFormat.value;
            localStorage.setItem("formats",JSON.stringify(formatsCollection));

            //On reload le tableau pour qu'il affiche la modification
            reloadFormat()

            //On clean le formulaire et on remet à null l'index et l'objet sélectionné
            addFormatForm.reset()
            indexFormatSelected = null
            formatSelected = null

            //On modifie le titre du formulaire
            titleAvis.textContent = "Ajouter un format"

        }

       
        
        
        event.preventDefault();
    })

    //Déclaration de la méthode modifFormEdit
    modifFormEdit = (element) => {
        //On va placer un index et objet format sélectioné
        let idFormat = element.parentNode.parentNode.parentNode.id.split("-")[1]
        indexFormatSelected = idFormat-1;
        formatSelected = formatsCollection[indexFormatSelected];
       
        //On modifie le titre du formulaire
        titleAvis.textContent = "Modification du format"

        //On met le nom du format dans le champ nameFormat
        nameFormat.value=formatSelected.name




    }

    //Déclaration de la méthode removeFormat
    removeFormat = (element) => {
        if ( confirm( "Voulez-vous réellement supprimer ce format ?" ) ) {
    
            let idFormat = element.parentNode.parentNode.parentNode.id.split("-")[1]
            let index = idFormat-1;
            
            if(formatsCollection.length > 1){
                formatsCollection.splice(index,1)
            }else{
                formatsCollection = []
            }
            localStorage.setItem("formats",JSON.stringify(formatsCollection));
        
            //On reload le tableau pour qu'il affiche la modification
            reloadFormat()
        }
       
    }
    
    


}