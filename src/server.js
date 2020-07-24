import { Server, Model, Factory } from "miragejs";
import faker from "faker";
import { format, addDays } from "date-fns";

const consolidatedWeatherFactory = (props = {}) => {
  const date = props?.applicable_date || new Date(faker.date.future());
  const applicable_date = format(date, "yyyy-MM-dd");

  return {
    id: faker.random.number(),
    wind_speed: faker.random.number(),
    wind_direction: faker.random.number(),
    wind_direction_compass: faker.random.arrayElement([
      "N",
      "NE",
      "E",
      "SE",
      "S",
      "SW",
      "W",
      "NW"
    ]),
    humidity: faker.random.number(),
    visibility: faker.random.number(),
    air_pressure: faker.random.number(),
    the_temp: faker.random.number(),
    max_temp: faker.random.number(),
    min_temp: faker.random.number(),
    weather_state_name: faker.random.arrayElement([
      "Snow",
      "Sleet",
      "Hail",
      "Thunderstorm",
      "Heavy Rain",
      "Light Rain",
      "Showers",
      "Heavy Cloud",
      "Light Cloud"
    ]),
    ...props,
    applicable_date
  };
};

export function makeServer() {
  return new Server({
    timing: process.env.NODE_ENV === "development" ? 2000 : 0,
    logging: process.env.NODE_ENV === "development",
    environment: process.env.NODE_ENV,
    models: {
      weather: Model
    },
    factories: {
      weather: Factory.extend({
        title: faker.address.country(),
        consolidated_weather: [...Array(6)].reduce((acc, _value, index) => {
          if (!index) {
            return [
              ...acc,
              consolidatedWeatherFactory({
                applicable_date: Date.now(),
                id: index
              })
            ];
          }

          return [
            ...acc,
            consolidatedWeatherFactory({
              applicable_date: addDays(Date.now(), index),
              id: index
            })
          ];
        }, [])
      })
    },
    seeds(server) {
      server.createList("weather", 5);
    },
    routes() {
      this.urlPrefix = "https://www.metaweather.com";
      this.namespace = "/api";

      this.get("/location/:id", schema => {
        return schema.weathers.first().attrs;
      });

      this.get("/location/search/", () => [
        {
          title: "London",
          location_type: "City",
          woeid: 44418,
          latt_long: "51.506321,-0.12714"
        },
        {
          title: "Barcelona",
          location_type: "City",
          woeid: 753692,
          latt_long: "41.385578,2.168740"
        },
        {
          title: "Long Beach",
          location_type: "City",
          woeid: 2441472,
          latt_long: "33.766720,-118.192398"
        }
      ]);
    }
  });
}
