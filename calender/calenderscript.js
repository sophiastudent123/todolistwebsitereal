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
    month_picker.innerHTML = month_names[month]
    calender_header_year.innerHTML = year
    let first_day = new Date (year, month)

    for (let i =0; i<=days_of_month[month]+first_day.getDay()-1; i++){
        let day = document.createElement('div')

        if (i >= first_day.getDay()){
            day.innerHTML = i - first_day.getDay() + 1
            if (i - first_day.getDay() + 1){//1930

            }
        }

    }
}