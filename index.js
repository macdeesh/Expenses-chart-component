
function getData() {
    fetch("./data.json")
        .then((response) => {
            return response.json();
        })
        .then((dataExpenses) => {
            weekValue(dataExpenses)  // this is the main function where we pass in the data
        })
        .catch((error) => console.log(error));
}

getData();

const spanAmount = document.querySelectorAll(".amount");
const spanGraphic = document.querySelectorAll(".graphic");
const total = document.querySelector(".total-week-expense");
const average = document.querySelector(".average");
const weekDays = document.querySelectorAll(".one-day");
const today = new Date(); // get the actual date 

function weekValue(dataExpenses) {

    let arrayOfAmounts = [];// empty array to store the daily expense.
    let arrayOfDays = [];//  empty array to store the weekdays. 
    let sumOfExpenses = 0;

    for (let i = 0; i < dataExpenses.length; i++) {
        arrayOfDays.push(dataExpenses[i].day);// add the day from data.
        arrayOfAmounts.push(dataExpenses[i].amount);// add the value of this day expense from data.
        sumOfExpenses += arrayOfAmounts[i]; // make the same of the expense values.
    }

    var averageSpend = sumOfExpenses / 7;// average daily spending.
    formatAmount(averageSpend, average);// this function from tipCalculator add formatted value of money to html text. 
    formatAmount(sumOfExpenses, total);// the variables are the amount we want to convert to $.00 and a const of class name.



    arrayOfDays.unshift(arrayOfDays.pop());// this method take the last item of array and make it the first
    // Using this to make the array formatted same as the order of new Date() method array
    var actualDay = arrayOfDays[today.getDay()];// Then using the actual day index to get the day name.

    for (let i = 0; i < spanGraphic.length; i++) {

        if (weekDays[i].innerText == actualDay)// this to change the color of the actual day in the graphic days
            spanGraphic[i].style.background = "var(--Cyan)";

        spanAmount[i].innerText = `$${dataExpenses[i].amount}`;// each amount for each day.
        spanGraphic[i].style.height = `${(dataExpenses[i].amount) / 5}rem`;// Style the graphic in relation with the value taken from the data.

    }

}

for (let i = 0; i < spanGraphic.length; i++) {// This hover effect a previous sibling that i couldn't make it with css.

    let hovering = spanAmount[i].style;// target every class style to change the hover state.

    spanGraphic[i].addEventListener("mouseenter", function () {
        hovering.opacity = "1";
    });

    spanGraphic[i].addEventListener("mouseout", function () {
        hovering.opacity = "0";
    });
}

function formatAmount(money, textClass) {// function i created i tipCalculator to make an amount formatted to dollar binary value.
    let formattedAmount = new Intl.NumberFormat("en-US", { style: 'currency', currency: 'USD' });
    return textClass.innerText = formattedAmount.format(money);
}
