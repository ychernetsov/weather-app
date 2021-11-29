import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WeatherContainerComponent } from './weather-container/weather-container.component';
import { WeatherSearchComponent } from './weather-search/weather-search.component';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { WeatherReducer } from './reducer/reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppEffect } from './effects/effects';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { WeatherService } from './services/weather.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { WeatherTableComponent } from './weather-table/weather-table.component';
import { RouterEffects } from './effects/router-effects';
import { MatTabsModule } from '@angular/material/tabs';

import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

@NgModule({
	declarations: [AppComponent, WeatherContainerComponent, WeatherSearchComponent, WeatherTableComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		MatCardModule,
		MatProgressSpinnerModule,
		MatFormFieldModule,
		MatAutocompleteModule,
		MatTableModule,
		MatTabsModule,
		ReactiveFormsModule,
		MatInputModule,
		StoreModule.forRoot({ app: WeatherReducer, router: routerReducer }),
		StoreRouterConnectingModule.forRoot(),
		EffectsModule.forRoot([AppEffect, RouterEffects]),
		StoreDevtoolsModule.instrument({
			logOnly: environment.production, // Restrict extension to log-only mode
		}),
	],
	providers: [WeatherService],
	bootstrap: [AppComponent],
})
export class AppModule { }
