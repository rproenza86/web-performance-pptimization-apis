window.addEventListener("load", () => {
    document.querySelector("ul#weather").innerHTML = "";
    performance.mark("weatherStart");
    Promise.all([fetchWeather("san diego"), fetchWeather("sacramento"), fetchWeather("fresno")])
        .then(responses => {
            performance.mark("weatherEnd");
            performance.measure("weather", "weatherStart", "weatherEnd");
            responses.forEach(response => {
                response.json()
                    .then(data => {
                        const li = `<li>${data[0].name}: 
                                ${Math.round(data[0].forecast[0].temp_min)}F -
                                ${Math.round(data[0].forecast[0].temp_max)}F</li>`;
                        document.querySelector("ul#weather").innerHTML += li;
                    })
            })
        })
});

function fetchWeather(city) {
    return fetch("http://explorecalifornia.org/api/weather/?city=" + encodeURIComponent(city));
}