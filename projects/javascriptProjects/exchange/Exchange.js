//הגדרת מיקומים
const coin1select = document.querySelector('#coin1select');
const coin2select = document.querySelector('#coin2select');
const convertBtn = document.querySelector('#convertBtn');
const resulteOfConvert = document.querySelector('#resulteOfConvert');
const howMuch = document.querySelector('#howMuch');

//הגדרת משתנים
let coins;
let coin1;
let coin2;

let coinSymbol = {
    USD: '&#x24;',
    EUR: '&#x20AC;',
    GBP: '&#xA3;',
    JPY: '&#xA5;',
    ILS: '&#x20AA;',
    THB: '&#x0E3F;'
}

//משיכת מידע
let oReq = new XMLHttpRequest();
oReq.addEventListener("load", function () { console.log(JSON.parse(this.responseText)); coins = JSON.parse(this.responseText); });
oReq.open("GET", "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_5QjHOFM27AA4XoyRL2SEsP3FfQzbVFk8H4QaMMsO");
oReq.send();

//הגדרת מטבע מקור
coin1select.addEventListener('change', () => {
    coin1 = coin1select.value;
    console.log("Selected first currency:", coin1);
})

//הגדרת מטבע אליו ממירים
coin2select.addEventListener('change', () => {
    coin2 = coin2select.value;
    console.log("Selected second currency:", coin2);
})

//
convertBtn.addEventListener('click', () => {
    //מוודא שיש לנו ערך
    if (!howMuch.value) {
        alert('Enter a Number!')
        return
    }

    coin1 ?? alert('Choose a currency!');
    coin2 ?? alert('Choose a currency!');

    //החישוב
    const result = Math.round((howMuch.value / coins.data[coin1] * coins.data[coin2]) * 100) / 100;
    console.log('Your result is: ' + result);

    //ההטמעה במסך
    resulteOfConvert.innerHTML = `${result} ${coinSymbol[coin2]}`;
})
