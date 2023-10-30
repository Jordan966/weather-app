//API and DOM elements.
const apiKey = "07313632e17581a63d1d3291ba3b7963";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchInput = document.querySelector('#userSearchCity');
const searchButton = document.querySelector('#searchButton');

//Function to convert unix to hh:mm format.
function convertUnixTimestamp(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`; // condition ? expressionIfTrue : expressionIfFalse.
}

//Async function to update weather info and styles.
async function getCityWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();
        console.log(data);
        const currentTime = Math.floor(Date.now() / 1000);


        let updateWeatherIcon = "";
        // updateWeatherIcon = document.querySelector(".weather-icon").src = `images/` + data.weather[0].main + '.svg';

        //DOM elements
        const container = document.querySelector('.container');
        const image = document.querySelector('.weather-icon');
        const button = document.querySelector('.search button');
        const details = document.querySelector('.details');
        const weather = document.querySelector('.weather');

        document.querySelector('.temperature').innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector('.feels-like').innerHTML = `Feels like ${Math.round(data.main.feels_like)} °C`;
        document.querySelector('.weatherOutside').innerHTML = data.weather[0].description.toUpperCase();
        document.querySelector('.city').innerHTML = `${data.name}, ${data.sys.country}`;
        document.querySelector('.humidity').innerHTML = data.main.humidity + "% HUMIDITY";
        document.querySelector('.wind').innerHTML = Math.round(data.wind.speed) + " MPH WINDS";
        document.querySelector('.sunset').innerHTML = convertUnixTimestamp(data.sys.sunset);
        weather.classList.add('fade-in');

        setTimeout(() => {
            weather.classList.remove('fade-in');
        }, 1500);
        
        //Styling for Night.
        if (currentTime > data.sys.sunset) {
            updateWeatherIcon = document.querySelector(".weather-icon").src = `images/` + data.weather[0].main + '2.svg';
            container.style.backgroundColor = "#244755";
            image.style.filter = "invert(1) drop-shadow(10px 3px 6px black)";
            button.style.backgroundColor = "skyblue";
            button.style.filter = "invert(0)";
            details.style.borderTop = "solid 5px #87ceeb1f";
        
        //Styling for Day.
        } else if (currentTime < data.sys.sunset) {
            updateWeatherIcon = document.querySelector(".weather-icon").src = `images/` + data.weather[0].main + '.svg';
            container.style.backgroundColor = "skyblue";
            image.style.filter = "invert(1) drop-shadow(10px 3px 6px grey)";
            button.style.backgroundColor = "#244755"
            details.style.borderTop = "solid 5px #ffffff30";
        }


    }
    //Logs error if user input wasn't a town/city.
    catch(error) {
        console.log(error);
    }
}

//Run getCityWeather() on button click. 
searchButton.addEventListener("click", function() {
    getCityWeather(searchInput.value);
})

//Run getCityWeather() on keypress "Enter". 
searchInput.addEventListener('keypress', function(event) {
    if(event.keyCode === 13) {
    getCityWeather(searchInput.value);
    }
})
