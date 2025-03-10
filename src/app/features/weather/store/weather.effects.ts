import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as WeatherActions from './weather.actions';
import { WeatherService } from '../services/weather.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class WeatherEffects {
  constructor(
    private actions$: Actions,
    private weatherService: WeatherService
  ) {}

  validateCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.validateCity),
      mergeMap(({ cityName }) =>
        this.weatherService.getCurrentWeatherByCity(cityName).pipe(
          map((cityWeather) =>
            WeatherActions.validateCitySuccess({ cityWeather })
          ),
          catchError((error) =>
            of(
              WeatherActions.validateCityFailure({
                error:
                  error.status === 404
                    ? 'Invalid city name'
                    : 'Unexpected error, please try again later',
              })
            )
          )
        )
      )
    )
  );

  refreshCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.refreshCityWeather),
      mergeMap(({ cityName }) =>
        this.weatherService.getCurrentWeatherByCity(cityName).pipe(
          map((cityWeather) =>
            WeatherActions.refreshCityWeatherSuccess({ cityWeather })
          ),
          catchError((error) =>
            of(
              WeatherActions.refreshCityWeatherFailure({
                error: error.message || 'Refresh failed',
              })
            )
          )
        )
      )
    )
  );

  loadForecast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.loadCityForecast),
      mergeMap(({ cityName }) =>
        this.weatherService.getCityForecast(cityName).pipe(
          map((forecast) =>
            WeatherActions.loadCityForecastSuccess({ forecast })
          ),
          catchError((error) =>
            of(
              WeatherActions.loadCityForecastFailure({
                error: error.message || 'Forecast load failed',
              })
            )
          )
        )
      )
    )
  );
}
