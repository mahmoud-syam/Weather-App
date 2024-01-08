
// Create a new Date object with date
var date = new Date();

// Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
var dayOfWeek = date.getDay();

// Define an array of weekdays
var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var month = ["January", "February", "March", "April", "Thursday", "May", "June", "July", "August", "September", "October", "November", "December"];

// Get the name of the day of the week

// search input country
var search = document.getElementById("search");
search.addEventListener("keyup", function () {
    getDataFromApi(search.value);

});

// find button country
var find = document.getElementById("Find");
find.addEventListener("click", function () {
    if (find.value == null) {
        getDataFromApi("cairo")
    }
    else {

        getDataFromApi(find.value);
        // clearInput();

    }

});
// Get data from api
async function getDataFromApi(country) {
    var apiKey = "b071c9f88fee4f10a89105548240101";
    // var apiKey = "64e77580af9040d0b65171454240701";
    var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${country}&days=3&aqi=no&alerts=n`);
    var data = await response.json();

    displayWeather(data);

}
// to display data in html
var forecast = getElementById('forecast');
function displayWeather(data) {
    document.getElementById("forecast").innerHTML =
        `
                    <div class="col-md-4">
                        <div class="card-item card-one ">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <div class="day">${weekdays[date.getDay(data.forecast.forecastday[0].date)]}</div>
                                <div class="month">${date.getDay(data.forecast.forecastday[0].date)}${month[date.getMonth(data.forecast.forecastday[0].date)]}</div>
                            </div>
                            <div class="body">
                                <div class="location fw-bold pt-4 px-3">
                                ${(data.location.name).split(" ")[0]}
                                </div>
                                <div class="forecast d-flex justify-content-between align-items-center px-3">
                                    <div class="left">
                                        <div class="num text-white">${data.current.temp_c}<sup>o</sup>C</div>
                                    </div>
                                    <div class="right">
                                        <img src="https:${data.current.condition.icon}" alt="">
                                    </div>
                                </div>
                                <div class="custom px-3">
                                ${data.current.condition.text}
                                </div>
                            </div>
                            <div class="footer-card p-3 pb-4">
                                <span><img src="images/icon-umberella.png" alt=""> 20%</span>
                                <span><img src="images/icon-wind.png" alt=""> 18km/h</span>
                                <span><img src="images/icon-compass.png" alt=""> East</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card-item card-two d-flex justify-content-center align-items-center flex-column">
                            <div class="card-header-two ">
                                <div class="day">${weekdays[date.getDay(data.forecast.forecastday[1].date) + 1]}</div>
                            </div>
                            <div class="item d-flex justify-content-center align-items-center flex-column">
                                <img src="https:${data.forecast.forecastday[1].day.condition.icon}" class="w-75" alt="">
                                <div class="item-num">${data.forecast.forecastday[1].day.mintemp_c} <sup>o</sup> <span>C</span></div>
                                <div class="item2-num">${data.forecast.forecastday[1].day.maxtemp_f} <sup>o</sup></div>
                                <div class="custom pt-2">
                                ${data.forecast.forecastday[1].day.condition.text}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card-item card-item3 card-one text-center">
                            <div class=" card-header3">
                                <div class="day">${weekdays[date.getDay(data.forecast.forecastday[2].date) + 2]}</div>
                                
                            </div>
                            <div class="item item3 d-flex justify-content-center align-items-center flex-column">
                                <img src="https:${data.forecast.forecastday[2].day.condition.icon}" class="thr" alt="">
                                <div class="item-num">${data.forecast.forecastday[2].day.mintemp_c} <sup>o</sup> <span>C</span></div>
                                <div class="item2-num">14.6 <sup>o</sup></div>
                                <div class="custom pt-2">
                                ${data.forecast.forecastday[2].day.condition.text}
                                </div>
                            </div>
                        </div>
                    </div>
    `
}

// clear input in search input
function clearInput() {
    search.value = '';
}

// Check if the browser supports Geolocation
function Geolocation() {
    if ("geolocation" in navigator) {
        // Use the Geolocation API to get the current position
        navigator.geolocation.getCurrentPosition(
            function (position) {
                // Successfully retrieved the position
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;

                // Use reverse geocoding to get country information
                var apiKey = 'e38e6d26f77b4f6b81ae94e094582e08'; // Replace with your OpenCage API key
                var apiUrl = 'https://api.opencagedata.com/geocode/v1/json?key=' + apiKey + '&q=' + latitude + '+' + longitude;

                fetch(apiUrl)
                    .then(response => response.json())
                    .then(async data => {
                        // Extract country information from the response

                        var country = data.results[0].components.country;
                        await getDataFromApi(country)

                        // Do something with the country information



                    })
                    .catch(error => {

                        console.error('Error fetching geocoding data:', error);
                    });

            },

        );
    }


}


Geolocation();



var navItem =document.getElementsByClassName('nav-link');

navItem.addEventListener('click', function(){
    navItem.classList.replace('.nav-link','.nav-link .active')
});
console.log(done);
