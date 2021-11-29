import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { WeatherState } from '../state/state';
import * as weatherActions from '../actions/actions';
import { CityPayload } from '../models/models';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
};

/**
 * @title Table dynamically changing the columns displayed
 */
@Component({
  selector: 'weather-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['weather-table.component.scss'],
  templateUrl: 'weather-table.component.html',
})
export class WeatherTableComponent implements OnChanges, OnInit {
  @Input() weatherData: any;
  @Input() params: any;
  @Input() isSearchFinished = false;
  @Input() isLoading = false;
  name = 'City Name';
  city = '';
  type = '';
  array: any = [];
  displayedColumns: string[] = [];
  columnsToDisplay: string[] = [];
  data: any = [];
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  constructor(private store: Store<WeatherState>) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.weatherData.previousValue !== undefined && changes.weatherData.previousValue !== changes.weatherData.currentValue) {
      this.array = [this.transformTable(this.weatherData[this.type])];
      this.displayedColumns = ['City Name', ...this.getDisplayedColumns()];
      this.columnsToDisplay = this.displayedColumns.slice();
      this.data = this.array;
    }
    this.type = this.params.url[0].path;
    this.city = this.params.url[1].path;
  }

  ngOnInit() {
    if (this.city.length) {
      const payload = {
        city: this.city,
        type: this.type
      } as CityPayload;
      this.store.dispatch(weatherActions.LoadTable({ payload: true }));
      this.store.dispatch(weatherActions.FetchCityAndWeather({ payload }));
    }
  }

  transformTable(table: any) {
    if (!table) {
      return;
    }
    const init = {
      'City Name': this.city
    };
    return table
      .reduce((acc:any, curr:any) => {
        const prop = `${curr.dt.toString()}000`;
        const temp = curr.temp.day || curr.temp;
        const start = new Date(parseInt(prop)).getHours().toString();
        const end = new Date(parseInt(prop) + 21600000).getHours().toString();
        const title = this.generateTitle(start, end);
        const img = `http://openweathermap.org/img/wn/${curr['weather'][0]['icon']}@2x.png` //http://openweathermap.org/img/wn/02d@2x.png
        acc[prop] = {...{temp, img, title}};
        return acc;
      }, init);
  }

  private generateTitle(start: string, end: string) {
    start = start.length === 1 ? `0${start}:00` : `${start}:00`;
    end = end.length === 1 ? `0${end}:00` : `${end}:00`;
    return `${start} - ${end}`;
  }
  
  private getDisplayedColumns() {
    if (!this.weatherData[this.type]) {
      return [];
    }
    const mod = this.weatherData[this.type].length / 8;
    return this.weatherData[this.type]
    .filter((_: any, i: number) => i % mod === 0)
      .map((el:any) => `${el.dt.toString()}000`)
  }
}