import { createReducer, on } from '@ngrx/store';
import * as WeatherActions from '../actions/actions';
import * as AppState from '../state/state';

export const WeatherReducer = createReducer(
    AppState.defaultWeatherState,
    on(WeatherActions.FetchWeatherSuccess, (state, { payload }) => ({...state, weather: payload, isSearchFinished: true, isLoading: false, isTableReady: true})),
    on(WeatherActions.FetchCitySuccess, (state, { payload }) => ({...state, cities: payload, isSearchFinished: false, citySearch: false})),
    on(WeatherActions.setRouteParams, (state, params ) => ({...state, routeParams: params})),
    on(WeatherActions.StartSearch, (state, { payload } ) => ({...state, citySearch: payload})),
    on(WeatherActions.LoadTable, (state, { payload } ) => ({...state, isLoading: payload})),
    on(WeatherActions.LoadTableError, (state) => ({...state, isTableReady: false, isLoading: false}))

);
