// src/app/features/weather/services/weather.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getForecastUrl, getIconUrl, getWeatherUrl } from '../utils/ApiUtil';

@Injectable()
export class WeatherService {
  constructor(private http: HttpClient) {}

  getCurrentWeatherByCity(city: string): Observable<any> {
    const url = getWeatherUrl(city);
    return this.http.get<any>(url).pipe(
      map((data) => ({
        cityName: data.name,
        temperature: Math.round(data.main.temp),
        weatherStatus: data.weather[0].main,
        windSpeed: data.wind.speed,
        windDeg: data.wind.deg,
        pressure: data.main.pressure,
        icon: getIconUrl(data),
      }))
    );
  }

  getCityForecast(city: string): Observable<any> {
    const url = getForecastUrl(city);
    return this.http.get<any>(url).pipe(
      map((data) => {
        // data.list is an array of forecast items every 3 hours.
        const forecastItems = data.list;
        // Group items by date string (YYYY-MM-DD)
        const grouped: { [date: string]: any[] } = {};
        forecastItems.forEach((item: any) => {
          const dateStr = item.dt_txt.split(' ')[0];
          if (!grouped[dateStr]) {
            grouped[dateStr] = [];
          }
          grouped[dateStr].push(item);
        });

        // For each day, pick the forecast item closest to noon (12:00)
        const forecastDays = Object.keys(grouped)
          .slice(-5)
          .map((dateStr) => {
            const dayItems = grouped[dateStr];
            let selected = dayItems[0];
            const targetHour = 12;
            let minDiff = Number.MAX_VALUE;
            dayItems.forEach((item) => {
              // item.dt_txt is in the format "YYYY-MM-DD HH:mm:ss"
              const hour = parseInt(
                item.dt_txt.split(' ')[1].split(':')[0],
                10
              );
              const diff = Math.abs(hour - targetHour);
              if (diff < minDiff) {
                minDiff = diff;
                selected = item;
              }
            });
            // Create a forecast object for this day.
            const forecastDate = new Date(selected.dt * 1000);
            return {
              date: forecastDate.getDate(), // e.g., 10
              day: forecastDate.toLocaleDateString(undefined, {
                weekday: 'short',
              }),
              temperature: Math.round(selected.main.temp),
              icon: getIconUrl(selected),
            };
          });

        forecastDays.sort((a, b) => a.date - b.date);

        return {
          cityName: data.city.name,
          forecast: forecastDays,
        };
      })
    );
  }
}
