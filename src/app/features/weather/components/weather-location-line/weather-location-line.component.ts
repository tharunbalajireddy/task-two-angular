import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CityWeather } from '../../store/weather.reducer';

@Component({
  selector: 'app-weather-location-line',
  templateUrl: './weather-location-line.component.html',
  styleUrls: ['./weather-location-line.component.scss'],
})
export class WeatherLocationLineComponent {
  @Input() cityWeather!: CityWeather;
  @Output() refresh = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();
  @Output() selectCity = new EventEmitter<CityWeather>();

  onRefresh(): void {
    this.refresh.emit(this.cityWeather.cityName);
  }

  onRemove(): void {
    this.remove.emit(this.cityWeather.cityName);
  }
  
  onSelect(): void {
    this.selectCity.emit(this.cityWeather);
  }
}
