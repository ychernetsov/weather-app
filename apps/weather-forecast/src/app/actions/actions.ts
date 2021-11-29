import { createAction, props, union } from '@ngrx/store';
import { City, CityPayload, WeatherPayload, WeatherResponse } from '../models/models';

export const FETCH_WEATHER = 'FETCH_WEATHER';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_CITY = 'FETCH_CITY';
export const FETCH_CITY_SUCCESS = 'FETCH_CITY_SUCCESS';
export const SET_ROUTE_PARAMS = 'SET_ROUTE_PARAMS';
export const FETCH_CITY_AND_WEATHER = 'FETCH_CITY_AND_WEATHER';
export const START_SEARCH = 'START_SEARCH';
export const LOAD_TABLE = 'LOAD_TABLE';
export const LOAD_TABLE_ERROR = 'LOAD_TABLE_ERROR';

export const FetchWeather = createAction(
    FETCH_WEATHER,
    props<{payload: WeatherPayload}>()
);

export const FetchWeatherSuccess = createAction(
    FETCH_WEATHER_SUCCESS, 
    props<{ payload: WeatherResponse }>()
);

export const FetchCity = createAction(
    FETCH_CITY,
    props<{payload: string}>()
);

export const StartSearch = createAction(
    START_SEARCH,
    props<{payload: boolean}>()
);

export const FetchCitySuccess = createAction(
    FETCH_CITY_SUCCESS,
    props<{payload: City[]}>()
);

export const setRouteParams = createAction(
    SET_ROUTE_PARAMS,
    props<{params: any}>()
);

export const FetchCityAndWeather = createAction(
    FETCH_CITY_AND_WEATHER,
    props<{payload: CityPayload}>()
);

export const LoadTable = createAction(
    LOAD_TABLE,
    props<{payload: boolean}>()
);

export const LoadTableError = createAction(
    LOAD_TABLE_ERROR
);


const weatherActions = union({
    FetchWeather,
    FetchWeatherSuccess,
    FetchCity,
    FetchCitySuccess,
    setRouteParams,
    FetchCityAndWeather,
    StartSearch,
    LoadTable,
    LoadTableError
});

export type ActionsUnion = typeof weatherActions;