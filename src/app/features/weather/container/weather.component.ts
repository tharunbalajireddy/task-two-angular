import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import * as WeatherActions from '../store/weather.actions';
import {
  selectRecentLocations,
  selectForecast,
  selectWeatherError,
  selectCurrentCityWeather,
} from '../store/weather.selectors';
import { CityWeather, WeatherState } from '../store/weather.reducer';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent implements OnInit {
  cityInput = new FormControl('');
  recentLocations$: Observable<any>;
  currentWeather$: Observable<CityWeather | null>;
  selectedForecast$: Observable<any>;
  error$: Observable<string | null>;

  constructor(private store: Store<WeatherState>) {
    this.recentLocations$ = this.store.select(selectRecentLocations);
    this.currentWeather$ = this.store.select(selectCurrentCityWeather);
    this.selectedForecast$ = this.store.select(selectForecast);
    this.error$ = this.store.select(selectWeatherError);
  }

  ngOnInit(): void {}

  addCity(): void {
    const cityName = this.cityInput.value?.trim();
    if (cityName) {
      this.store.dispatch(WeatherActions.validateCity({ cityName }));
      this.cityInput.reset();
    }
  }

  refreshCity(cityName: string): void {
    this.store.dispatch(WeatherActions.refreshCityWeather({ cityName }));
  }

  removeCity(cityName: string): void {
    this.store.dispatch(WeatherActions.removeLocation({ cityName }));
  }

  clearCities(): void {
    this.store.dispatch(WeatherActions.clearLocations());
  }

  selectCity(cityWeather: CityWeather): void {
    this.store.dispatch(WeatherActions.selectCityWeather({ cityWeather }));
    this.store.dispatch(
      WeatherActions.loadCityForecast({ cityName: cityWeather.cityName })
    );
  }

  refreshForecast(): void {
    this.currentWeather$
      .subscribe((current) => {
        if (current) {
          this.refreshCity(current.cityName);
          this.store.dispatch(
            WeatherActions.loadCityForecast({ cityName: current.cityName })
          );
        }
      })
      .unsubscribe();
  }
}
