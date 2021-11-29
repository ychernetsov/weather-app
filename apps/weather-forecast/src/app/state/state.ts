import { createFeatureSelector, createSelector } from '@ngrx/store'
import { City } from '../models/models';

// strongly typing states

export interface WeatherState {
    isLoading: boolean;
    citySearch: boolean;
    isSearchFinished: boolean;
    weather: any;
    query: string;
    cities: City[];
    routeParams: any;
}

//default state

export const defaultWeatherState: WeatherState = {
    isLoading: false,
    citySearch: false,
    isSearchFinished: false,
    weather: [],
    query: '',
    cities: [],
    routeParams: {}
}

//state selectors

const appStateSelector = createFeatureSelector<WeatherState>('app');
export const weatherSelector = createSelector(appStateSelector, state => state.weather);
export const isSearchFinishedSelector = createSelector(appStateSelector, state => state.isSearchFinished);
export const querySelector = createSelector(appStateSelector, state => state.query);
export const isLoadingSelector = createSelector(appStateSelector, state => state.isLoading);
export const citySearchSelector = createSelector(appStateSelector, state => state.citySearch);
export const citiesSelector = createSelector(appStateSelector, state => state.cities);
export const routeParamsSelector = createSelector(appStateSelector, state => state.routeParams);