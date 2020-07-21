import {
  array,
  guard,
  number,
  object,
  string,
  iso8601,
  map,
  oneOf,
  compose
} from "decoders";

const WEATHER_STATES = {
  Snow: {
    icon: () => require("@/assets/Snow.png"),
    term: "weather.snow"
  },
  Sleet: {
    icon: () => require("@/assets/Sleet.png"),
    term: "weather.sleet"
  },
  Hail: {
    icon: () => require("@/assets/Hail.png"),
    term: "weather.hail"
  },
  Thunderstorm: {
    icon: () => require("@/assets/Thunderstorm.png"),
    term: "weather.thunderstorm"
  },
  "Heavy Rain": {
    icon: () => require("@/assets/HeavyRain.png"),
    term: "weather.heavyRain"
  },
  "Light Rain": {
    icon: () => require("@/assets/LightRain.png"),
    term: "weather.lightRain"
  },
  Showers: {
    icon: () => require("@/assets/Shower.png"),
    term: "weather.showers"
  },
  "Heavy Cloud": {
    icon: () => require("@/assets/HeavyCloud.png"),
    term: "weather.heavyCloud"
  },
  "Light Cloud": {
    icon: () => require("@/assets/LightCloud.png"),
    term: "weather.lightCloud"
  },
  Clear: {
    icon: () => require("@/assets/Clear.png"),
    term: "weather.clear"
  }
};

const toISOStringDecoder = map(string, value => new Date(value).toISOString());

const consolidatedWeather = object({
  id: number,
  applicable_date: compose(toISOStringDecoder, iso8601),
  wind_speed: number,
  wind_direction: number,
  wind_direction_compass: string,
  humidity: number,
  visibility: number,
  air_pressure: number,
  the_temp: number,
  max_temp: number,
  min_temp: number,
  weather_state_name: oneOf(Object.keys(WEATHER_STATES))
});

const location = object({
  title: string,
  time: iso8601,
  consolidated_weather: map(array(consolidatedWeather), weathers =>
    weathers.map(
      ({
        wind_speed,
        wind_direction,
        wind_direction_compass,
        the_temp,
        max_temp,
        min_temp,
        weather_state_name,
        air_pressure,
        visibility,
        humidity,
        applicable_date,
        ...rest
      }) => ({
        ...rest,
        windSpeed: wind_speed.toFixed(),
        windDirection: wind_direction,
        windDirectionCompass: wind_direction_compass,
        temperature: the_temp.toFixed(),
        maxTemperature: max_temp.toFixed(),
        minTemperature: min_temp.toFixed(),
        state: WEATHER_STATES[weather_state_name].term,
        icon: WEATHER_STATES[weather_state_name].icon(),
        airPressure: air_pressure.toFixed(),
        visibility: visibility.toFixed(),
        humidity: humidity.toFixed(),
        date: applicable_date
      })
    )
  )
});

const locationGuard = guard(
  map(location, ({ consolidated_weather, ...rest }) => {
    const [weather, ...history] = consolidated_weather;
    return {
      weather,
      history,
      ...rest
    };
  })
);

export const decode = locationGuard;
