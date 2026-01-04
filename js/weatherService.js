class WeatherService {
    constructor() {
        this.cache = new Map();
        this.cacheTime = 10 * 60 * 1000;
    }

    async fetchData(endpoint) {
        const cached = this.cache.get(endpoint);
        if (cached && Date.now() - cached.time < this.cacheTime) {
            return cached.data;
        }

        const res = await fetch(endpoint);
        if (!res.ok) throw new Error("API Error");

        const data = await res.json();
        this.cache.set(endpoint, { data, time: Date.now() });
        return data;
    }

    getCurrent(city) {
        return this.fetchData(
            `${CONFIG.BASE_URL}/weather?q=${city}&units=metric&appid=${CONFIG.API_KEY}`
        );
    }

    getForecast(city) {
        return this.fetchData(
            `${CONFIG.BASE_URL}/forecast?q=${city}&units=metric&appid=${CONFIG.API_KEY}`
        );
    }
}
