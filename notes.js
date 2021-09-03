var addNoteBtn=document.getElementById("addNoteButton");
// var  deletNoteBtn=document.querySelector("#delete");

var notes=[];
var backgroundColors=['#DB4437','#F4B400','#0F9D58','#4285F4']

function displayNotes(){
        note=notes[notes.length-1]
        let card = document.createElement("div");
        card.setAttribute("class","card");
        color=backgroundColors[note.id%4];
        card.setAttribute("style",`background-color:${color};color:white;`);
        let title = document.createElement("input");
        title.setAttribute("class","cardTitle");
        // title.setAttribute("style","color:white;");
        title.setAttribute("style",`background-color:${color};color:white;`);
        title.value=note.title;

        let cardBody = document.createElement("textarea");
        cardBody.setAttribute("class","cardBody");
        cardBody.setAttribute("style",`background-color:${color};color:white;`);
        cardBody.textContent=note.note;

        let deleteButton=document.createElement("button");
        deleteButton.setAttribute("class","deleteNote");
        deleteButton.setAttribute("style",`color:${color}`);
        deleteButton.setAttribute("id","delete");
        deleteButton.innerHTML = `<i class="fa fa-trash-o" id=${note.id} aria-hidden="true"></i>`;

        card.appendChild(title);
        card.appendChild(cardBody);
        card.appendChild(deleteButton);

        let container = document.querySelector("#cards");
        container.appendChild(card);
    };

function addNote(){
    var title=document.getElementById("addTitle").value;
    var body=document.getElementById("addBody").value;
    if(title!=="" && body!=="")
    {    
        var note={
        id:notes.length,
        title:title,
        note:body,
        }
    notes.push(note);
    document.getElementById("addTitle").value="";
    document.getElementById("addBody").value="";
    displayNotes();
    }
}

// function deleteNote(id){
//     alert("ID Clicked:"+id);
// }

addNoteBtn.addEventListener("click" , function(){
    addNote();
})

// deletNoteBtn.addEventListener("click" , function(){
//     var id=this.id;
//     console.log(id);
//     deleteNote(id);
// })

