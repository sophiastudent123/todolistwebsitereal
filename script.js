
const itemlist = document.getElementById("listitems")
let userinput = document.getElementById("userinput")
let listContainer = document.getElementById("listcontainer")

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
        if (menuchoice!==""){
            itemTitle = document.createElement('h3')
            itemTitle.id = 'itemtitle'
            itemTitle.textContent = menuchoice;
            
            

        }
        
        
       
        
         itemlist.appendChild(item)
       
        let deleteButton = document.createElement("button")
        deleteButton.id = "deletebutton"
        deleteButton.innerHTML = ("delete")
       item.appendChild(itemTitle)
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
       parent.parentElement.remove()
       
     saveData(); // Update localStorage after removal
    }
});


function saveData() {
    localStorage.setItem("data",itemlist.innerHTML)
}
function loadData(){
    itemlist.innerHTML = localStorage.getItem('data')
}
loadData()
const addButton = document.getElementById('addButton')
addButton.addEventListener('click',()=>{
    addTask()
} )

////dropdown menu

const dropButton = document.getElementById('menubutton')
const menucontent = document.getElementsByClassName('menuchoices')
let menuchoice = "";
Array.from(menucontent).forEach(element => {
    // Add click event listener to each element
    element.addEventListener('click', ()=>{
        menuchoice = element.innerHTML
        dropButton.innerHTML=menuchoice
    }
    );
});


