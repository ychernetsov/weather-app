import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Coordinates } from '../models/models';

const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/json, text/plain, */*',
  })
};

@Injectable()
  export class WeatherService {

    constructor(private http: HttpClient) { }
    private API_KEY = '010721642521f31b0fbc8c3831d45951';
    exclude = ['current', 'minutely', 'hourly', 'daily', 'alerts'];
    CITY_URL = 'http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=1&appid={API key}'.replace('{API key}', this.API_KEY);
    BASE_URL = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={exclude}&appid={API key}'.replace('{API key}', this.API_KEY);
    

    getCity(q: string): Observable<any> {
      return this.http.get(this.CITY_URL.replace('{city name}', q), httpOptions);
    }

    getWeather(type: string, coordinates: Coordinates) {
      const lat = coordinates.lat.toString();
      const lon = coordinates.lon.toString();
      const url = this._generateUrl(type).replace('{lat}', lat).replace('{lon}', lon);
      return this.http.get(url);
    }

    private _generateUrl(type: string) {
      const toExclude = this.exclude.filter(item => item !== type).join(',');
      return this.BASE_URL.replace('{exclude}', toExclude);
    }
  }