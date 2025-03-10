import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState } from './weather.reducer';

export const selectWeatherState =
  createFeatureSelector<WeatherState>('weather');

export const selectRecentLocations = createSelector(
  selectWeatherState,
  (state) => state.recentLocations
);

export const selectCurrentCityWeather = createSelector(
  selectWeatherState,
  (state) => state.selectedCityWeather
);

export const selectForecast = createSelector(
  selectWeatherState,
  (state) => state.selectedForecast
);

export const selectWeatherError = createSelector(
  selectWeatherState,
  (state) => state.error
);
