// make array for all reminders

const reminders = []

for (let i =0; i<localStorage.length; i++){
    if (localStorage.key(i)==='data'){
        continue;
    }
    else {
        const item = localStorage.key(i)
        const date = localStorage.getItem(item)
        const itemObject = {
            item: item,
            date: date
        }
        reminders.push(itemObject)
    }
}



//check if leap year
const isLeapYear  = (year) => {
    return (
        (year % 4 === 0 && year % 100 !==0 && year % 400 !== 0)||
        (year % 100 === 0 && year % 400 === 0) 
    );
};

const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28;
}

let calender = document.querySelector('.calender')
const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

let month_picker = document.querySelector('#month-picker')
let dayTextFormate = document.querySelector('.day-text-formate')
let timeFormate = document.querySelector('time-formate')
let dateFormate = document.querySelector('.date-formate')

month_picker.onclick = () => {
    month_list.classList.remove('hideonce')
    month_list.classList.remove('hide')
    month_list.classList.add('show')
    dayTextFormate.classList.remove('showtime')
    dayTextFormate.classList.add('hidetime')
    timeFormate.classList.remove('showtime')
    timeFormate.classList.add('hideTime')
    dateFormate.classList.remove('showtime')
    dateFormate.classList.add('hideTime')
}

const generateCalender = (month, year) => {
    let calender_days = document.querySelector('.calender-days')
    calender_days.innerHTML = ""
    let calender_header_year = document.querySelector('#year')
    let days_of_month = [
        31, 
        getFebDays(year),
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
    ];
    let currentDate = new Date()
    month_picker.innerHTML = monthNames[month]
    calender_header_year.innerHTML = year
    let first_day = new Date (year, month)

    for (let i =0; i<=days_of_month[month]+first_day.getDay()-1; i++){
        let day = document.createElement('div')
        
        if (i >= first_day.getDay()){
            day.innerHTML = i - first_day.getDay() + 1
            if (day)
            if (i - first_day.getDay() + 1 === currentDate.getDate() && year === currentDate.getFullYear()
            && month=== currentDate.getMonth()){
            day.classList.add('current-date')
            }
        }

        calender_days.appendChild(day)

    }
}

let month_list = calender.querySelector('.month-list')
monthNames.forEach((e, index) => {
    let month = document.createElement('div')
    month.innerHTML = `<div>${e}</div>`
    month_list.append(month)
    month.onclick = () => {
        currentMonth.value = index
        generateCalender(currentMonth.value, currentYear.value)
        month_list.classList.replace('show', 'hide')
        dayTextFormate.classList.remove('hideTime')
        dayTextFormate.classList.add('showtime')
        timeFormate.classList.remove('hideTime')
        timeFormate.classList.add('showtime')
        dateFormate.classList.remove('hideTime')
        dateFormate.classList.add('showtime')
    }
});

(function (){
    month_list.classList.add('hideonce')
})()
document.querySelector('#pre-year').onclick = () => {
    --currentYear.value
    generateCalender(currentMonth.value, currentYear.value)
}
document.querySelector('#next-year').onclick = () => {
    ++currentYear.value
    generateCalender(currentMonth.value, currentYear.value)
}

let currentDate = new Date()
let currentMonth = {value: currentDate.getMonth()}
let currentYear = {value: currentDate.getFullYear()}
generateCalender(currentMonth.value, currentYear.value)

const todayShowTime = document.querySelector('.time-formate')
const todayShowDate = document.querySelector('.date-formate')

const currshowDate = new Date()
const showCurrentDateOption = {
    year : 'numeric',
    month: 'long',
    day: 'numeric',
    weekDay: 'long',
}

 
function updateTime (){
    const currentDateFormate = new Intl.DateTimeFormat (
    'en-US',
    showCurrentDateOption
).format(currshowDate)
todayShowDate.textContent = currentDateFormate
setInterval(()=> {
    const timer = new Date()
    const option = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    }
    const formateTimer = new Intl.DateTimeFormat('en-us',option).format(timer)
    let time = `${`${timer.getHours()}`.padStart(
        2,
        '0'
    )}:${`${timer.getMinutes()}`.padStart(
        2,
        '0'
    )}:${`${timer.getSeconds()}`.padStart(2, '0')}`
    todayShowTime.textContent = formateTimer
}, 1000)
}

updateTime()

let calender_days = document.querySelector('.calender-days')


let dayPicked
calender_days.addEventListener('click',function(e){
    if (e.target.tagName ==="DIV"){
        let day = e.target.innerHTML
        console.log(day)
        if (day>=0 && day<=31){
            dayPicked = day
            getItemForDay(dayPicked)
        }
        const elements = document.getElementsByClassName('date-time-formate');
        for (const element of elements) {
            element.classList.toggle('hide');
        }
        remindersList.classList.toggle('hide')
       if (remindersList.classList.contains('hide')){
        clearReminders()
       }
        console.log(dayPicked)
        
    }
})

//make function so when we get day we choose the right item
let remindersList = document.getElementById('reminders')
function getItemForDay(day){
    let found = false
    for (let i = 0; i<reminders.length; i++){
       
        let reminderObject = reminders[i].date
        let reminderDateText= reminderObject.split(' ')
        console.log(monthNames[currentMonth.value])
        if (reminderDateText[2]===day && reminderDateText[1]===monthNames[currentMonth.value]){
            let toDoList = document.createElement('li')
            toDoList.innerHTML = reminders[i].item
            remindersList.appendChild(toDoList)
            console.log(toDoList.innerHTML)
            found = true
        }
        
    }

    if (found===false){
        let toDoList = document.createElement('li')
        toDoList.innerHTML = 'no reminders!'
        remindersList.appendChild(toDoList)
    }
  
}
function clearReminders(){
    while (remindersList.firstChild){
        remindersList.removeChild(remindersList.firstChild)
    }
}


