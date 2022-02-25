// API Key
const apiKey = "b791ce644df21a24637c0d54506688a5";

// these variables target the search button, history, and inputted city 
var searchBtn = document.getElementById('search');
var historyEl = document.getElementById('history');
var city = document.getElementById('searched-city');

// these variables target the current searched city 
var currentCity = document.getElementById('current-city');
var currentTemp = document.getElementById('temp');
var currentWind = document.getElementById('wind');
var currentHumid = document.getElementById('humidity');
var currentUv = document.getElementById('uv');
var currentIcon = document.getElementById('dashboard-icon');
var dashBoardEl = document.getElementById('city-weather');
var fiveDay = document.getElementById('forecast');
var dailyWeather = document.getElementById('future-weather');

// variables that target the 5 day forcast 
var tempCard = document.getElementById("temp1");
var windCard = document.getElementById("wind1");
var humidCard = document.getElementById("humid1");
var iconCard = document.getElementById("icon1");


// current city and inserting temp, wind, humidity, uv into the current searched city
function cityFinder () {
    console.log(city.value);
    
    localStorage.setItem("city", (city.value));
    
    limit = 5;
    let cityUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&appid=${apiKey}`;

    fetch(cityUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const {lat, lon} = data.city.coord;
        // console.log(data);
        // var currentLat = data.city.coord.lat;
        // var currentLon = data.city.coord.lon;
        let currentUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&limit=${limit}&units=imperial&appid=${apiKey}`;
        fetch(currentUrl)
        .then(function (response) {
            dashBoardEl.classList.remove("d-none");
            fiveDay.classList.remove("d-none");
            dailyWeather.classList.remove("d-none");
            return response.json();
        })
        .then(function (data) {
            const {temp, uvi, humidity, wind_speed} = data.current;
            var dashBoardIcon = data.current.weather[0].icon
            currentTemp.textContent = temp + " °F";
            currentHumid.textContent = humidity + " %";
            currentWind.textContent = wind_speed + " MPH";
            currentUv.textContent = uvi;
            currentCity.textContent = city.value;
            currentIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + dashBoardIcon + "@2x.png");
            currentIcon.setAttribute("alt", data.current.weather[0].description);
            
        var fiveHumidity  = data.daily[0].humidity;
        var fiveWindSpeed = data.daily[0].wind_speed;
        var fiveTemp = data.daily[0].temp.day
        var futureIcon = data.daily[0].weather[0].icon;

        tempCard.append(fiveTemp);
        windCard.append(fiveWindSpeed);
        humidCard.append(fiveHumidity);
        iconCard.append(futureIcon);
        
        console.log(data.daily[0].temp.day);
        })
        // .then(function (data) {
        // // var fiveHumidity  = data.daily[0].humidity;
        // // var fiveWindSpeed = data.daily[0].wind_speed;
        // console.log(data)
        // // var fiveTemp = data.daily
        // // var futureIcon = data.daily[0].weather[0].icon;
        
        // // tempCard.appendChild(fiveTemp);

        // // console.log(data.daily[0].temp.day);
        // })
    })
    .catch(function (error) {
        alert("Please enter a city name located in the U.S");
        console.log("not working", error);
    })
};

// sets local storage
function cityHistory () {
    var saved = localStorage.getItem("city");
    var historyBtn = document.createElement("button");
    historyBtn.textContent = saved;
    historyEl.appendChild(historyBtn);
    console.log(saved);
    

    historyBtn.addEventListener("click", function(){
        console.log("clicked")
        cityFinder(saved);
        console.log(historyBtn);
    });
};

searchBtn.addEventListener("click", cityFinder);
cityHistory();


// var fiveHumidity  = data.daily[0].humidity;
// var fiveWindSpeed = data.daily[0].wind_speed;
// var fiveTemp = data.daily[0].temp.day;
// var futureIcon = data.daily[0].weather[0].icon;
// console.log(data.daily[0].temp.day);

// for 5 day forcast 
// const d = new Date(1644343200 * 1000);
// let text = d.toUTCString();
// d.toLocaleString(locale, {
//     timeZone: "America/Chicago",
//     weekday: "short",
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//     hour: "numeric",
//     minute: "numeric",
//     timeZoneName: "short",
// });


