var searchButton=document.getElementById("searchButton");

var url="https://api.dictionaryapi.dev/api/v2/entries/en/"
var error={};
var dictionaryResult=[];

var backgroundColors=['#0F9D58','#F4B400','#4285F4','#DB4437'];

function getMeaning(inputWord)
{
    document.getElementById("searchBar").value="";
    return url+inputWord
}
function displayCards(){
    let container = document.querySelector("#cards");
    container.innerHTML="";
    let card;
    var index=0;
    dictionaryResult.forEach(dictionaryELem=>{
         card = document.createElement("div");
         card.setAttribute("class","card");
         color=backgroundColors[index++];
         card.setAttribute("style",`background-color:${color};color:white;`);

         let title = document.createElement("p");
         title.setAttribute("class","cardTitle");
         title.setAttribute("style",`background-color:${color};color:white;`);
         if(dictionaryELem.word)
         title.innerHTML=dictionaryELem.word;

         let phonetic = document.createElement("p");
         phonetic.setAttribute("class","cardBody");
         phonetic.setAttribute("style",`background-color:${color};color:white;`);
         if(dictionaryELem.phonetic)
         phonetic.innerHTML=dictionaryELem.phonetic;

         let origin = document.createElement("p");
         origin.setAttribute("class","cardBody");
         origin.setAttribute("style",`background-color:${color};color:white;`);
         if(dictionaryELem.origin)
         origin.innerHTML="origin : "+dictionaryELem.origin;

        //  let cardBody = document.createElement("textarea");
        //  cardBody.setAttribute("class","cardBody");
        //  cardBody.setAttribute("style",`background-color:${color};color:white;`);
        //  cardBody.textContent=note.note;

        card.appendChild(title);
        card.appendChild(phonetic);
        card.appendChild(origin);

        let meanings = document.createElement("ul");
        card.appendChild(meanings);
        dictionaryELem.meanings.map(meaning=>{
            let meaningPOS=document.createElement("ol");
            meaningPOS.setAttribute("class","cardBody");
            meaningPOS.setAttribute("style",`background-color:${color};color:white;`);
            meaningPOS.innerHTML="part of speech : "+meaning.partOfSpeech
            card.appendChild(meaningPOS);
            var indexMeaning=1;
            meaning.definitions.map(defination=>{
                let definations=document.createElement("li");
                definations.setAttribute("class","cardBody");
                definations.setAttribute("style",`background-color:${color};color:white;`);
                definations.innerHTML=(indexMeaning++)+" . "+defination.definition;
                card.appendChild(definations);
            })

        })

        let pronounciation=document.createElement("audio");
        var audioFile=dictionaryELem.phonetics[0].audio;
        audioFile="https:"+audioFile;
        pronounciation.setAttribute("src" , audioFile);
        card.appendChild(pronounciation);

        if(dictionaryELem.phonetics[0].audio)
        {    
        let playButton=document.createElement("button");
        playButton.setAttribute("class","playButton");
        playButton.setAttribute("style",`color:${color}`);
        playButton.innerHTML = `<i class="fas fa-volume-up"></i>`;
        card.appendChild(playButton);

        playButton.addEventListener("click" , function(){
            pronounciation.play();
        })
        }

        container.appendChild(card);
    })
    index=0;
    dictionaryResult=[];
}
function displayErrorCard(){
    let container = document.querySelector("#cards");
    container.innerHTML="";
    let card;
    card = document.createElement("div");
    card.setAttribute("class","card");
    color=backgroundColors[3];
    card.setAttribute("style",`background-color:${color};color:white;`);

    let title = document.createElement("p");
    title.setAttribute("class","cardTitle");
    title.setAttribute("style",`background-color:${color};color:white;`);
    title.innerHTML=error.title;

    let message = document.createElement("p");
    message.setAttribute("class","cardBody");
    message.setAttribute("style",`background-color:${color};color:white;`);
    message.innerHTML=error.message;

    let resolution = document.createElement("p");
    resolution.setAttribute("class","cardBody");
    resolution.setAttribute("style",`background-color:${color};color:white;`);
    resolution.innerHTML=error.resolution;

    card.appendChild(title);
    card.appendChild(message);
    card.appendChild(resolution);

    container.appendChild(card);

}
function search(){
    var searchInput=document.getElementById("searchBar").value;
    fetch(getMeaning(searchInput))
    .then(response=>response.json())
    .then(result=>{
        if (result.title==="No Definitions Found") 
        {
        error=result;
        displayErrorCard();
        }
        else {
        dictionaryResult=result;
        displayCards()
        }
        
    })

    
}

searchButton.addEventListener("click" , function(){
    search()
})