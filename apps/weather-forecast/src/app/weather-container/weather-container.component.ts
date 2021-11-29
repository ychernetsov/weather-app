import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
// import { select, Store } from '@ngrx/store';
// import { WeatherState } from '../state/state';
// import * as AppState  from '../state/state';
// import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { weatherSelector, routeParamsSelector, WeatherState, isSearchFinishedSelector, citySearchSelector, isLoadingSelector, isTbleReadySelector } from '../state/state';

@Component({
  selector: 'weather-container',
  templateUrl: './weather-container.component.html',
  styleUrls: ['./weather-container.component.scss']
})
export class WeatherContainerComponent {
  routeParams$: Observable<any>;
  weatherData$: Observable<any>;
  isSearchFinished$: Observable<any>;
  citySearch$: Observable<any>;
  isLoading$: Observable<any>;
  isTableReady$: Observable<boolean|null>;

  constructor(private store: Store<WeatherState>) {
    this.weatherData$ = this.store.pipe(
      select(weatherSelector)
    );

    this.routeParams$ = this.store.pipe(
      select(routeParamsSelector)
    );

    this.isSearchFinished$ = this.store.pipe(
      select(isSearchFinishedSelector)
    );

    this.citySearch$ = this.store.pipe(
      select(citySearchSelector)
    );

    this.isLoading$ = this.store.pipe(
      select(isLoadingSelector)
    );

    this.isTableReady$ = this.store.pipe(
      select(isTbleReadySelector)
    );
  }

}