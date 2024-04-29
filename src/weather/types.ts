export type Coord = {
    latitude: number;
    longitude: number;
};
export type CoordProps = {
    coords: Coord
};

export type Weather = {
    id: number;
    main: string;
    description: string;
    icon: string;
};

export type Main = {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
};

export type Wind = {
    speed: number;
    deg: number;
    gust: number;
};

export type Clouds = {
    all: number;
};

export type Sys = {
    country: string;
    sunrise: number;
    sunset: number;
};

export type WeatherData = {
    weather: Weather[],
    main: Main,
    visibility: number,
    wind: Wind,
    clouds: Clouds,
    dt: number,
    sys: Sys,
    timezone: number,
    id: number,
    name: string,
    cod: number
};

export type ForecastItem = {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
    },
    weather: Weather[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    sys: Sys;
    dt_txt: string;
};