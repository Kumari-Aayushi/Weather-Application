const service = new WeatherService();
const ui = new WeatherUI();

const input = document.getElementById("searchInput");
const btn = document.getElementById("searchBtn");
const toggle = document.getElementById("unitToggle");

async function loadWeather(city) {
    try {
        ui.loading();
        Storage.saveCity(city);
        const current = await service.getCurrent(city);
        const forecast = await service.getForecast(city);
        ui.showCurrent(current);
        ui.showForecast(forecast.list);
    } catch {
        ui.error("City not found or API error");
    }
}

btn.onclick = () => loadWeather(input.value);

toggle.onclick = () => {
    ui.unit = ui.unit === "C" ? "F" : "C";
    toggle.textContent = `Switch to °${ui.unit === "C" ? "F" : "C"}`;
    const city = Storage.getCity();
    if (city) loadWeather(city);
};

window.onload = () => {
    const city = Storage.getCity() || "Delhi";
    loadWeather(city);
};
