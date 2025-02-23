//Source
let myKey = 'f5bc2d237955f898f89a3baebde6da53';
let URL = `https://api.openweathermap.org/data/2.5/weather?appid=${myKey}&units=metric&q=`;
//Place in the HTML
const city = document.querySelector('#inputCity')
const defultCity = document.querySelector('#defultCity');
const h1 = document.querySelector('#city');
const description = document.querySelector('#description')
const temp = document.querySelector('#temp')
const weatherIcon = document.querySelector('#weatherIcon');
const wind = document.querySelector('#wind');
//The button
const btn = document.querySelector('#btn');
//Local Storge
const savedCity = localStorage.getItem('savedCity');

//The main function
function getWeather(cityName) {
    const respons = fetch(URL + cityName)
        .then(res => res.json())
        .then(data => {
            if (data.name != undefined) {
                h1.innerHTML = data.name;
                temp.innerHTML = `<span style="font-weight: bold;">Temp:</span> ${data.main.temp} C <br><br><span style="font-weight: bold;">Max Temp:</span> ${data.main.temp_max} C <br><span style="font-weight: bold;">Min Temp:</span> ${data.main.temp_min} C <br><br> <span style="font-weight: bold;">Feels Like:</span> ${data.main.feels_like} C`;
                description.innerHTML = data.weather[0].description;
                weatherIcon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
                document.querySelector('#shortIcon').href = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
                description.style.fontSize = '1.5rem';
                description.style.fontWeight = 'bold';
                wind.innerHTML = `<h2>Wind:</h2><br><p><span style="font-weight: bold;">Speed:</span> ${data.wind.speed} m/s<br><br><span style="font-weight: bold;">degree:</span> ${data.wind.deg}</p>`;
                console.log(data);
            }
            else {
                h1.innerHTML = "City Not Found...";
                temp.innerHTML = "";
                description.innerHTML = "Try Other City";
                weatherIcon.src = "https://openweathermap.org/img/wn/02d@2x.png";
                document.querySelector('#shortIcon').href = "https://openweathermap.org/img/wn/02d@2x.png";
                description.style.fontSize = '1rem';
                description.style.fontWeight = '200';
                wind.innerHTML = ``;

            }
        });
    //log Data
    console.log(respons);
    return respons
}

//Active The Function
btn.addEventListener('click', () => {
    const cityName = document.querySelector('#inputCity').value.trim();
    //Alert If There is No City Name
    if (!cityName) {
        alert("Please Enter City Name...");
        return;
    }
    //Set Defult City
    else if (defultCity.checked) {
        localStorage.setItem('savedCity', cityName)
    }

    getWeather(cityName);
})

//Check For Defult City
if (savedCity) {
    getWeather(savedCity);
    description.fontSize = '1.5rem';
    description.fontWeight = 'bold';
}
else {
    h1.innerHTML = "Weather App"
    description.innerHTML = "By Or Haklay"
}