export interface WeatherPayload {
    type: string;
    coordinates: Coordinates;
}

export interface Coordinates {
    lat: number;
    lon: number;
};

export interface WeatherItem {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust:  number;
    clouds: number;
    pop: number;
    uvi: number;
    weather: any;
    temp: any;
    feels_like: any;
}

export interface WeatherResponse {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    daily?: WeatherItem
    hourly?: WeatherItem
}

export interface City {
    country?: string;
    lat: number;
    local_names?: Object;
    lon: number;
    name: string;
}

export type CityResponse = City[];

export interface CityPayload {
        city: string;
        type: string;
}