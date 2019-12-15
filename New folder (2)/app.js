window.addEventListener('load', ()=> {
    
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let windDegree = document.querySelector(".wind-degree");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimeZone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    let pressureDe = document.querySelector(".pressure-degree");
    const temperatureSpan = document.querySelector(".temperature span");

    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "http://cors-anywhere.herokuapp.com/"
            const api = `${proxy}https://api.darksky.net/forecast/f0fa051bb42151368ac09c538e05dc46/${lat},${long}`;

            fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            const{ temperature, summary, icon, windSpeed, pressure } = data.currently;
            
            temperatureDegree.textContent = "Temperature:" + temperature;
            windDegree.textContent = "Wind Speed: " + windSpeed;
            pressureDe.textContent = "Pressure: " + pressure;
            //temperatureDescription.textContent = "Its " + summary + " outsidee";
            locationTimeZone.textContent = "City: " + data.timezone;
            //C to F Func
            let celsius = (temperature -32) * (5 / 9);
            setIcons(icon, document. querySelector(".icon"));

            // C to F
            temperatureSection.addEventListener("click", () => {
                if(temperatureSpan.textContent === "F") {
                    temperatureSpan.textContent = "C";
                    temperatureDegree.textContent = Math.floor(celsius);
                }else{
                    temperatureSpan.textContent = "F";
                    temperatureDegree.textContent = temperature;
                }
            });

        });
    });



    }
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);

    }
});