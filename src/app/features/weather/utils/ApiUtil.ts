import { environment } from "src/environments/environment";

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = 'd4594364698122bfd1c4b3eb5f2ff19f';

// Map condition, intensity, and time of day to the appropriate icon
const WEATHER_ICON_MAPPING = {
  day: {
    light: {
      rain: 'rainy-1.svg',
      snow: 'snowy-1.svg',
      cloudy: 'cloudy-day-1.svg',
      clear: 'day.svg',
    },
    moderate: {
      rain: 'rainy-3.svg',
      snow: 'snowy-3.svg',
      cloudy: 'cloudy-day-2.svg',
      clear: 'day.svg',
    },
    heavy: {
      rain: 'rainy-5.svg',
      snow: 'snowy-5.svg',
      cloudy: 'cloudy-day-3.svg',
      clear: 'day.svg',
    },
  },
  night: {
    light: {
      rain: 'rainy-1.svg',
      snow: 'snowy-1.svg',
      cloudy: 'cloudy-night-1.svg',
      clear: 'night.svg',
    },
    moderate: {
      rain: 'rainy-3.svg',
      snow: 'snowy-3.svg',
      cloudy: 'cloudy-night-2.svg',
      clear: 'night.svg',
    },
    heavy: {
      rain: 'rainy-5.svg',
      snow: 'snowy-5.svg',
      cloudy: 'cloudy-night-3.svg',
      clear: 'night.svg',
    },
  },
};

export const getWeatherUrl = (cityName: string) =>
  `${BASE_URL}/weather?q=${cityName}&appid=${environment.weatherApiKey}&units=metric`;

export const getForecastUrl = (cityName: string) =>
  `${BASE_URL}/forecast?q=${cityName}&appid=${environment.weatherApiKey}&units=metric`;

export const getIconUrl = (data: any): string => {
  // Extract sunrise, sunset, and timezone from the API response
  const { sunrise, sunset } = data.sys;
  const localTime = data.dt;
  const isDay = localTime >= sunrise && localTime < sunset;

  // Determine condition
  const conditionRaw: string = data.weather[0].main.toLowerCase();
  let condition: 'rain' | 'snow' | 'cloudy' | 'clear';
  let precipitation = 0;
  if (conditionRaw.includes('rain') || conditionRaw.includes('drizzle')) {
    condition = 'rain';
    precipitation = data.rain['1h'];
  } else if (conditionRaw.includes('snow')) {
    condition = 'snow';
    precipitation = data.snow['1h'];
  } else if (conditionRaw.includes('cloud')) {
    condition = 'cloudy';
    precipitation = Math.floor(data.clouds.all / 10);
  } else {
    condition = 'clear';
  }

  // Intensity logic (optional: same as before)
  let intensity: 'light' | 'moderate' | 'heavy' = 'light';
  if (precipitation < 2) {
    intensity = 'light';
  } else if (precipitation < 5) {
    intensity = 'moderate';
  } else {
    intensity = 'heavy';
  }

  const timeOfDay = isDay ? 'day' : 'night';
  const iconFile = WEATHER_ICON_MAPPING[timeOfDay][intensity][condition];
  return `https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/${iconFile}`;
};
