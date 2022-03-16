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
function cityFinder (input) {
    console.log(input)
    if (input instanceof Event) {
        input = city.value
    }
    console.log(input);
    
    var savedCity = localStorage.getItem("city")
    if (savedCity === null) {
        savedCity = [input]
    }
    else {
        savedCity = JSON.parse(savedCity)
        savedCity.push(input);
    }
    localStorage.setItem("city", JSON.stringify(savedCity));
    cityHistory();

    limit = 5;
    let cityUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${apiKey}`;

    fetch(cityUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const {lat, lon} = data.city.coord;
        let currentUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&limit=${limit}&units=imperial&appid=${apiKey}`;
        fetch(currentUrl)
        .then(function (response) {
            dashBoardEl.classList.remove("d-none");
            fiveDay.classList.remove("d-none");
            dailyWeather.classList.remove("d-none");
            return response.json();
        })
        .then(function (data) {
            // current forcast for big section
            const {temp, uvi, humidity, wind_speed} = data.current;
            var dashBoardIcon = data.current.weather[0].icon
            currentTemp.textContent = temp + " °F";
            currentHumid.textContent = humidity + " %";
            currentWind.textContent = wind_speed + " MPH";
            currentUv.textContent = uvi;
            currentCity.textContent = city.value;
            currentIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + dashBoardIcon + "@2x.png");
            currentIcon.setAttribute("alt", data.current.weather[0].description);
            
            // 5 day forecast
                for (var i = 0; i < 5; i++) {
                    // console.log(data.daily[0].weather[0].icon);
                    var fiveTemp = data.daily[i].temp.day;
                    var fiveWindSpeed = data.daily[i].wind_speed;
                    var fiveHumidity  = data.daily[i].humidity;
                    var futureIcon = data.daily[i].weather[0].icon;

                    document.getElementById("temp" + (i + 1)).textContent = fiveTemp + " °F";
                    document.getElementById("wind" + (i + 1)).textContent = fiveWindSpeed + " MPH";
                    document.getElementById("humid" + (i + 1)).textContent = fiveHumidity + " %";
                    document.getElementById("icon" + (i + 1)).src = "https://openweathermap.org/img/wn/" + futureIcon + "@2x.png";
                }
        })
    })
    .catch(function (error) {
        alert("Please enter a city name located in the U.S");
        console.log("not working", error);
    })
};

// sets local storage
function cityHistory () {
    historyEl.innerHTML = "";
    var saved = localStorage.getItem("city");
    if (saved === null) {
        return;
    }
    saved = JSON.parse(saved)
    for (var city of saved) {
        var historyBtn = document.createElement("button");
        historyBtn.textContent = city;
        historyEl.appendChild(historyBtn);
    }
};

document.addEventListener("click", function(event){
    var element = event.target
    if (!element.matches("#history > button")) {
        return;
    }
    cityFinder(element.innerText);
});

searchBtn.addEventListener("click", cityFinder);
cityHistory();



