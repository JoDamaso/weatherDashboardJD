const apiKey = "b791ce644df21a24637c0d54506688a5";


var searchBtn = document.getElementById('search');
var history = document.getElementById('history');
var cityName = document.getElementById('city');


function finder () {
    limit = 5;
    // let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&limit=${limit}&appid=${apiKey}`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?q=${city}&appid=${apiKey}`;
    fetch(apiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
    })
    .catch(function (error) {
        console.log("not working", error);
    })
};

finder();
// searchBtn.addEventListener('click', function() {
//     var displayCity = searchBtn.value.trim();
//     displayCity.appendChild(cityName);
// });


