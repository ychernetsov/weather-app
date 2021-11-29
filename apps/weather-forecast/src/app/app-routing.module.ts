import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherContainerComponent } from './weather-container/weather-container.component';

const routes: Routes = [

  { path: 'daily/:city', component: WeatherContainerComponent },
  { path: 'hourly/:city', component: WeatherContainerComponent },
  { path: '', redirectTo: '/daily/kyiv', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
