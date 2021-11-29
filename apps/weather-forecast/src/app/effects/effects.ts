import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WeatherService } from '../services/weather.service';
import * as WeatherActions from '../actions/actions';
import { map, mergeMap, debounceTime, catchError } from 'rxjs/operators';
import { asyncScheduler, of } from 'rxjs';
import { CityResponse, Coordinates } from '../models/models';

@Injectable()
export class AppEffect {

    constructor(private weatherService: WeatherService, private _actions: Actions<WeatherActions.ActionsUnion>) { }

    fetchCity$ = createEffect(() => ({ debounce = 500, scheduler = asyncScheduler } = {}) => this._actions.pipe(
        ofType(WeatherActions.FetchCity.type),
        debounceTime(debounce, scheduler),
        mergeMap(action => {
            return this.weatherService.getCity(action.payload).pipe(
                map((payload: CityResponse) => WeatherActions.FetchCitySuccess({ payload }))
            )
        })
    ))

    fetchWeather$ = createEffect(() => this._actions.pipe(
        ofType(WeatherActions.FetchWeather.type),
        mergeMap(({ payload }) => {
            return this.weatherService.getWeather(payload.type, payload.coordinates as Coordinates).pipe(
                map((res: any) => {
                    return WeatherActions.FetchWeatherSuccess({ payload: res })
                })

            )
        })
    ))

    fetchCityAndWeather$ = createEffect(() => this._actions.pipe(
        ofType(WeatherActions.FetchCityAndWeather.type),
        mergeMap(({ payload }) => {
            return this.weatherService.getCity(payload.city).pipe(
                mergeMap(([res]) => {
                    const coordinates = {
                        lat: res.lat,
                        lon: res.lon
                    }
                    return this.weatherService.getWeather(payload.type, coordinates as Coordinates).pipe(
                        map((weather: any) => WeatherActions.FetchWeatherSuccess({ payload: weather }))
                    )
                }),
                catchError(() => of(WeatherActions.LoadTableError()))
            )
        })
        ),{dispatch: true}
    )
}