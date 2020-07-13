import { array, guard, number, object, string, iso8601, map } from "decoders";

const consolidatedWeather = object({
  wind_speed: number,
  wind_direction: number,
  the_temp: number
});

const location = object({
  title: string,
  time: iso8601,
  consolidated_weather: map(array(consolidatedWeather), weathers =>
    weathers.map(({ wind_speed, wind_direction, the_temp }) => ({
      windSpeed: wind_speed,
      windDirection: wind_direction,
      temperature: the_temp
    }))
  )
});

const locationGuard = guard(
  map(location, ({ consolidated_weather, ...rest }) => ({
    weather: consolidated_weather,
    ...rest
  }))
);

export const decode = locationGuard;
