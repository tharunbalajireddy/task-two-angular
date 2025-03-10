import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherLocationLineComponent } from './weather-location-line.component';

describe('WeatherLocationLineComponent', () => {
  let component: WeatherLocationLineComponent;
  let fixture: ComponentFixture<WeatherLocationLineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherLocationLineComponent],
    });
    fixture = TestBed.createComponent(WeatherLocationLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
