let weather = {
    apikey: "5b922e461fe95ba80d184475c0c2237f",
    fetchweather: function (city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apikey)
        .then((response)=>response.json())
        .then((data)=> this.displayWeather(data));
    },
    displayWeather: function(data){
        const {name} = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { country, sunset, sunrise } = data.sys;
        const { speed } = data.wind;
        let timer = ()=>{
            let currentTime = new Date();
            let currentLocalTime = currentTime.toLocaleTimeString();
            document.getElementById("time").innerHTML = `Time: ${currentLocalTime}`;
        }
        timer()
        setInterval(timer, 1000)


        document.getElementById("city").innerHTML = `Weather in ${name}, `;
        document.getElementById("country").innerHTML = country;       
        document.getElementById("temp").innerHTML = `${temp} °C`;
        let sunriseDate = new Date(sunrise*1000);
        let sunrisetTime = sunriseDate.toLocaleTimeString()
        document.getElementById("sunrise").innerHTML = `Sunrise: ${sunrisetTime}`
        let date = new Date(sunset*1000);
        let sunsetTime = date.toLocaleTimeString()
        document.getElementById("sunset").innerHTML = `Sunset: ${sunsetTime}`
        document.getElementById("desc").innerText = description[0].toUpperCase() + description.substring(1);
        document.getElementById("humidity").innerText = `Humidity: ${humidity} %`;
        document.getElementById("wind").innerText = `Wind speed: ${speed} km/h`;
        document.getElementById('icon').src = "http://openweathermap.org/img/wn/" + icon + ".png";

    }
};

document.getElementById('searchBtn').addEventListener('click', ()=>{
    const cityName = document.getElementById('input-box').value;
    weather.fetchweather(cityName)
    document.getElementById('input-box').value = ""
})

if(!document.getElementById('input-box').value){
    weather.fetchweather("Thakurgaon")
}

document.getElementById('input-box').addEventListener('keyup', (event)=>{
    if(event.key == "Enter"){
        weather.fetchweather(document.getElementById('input-box').value);
        document.getElementById('input-box').value = ""
    }
})
