var addReminderButton=document.getElementById("addReminderButton");
var reminders=[];
var backgroundColors=['#4285F4','#DB4437','#F4B400','#0F9D58'];
var sound = new Audio("https://www.freespecialeffects.co.uk/soundfx/computers/pop1.wav");

function convertNowToTimeDateLocal(){
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().substring(0, (now.toISOString().indexOf("T")|0) + 6|0);
}

function notify(){
reminders.forEach(reminder=>{
    if(reminder.time===convertNowToTimeDateLocal())
    {
        if(Notification.permission==="granted")
        {
        showNotification(reminder);
        sound.play();
        }
        else if(Notification.permission==="denied" || Notification.permission==="default"){
        Notification.requestPermission().then(function (permission){
        if(permission==="granted")
        {
        showNotification(reminder);
        sound.play();
        }
        })
        }
    }
})

}

window.addEventListener('load', () => {
    document.getElementById('reminderTime').value = convertNowToTimeDateLocal();
    setInterval(function(){
        notify()
    }, 30000)
  });


function displayReminders(){
    // let container = document.querySelector("#cards");
    // container.innerHTML="";
    let card;
    
    // reminders.forEach(reminder=>{
    reminder=reminders[reminders.length-1];
    card = document.createElement("div");
    card.setAttribute("class","card");
    color=backgroundColors[reminder.id%4];
    card.setAttribute("style",`background-color:${color};color:white;`);
    let title = document.createElement("p");
    title.setAttribute("class","cardTitle");
    // title.setAttribute("style","color:white;");
    title.setAttribute("style",`background-color:${color};color:white;`);
    title.innerHTML=reminder.title;

    // let cardBody = document.createElement("div");
    // cardBody.setAttribute("class","cardBody");
    // cardBody.setAttribute("style",`background-color:${color};color:white;`);
    // if(reminder.completed)
    // cardBody.innerHTML=" Completed : Yes";
    // else
    // cardBody.innerHTML=" Completed : Not Yet";

    // let buttonGroup=document.createElement("div");
    // buttonGroup.setAttribute("class", "buttonGroup");


    let deleteButton=document.createElement("button");
    deleteButton.setAttribute("class","deleteReminder");
    deleteButton.setAttribute("style",`color:${color}`);
    deleteButton.setAttribute("id",`${reminder.id}`);
    deleteButton.innerHTML = `<i class="fa fa-trash-o" aria-hidden="true"></i>`;

    // let completedButton=document.createElement("button");
    // completedButton.setAttribute("class","completedButton");
    // completedButton.setAttribute("style",`color:${color}`);
    // completedButton.setAttribute("id",`${reminder.id}`);
    // completedButton.innerHTML = `<i class="far fa-check-square" aria-hidden="true"></i>`;

    // buttonGroup.appendChild(deleteButton);
    // buttonGroup.appendChild(completedButton);

    card.appendChild(title);
    // card.appendChild(cardBody);
    card.appendChild(deleteButton);

    let container = document.querySelector("#cards");
    container.appendChild(card);

    deleteButton.addEventListener("click" , function(){
        var id=this.id;
        container.removeChild(card);
        if(reminders.length>1)
        reminders.splice(id,1)
        else
        reminders.pop();
        })
    
        // completedButton.addEventListener("click" , function(){
        // var id=this.id;
        // console.log(id);
        // reminders[id].completed=(!reminders[id].completed);
        // displayReminders();
        // })

// })
}
function addReminder(){
    var reminderTitle=document.getElementById("addReminder").value;
    var reminderTime=document.getElementById("reminderTime").value;
    var meetingLink=document.getElementById("addLink").value;
    if(reminderTitle!=="" && reminderTime!=="")
    {    
        var reminder={
        id:reminders.length,
        title:reminderTitle,
        meetingLink:meetingLink,
        time:reminderTime
        }
        reminders.push(reminder);
        displayReminders();
        document.getElementById("addReminder").value="";
        document.getElementById("addLink").value="";
        document.getElementById("reminderTime").value=convertNowToTimeDateLocal();
    }
}

addReminderButton.addEventListener("click" , function(){
    addReminder();
})

function showNotification(reminder){
    let notif=new Notification(`${reminder.title}`,{
        // body:,
        icon:"/assets/logo.png"
    });
        
    notif.onclick=(e)=>{
        if(reminder.meetingLink!=="")
        { 
            window.open(`${reminder.meetingLink}`);
        }
        
    }
}

