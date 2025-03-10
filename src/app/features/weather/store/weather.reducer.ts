import { createReducer, on } from '@ngrx/store';
import * as WeatherActions from './weather.actions';

export interface CityWeather {
  cityName: string;
  temperature: number;
  weatherStatus: string;
  windSpeed: number;
  windDeg: number;
  pressure: number;
  icon?: string;
}

export interface ForecastData {
  cityName: string;
  forecast: {
    date: string;
    day: string;
    temperature: number;
    icon?: string;
  }[];
}

export interface WeatherState {
  recentLocations: CityWeather[];
  selectedCityWeather: CityWeather | null;
  selectedForecast: ForecastData | null;
  error: string | null;
  loading: boolean;
}

export const initialState: WeatherState = {
  recentLocations: [],
  selectedCityWeather: null,
  selectedForecast: null,
  error: null,
  loading: false,
};

export const weatherReducer = createReducer(
  initialState,
  on(WeatherActions.validateCitySuccess, (state, { cityWeather }) => {
    // Remove duplicates and add at the top
    const updatedList = state.recentLocations.filter(
      (c) => c.cityName.toLowerCase() !== cityWeather.cityName.toLowerCase()
    );
    updatedList.unshift(cityWeather);
    if (updatedList.length > 8) {
      updatedList.pop();
    }
    return { ...state, recentLocations: updatedList, error: null };
  }),
  on(WeatherActions.validateCityFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(WeatherActions.refreshCityWeatherSuccess, (state, { cityWeather }) => {
    const updatedLocations = state.recentLocations.map((c) =>
      c.cityName.toLowerCase() === cityWeather.cityName.toLowerCase()
        ? cityWeather
        : c
    );
    // Also update selectedCityWeather if it matches.
    const selected =
      state.selectedCityWeather &&
      state.selectedCityWeather.cityName.toLowerCase() ===
        cityWeather.cityName.toLowerCase()
        ? cityWeather
        : state.selectedCityWeather;
    return {
      ...state,
      recentLocations: updatedLocations,
      selectedCityWeather: selected,
      error: null,
    };
  }),
  on(WeatherActions.selectCityWeather, (state, { cityWeather }) => ({
    ...state,
    selectedCityWeather: cityWeather,
  })),
  on(WeatherActions.loadCityForecastSuccess, (state, { forecast }) => ({
    ...state,
    selectedForecast: forecast,
    error: null,
  })),
  on(WeatherActions.removeLocation, (state, { cityName }) => ({
    ...state,
    recentLocations: state.recentLocations.filter(
      (c) => c.cityName.toLowerCase() !== cityName.toLowerCase()
    ),
  })),
  on(WeatherActions.clearLocations, (state) => ({
    ...state,
    recentLocations: [],
    selectedCityWeather: null,
    selectedForecast: null,
  })),
  on(WeatherActions.refreshCityWeatherFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(WeatherActions.loadCityForecastFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
