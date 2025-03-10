import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { WeatherLocationLineComponent } from './components/weather-location-line/weather-location-line.component';
import { WeatherComponent } from './container/weather.component';
import { WeatherService } from './services/weather.service';
import { WeatherEffects } from './store/weather.effects';
import { weatherReducer } from './store/weather.reducer';
import { WeatherRoutingModule } from './weather-routing.module';

@NgModule({
  declarations: [WeatherComponent, WeatherLocationLineComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    WeatherRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('weather', weatherReducer),
    EffectsModule.forFeature([WeatherEffects]),
  ],
  providers: [WeatherService],
})
export class WeatherModule {}
