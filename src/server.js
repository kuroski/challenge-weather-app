import { Server } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  return new Server({
    environment,
    routes() {
      this.urlPrefix = "https://www.metaweather.com";
      this.namespace = "/api";
      this.get(
        "/location/:id",
        () => ({
          consolidated_weather: [
            {
              id: 6457537081638912,
              weather_state_name: "Heavy Cloud",
              weather_state_abbr: "hc",
              wind_direction_compass: "WNW",
              created: "2020-07-22T15:21:52.767788Z",
              applicable_date: "2020-07-22",
              min_temp: 13.405000000000001,
              max_temp: 21.884999999999998,
              the_temp: 21.35,
              wind_speed: 5.610604273106392,
              wind_direction: 293.8243194156968,
              air_pressure: 1021.0,
              humidity: 47,
              visibility: 15.422743676926748,
              predictability: 71
            },
            {
              id: 4941908218478592,
              weather_state_name: "Heavy Cloud",
              weather_state_abbr: "hc",
              wind_direction_compass: "WNW",
              created: "2020-07-22T15:21:55.709089Z",
              applicable_date: "2020-07-23",
              min_temp: 13.945,
              max_temp: 22.965,
              the_temp: 21.68,
              wind_speed: 3.6409312964580187,
              wind_direction: 286.3734231449881,
              air_pressure: 1017.5,
              humidity: 46,
              visibility: 14.634534319573689,
              predictability: 71
            },
            {
              id: 5990055392837632,
              weather_state_name: "Heavy Cloud",
              weather_state_abbr: "hc",
              wind_direction_compass: "WSW",
              created: "2020-07-22T15:21:58.828307Z",
              applicable_date: "2020-07-24",
              min_temp: 15.465,
              max_temp: 24.925,
              the_temp: 23.36,
              wind_speed: 5.618792203266259,
              wind_direction: 252.71887759928433,
              air_pressure: 1010.5,
              humidity: 53,
              visibility: 13.382160681619343,
              predictability: 71
            },
            {
              id: 6531601712283648,
              weather_state_name: "Heavy Cloud",
              weather_state_abbr: "hc",
              wind_direction_compass: "W",
              created: "2020-07-22T15:22:01.783895Z",
              applicable_date: "2020-07-25",
              min_temp: 14.845,
              max_temp: 24.814999999999998,
              the_temp: 23.134999999999998,
              wind_speed: 5.417607710567618,
              wind_direction: 266.21018605022067,
              air_pressure: 1012.5,
              humidity: 55,
              visibility: 13.927413902807602,
              predictability: 71
            },
            {
              id: 5600295969095680,
              weather_state_name: "Light Rain",
              weather_state_abbr: "lr",
              wind_direction_compass: "SW",
              created: "2020-07-22T15:22:04.712549Z",
              applicable_date: "2020-07-26",
              min_temp: 16.22,
              max_temp: 22.575000000000003,
              the_temp: 21.549999999999997,
              wind_speed: 7.011180581794322,
              wind_direction: 220.67009788155238,
              air_pressure: 1009.0,
              humidity: 74,
              visibility: 9.745275093454227,
              predictability: 75
            },
            {
              id: 4768595819102208,
              weather_state_name: "Heavy Cloud",
              weather_state_abbr: "hc",
              wind_direction_compass: "W",
              created: "2020-07-22T15:22:07.877098Z",
              applicable_date: "2020-07-27",
              min_temp: 15.16,
              max_temp: 24.395,
              the_temp: 23.65,
              wind_speed: 4.63520997375328,
              wind_direction: 266.5,
              air_pressure: 1015.0,
              humidity: 57,
              visibility: 9.999726596675416,
              predictability: 71
            }
          ],
          time: "2020-07-22T19:09:34.606853+02:00",
          sun_rise: "2020-07-22T05:11:38.703557+02:00",
          sun_set: "2020-07-22T21:13:24.363306+02:00",
          timezone_name: "LMT",
          parent: {
            title: "Germany",
            location_type: "Country",
            woeid: 23424829,
            latt_long: "51.164181,10.454150"
          },
          sources: [
            {
              title: "BBC",
              slug: "bbc",
              url: "http://www.bbc.co.uk/weather/",
              crawl_rate: 360
            },
            {
              title: "Forecast.io",
              slug: "forecast-io",
              url: "http://forecast.io/",
              crawl_rate: 480
            },
            {
              title: "HAMweather",
              slug: "hamweather",
              url: "http://www.hamweather.com/",
              crawl_rate: 360
            },
            {
              title: "Met Office",
              slug: "met-office",
              url: "http://www.metoffice.gov.uk/",
              crawl_rate: 180
            },
            {
              title: "OpenWeatherMap",
              slug: "openweathermap",
              url: "http://openweathermap.org/",
              crawl_rate: 360
            },
            {
              title: "Weather Underground",
              slug: "wunderground",
              url: "https://www.wunderground.com/?apiref=fc30dc3cd224e19b",
              crawl_rate: 720
            },
            {
              title: "World Weather Online",
              slug: "world-weather-online",
              url: "http://www.worldweatheronline.com/",
              crawl_rate: 360
            }
          ],
          title: "Berlin",
          location_type: "City",
          woeid: 638242,
          latt_long: "52.516071,13.376980",
          timezone: "Europe/Berlin"
        }),
        { timing: 2000 }
      );
    }
  });
}
