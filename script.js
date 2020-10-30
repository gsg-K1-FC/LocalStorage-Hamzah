let storedNotes = JSON.parse(localStorage.getItem("notes"));
const list = document.getElementById("list");
let notes = storedNotes?storedNotes:[];
showNotes(); 

document.getElementById("add-btn").addEventListener("click",function(){
   const title = document.getElementById("title").value; 
   const description = document.getElementById("description").value;
   if(title===""){
       alert("please Enter a title");
   }else{
    notes.push({title: title,description: description});
    document.getElementById("title").value = ""; 
    document.getElementById("description").value = "";  
   }
   showNotes();
}); 


function showNotes(){
    list.innerHTML = "";
    // add the list title and sort button only if the list is not empty
    const listTitle = document.querySelector(".list-title");
    if(notes.length ===0){
        listTitle.classList.add("hide");
    }else{
        listTitle.classList.remove("hide"); 
    }
    notes.map(function(note,index){
        let listItem = document.createElement("li");
        //note title
        let divTitle = document.createElement("div"); 
        divTitle.textContent = note.title; 
        listItem.appendChild(divTitle);
        // note description 
        let divDescription = document.createElement("div"); 
        divDescription.textContent = note.description;
        listItem.appendChild(divDescription);

        //buttons container
        let buttonsDiv = document.createElement("div"); 
        listItem.appendChild(buttonsDiv); 
        // edit buttons
        let editNoteBtn = document.createElement("button"); 
        editNoteBtn.textContent = "Edit";
        editNoteBtn.classList.add("edit"); 
        //delete buttons 
        let deleteNoteBtn = document.createElement("button");
        deleteNoteBtn.classList.add("delete"); 
        let deleteButtonText = document.createTextNode("Delete");
        deleteNoteBtn.appendChild(deleteButtonText); 

        //adding the buttons to their container 
        buttonsDiv.appendChild(deleteNoteBtn); 
        buttonsDiv.appendChild(editNoteBtn);

        // add buttons container to the li 
        listItem.appendChild(buttonsDiv); 

        
        // add event listener to the delete button
        deleteNoteBtn.addEventListener("click",function(){
            let confirmationResult = confirm("Are you sure you want to delete this note?"); 
            if(confirmationResult){
                notes.splice(index,1); 
                showNotes();
            }
        });
        // add event listener to the edit button
        editNoteBtn.addEventListener("click",function(){
            // add classes to change the border and background according to the button state (edit/confirm edit)
            this.classList.toggle("confirm");
            this.classList.toggle("edit");
            // determine the text inside the button 
            if(this.textContent ==="Edit"){
                this.textContent = "Confirm";
            }else{
                this.textContent = "Edit"; 
            }

            if(this.classList.contains("confirm")){
                const form = createForm(note.title,note.description,index);
                listItem.removeChild(divTitle);
                listItem.removeChild(divDescription); 
                listItem.insertBefore(form,listItem.lastChild);
            }else{
                const editedTitle = document.querySelector(".edit-form .title"+index).value; 
                const editedDescription = document.querySelector(".edit-form .description"+index).value;
                notes.splice(index,1,{title:editedTitle,description:editedDescription}); 
                showNotes();
            }
        });
        list.appendChild(listItem);
    });
    localStorage.setItem("notes",JSON.stringify(notes));
}
// create the form that will appear when editing
function createForm(titleContent,descriptionContent,index){
    const form = document.createElement("form");
    form.classList.add("edit-form"); 

    const editTitle = document.createElement("input");
    editTitle.classList.add("title");
    editTitle.classList.add("title"+index);
    editTitle.value = titleContent; 

    const editDescription = document.createElement("textarea"); 
    editDescription.classList.add("description"+index);
    editDescription.rows = "8"; 
    editDescription.cols = "60";
    editDescription.value = descriptionContent;

    form.appendChild(editTitle); 
    form.appendChild(editDescription); 
    
    return form; 
}


// function to sort notes array elements depending on the title 
function sortElements(){
    notes.sort(function(a,b){
        let compareValue = 0;
        a.title<b.title? compareValue = -1 : compareValue = 1; 
        return compareValue;
    });
}

// add event listener to the sort button
document.querySelector(".sort").addEventListener("click",function(){
    sortElements(); 
    showNotes(); 
}); 



