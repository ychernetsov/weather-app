import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { citiesSelector, WeatherState } from '../state/state';
import * as weatherActions from '../actions/actions';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { City, WeatherPayload } from '../models/models';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.scss']
})
export class WeatherSearchComponent implements OnInit {
  @Input() params: any;
  @Input() citySearch = false;
  query = '';
  options$: Observable<City[]>;
  myControl = new FormControl();
  type = '';
  city = '';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  constructor(private router: Router, private store: Store<WeatherState>) {
    this.options$ = of([{
      name: 'Not found, please type full city name ...',
      lat: 0,
      lon: 0
    }]);
  }

  ngOnInit(): void {
    this.store.select(citiesSelector).subscribe((cities) => {
      this.options$ = this.genCityOptions(cities);
    })
    this.type = this.params.url[0].path;
    this.city = this.params.url[1].path;
    this.query = this.city;
  }

  searchTerm(e: Event) {
    const term = (<HTMLInputElement>e.target)?.value;
    this.store.dispatch(weatherActions.FetchCity({ payload: term }));
    this.store.dispatch(weatherActions.StartSearch({ payload: true }));
    this.query = term;
  }

  makeSearch(city: City) {
    const payload = {
      type: this.type, coordinates: { lat: city.lat, lon: city.lon }
    } as WeatherPayload;
    this.store.dispatch(weatherActions.LoadTable({ payload: true }));
    this.store.dispatch(weatherActions.FetchWeather({ payload }));
    this.router.navigate([`/${this.type}/${this.query}`]);
  }

  genCityOptions(cities: City[]): Observable<City[]> {
    if (cities.length) {
      return of(cities.map(city => {
        return {
          name: city.name,
          lat: city.lat,
          lon: city.lon
        }
      }));
    }
    const fallback: City[] = [{
      name: 'Not found, please type full city name ...',
      lat: 0,
      lon: 0
    }];
    return of(fallback);
  }
}
