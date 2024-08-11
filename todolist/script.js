
const itemlist = document.getElementById("listitems")
let userinput = document.getElementById("userinput")
let listContainer = document.getElementById("listcontainer")
let date = document.getElementById('date')
let dateInput = date.value


function addTask(){
   
   let item = document.createElement('div')
    console.log("working")
    let inputValue = userinput.value;
    console.log(inputValue);
  if (userinput.value === ''){
        alert("You must write something!")
    }
    else {
        let itemTitle = ''
        let li =document.createElement("li");
       li.innerHTML = userinput.value

        if (dateEntered!==""){
            itemTitle = document.createElement('h3')
            itemTitle.id = 'itemtitle'
            itemTitle.textContent = dateEntered;
            item.appendChild(itemTitle)
            

        }
        localStorage.setItem(userinput.value,itemTitle.textContent)
         itemlist.appendChild(item)
       
        let deleteButton = document.createElement("button")
        deleteButton.id = "deletebutton"
        deleteButton.innerHTML = ("delete")
       
       item.appendChild(li)
       
        li.appendChild(deleteButton)
     
        
    }
    userinput.value = "";
saveData() 

}


listContainer.addEventListener('click', function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle('checked'); // Toggle class on click
     saveData();
    } else if (e.target.id === 'deletebutton') {
      let parent =   e.target.parentElement; // Remove list item

       localStorage.removeItem(parent.textContent.substring(0,parent.textContent.length-6))
      
       
        parent.parentElement.remove()
       //figure out how to get key from value
       
     saveData(); // Update localStorage after removal
    }
});


function saveData() {
    localStorage.setItem("data",itemlist.innerHTML)
}
function loadData(){
    itemlist.innerHTML = localStorage.getItem('data')
}
//localStorage.clear()
loadData()

const addButton = document.getElementById('addButton')
addButton.addEventListener('click',()=>{
    console.log(date.value)
    dateInput = date.value
    getDate()
    addTask()
} )

////date calender code 
let dateEntered = ""
let months = ["January", "Feburary", "March", "April", "May", "June", "July", "August",
     "September", "October", "November", "December"]
     let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
function getDate(){
   
    if (dateInput!==""){
        let dateObject = new Date(dateInput)
       let month= months[dateObject.getMonth()]
       let day = dateObject.getDate() + 1
       let dayOfWeek = daysOfWeek[dateObject.getDay()+1]
       dateEntered = dayOfWeek +" "+month+" "+day
       console.log(dateEntered)
    }
}






//