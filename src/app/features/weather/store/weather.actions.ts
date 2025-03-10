import { createAction, props } from '@ngrx/store';
import { CityWeather, ForecastData } from './weather.reducer';

export const validateCity = createAction(
  '[Weather] Validate City',
  props<{ cityName: string }>()
);

export const validateCitySuccess = createAction(
  '[Weather] Validate City Success',
  props<{ cityWeather: CityWeather }>()
);

export const validateCityFailure = createAction(
  '[Weather] Validate City Failure',
  props<{ error: string }>()
);

export const refreshCityWeather = createAction(
  '[Weather] Refresh City Weather',
  props<{ cityName: string }>()
);

export const refreshCityWeatherSuccess = createAction(
  '[Weather] Refresh City Weather Success',
  props<{ cityWeather: CityWeather }>()
);

export const refreshCityWeatherFailure = createAction(
  '[Weather] Refresh City Weather Failure',
  props<{ error: string }>()
);

export const loadCityForecast = createAction(
  '[Weather] Load City Forecast',
  props<{ cityName: string }>()
);

export const loadCityForecastSuccess = createAction(
  '[Weather] Load City Forecast Success',
  props<{ forecast: ForecastData }>()
);

export const loadCityForecastFailure = createAction(
  '[Weather] Load City Forecast Failure',
  props<{ error: string }>()
);

export const removeLocation = createAction(
  '[Weather] Remove Location',
  props<{ cityName: string }>()
);

export const clearLocations = createAction('[Weather] Clear Locations');

export const selectCityWeather = createAction(
  '[Weather] Select City Weather',
  props<{ cityWeather: CityWeather }>()
);
