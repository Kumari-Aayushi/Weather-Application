class WeatherUI {
    constructor() {
        this.currentEl = document.getElementById("currentWeather");
        this.forecastEl = document.getElementById("forecast");
        this.unit = "C";
    }

    convert(temp) {
        return this.unit === "C"
            ? Math.round(temp)
            : Math.round(temp * 9 / 5 + 32);
    }

    showCurrent(data) {
        this.currentEl.innerHTML = `
            <div class="weather-card">
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>🌡 ${this.convert(data.main.temp)}°${this.unit}</p>
                <p>☁ ${data.weather[0].description}</p>
                <p>💧 ${data.main.humidity}% | 💨 ${data.wind.speed} m/s</p>
            </div>
        `;
    }

    showForecast(list) {
        const days = {};
        list.forEach(i => {
            const d = new Date(i.dt * 1000).toDateString();
            if (!days[d]) days[d] = i;
        });

        this.forecastEl.innerHTML = `
            <div class="forecast-container">
                ${Object.values(days).slice(0, 5).map(d => `
                    <div class="forecast-day">
                        <h4>${new Date(d.dt * 1000).toDateString()}</h4>
                        <p>${this.convert(d.main.temp)}°${this.unit}</p>
                        <p>${d.weather[0].description}</p>
                    </div>
                `).join("")}
            </div>
        `;
    }

    loading() {
        this.currentEl.innerHTML = "<div class='loading'>Loading...</div>";
        this.forecastEl.innerHTML = "";
    }

    error(msg) {
        this.currentEl.innerHTML = `<div class='error'>${msg}</div>`;
    }
}
