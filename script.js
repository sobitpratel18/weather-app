

//Get elements from HTML
let currentTemperature = null;
let isCelsius = true;

const unitBtn = document.getElementById("unitBtn");
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherIcon = document.getElementById("weatherIcon");

//Get weather Data
async function getweather(city) {
const url = `/api/weather?city=${encodeURIComponent(city)}`;
  try{
    cityName.textContent="Loading....";
    temperature.textContent="--℃";
    description.textContent="";
    const response = await fetch(url);
    if(!response.ok)
    {
        throw new Error("City not found");
        
    }
    const data = await response.json();
    cityName.textContent=data.name;
    currentTemperature = data.main.temp;
temperature.textContent = `${Math.round(currentTemperature)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} m/s`;
    description.textContent=data.weather[0].description;
    const iconCode = data.weather[0].icon;
weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
weatherIcon.alt = data.weather[0].description;
weatherIcon.style.display = "block";
}
catch(error){
cityName.textContent="Error";
temperature.textContent="--℃";
description.textContent=error.message;
}
}

//Listen for search button click 
searchBtn.addEventListener("click",function()
{
    const city = cityInput.value.trim();
    if(city==="")
    {
        cityName.textContent="Please enter a city";
        temperature.textContent="--℃";
        description.textContent="";
        return;
    }
    getweather(city);
});

//Listen for switch ℉ click
unitBtn.addEventListener("click",function(){
    if(currentTemperature===null)
    {
        return;
    }
    if(isCelsius)
    {
        const fahrenheit=(currentTemperature * 9/5)+32;       
        temperature.textContent = `${Math.round(fahrenheit)}°F`; 
        unitBtn.textContent="switch to ℃" ;
        isCelsius=false;   
    }
    else{
        temperature.textContent = `${Math.round(currentTemperature)}°C`;
        unitBtn.textContent="switch to ℉";
        isCelsius=true;
    }
});

cityInput.addEventListener("keydown", function(event)
{
    if(event.key == "Enter")
    {
        searchBtn.click();
    }
});

