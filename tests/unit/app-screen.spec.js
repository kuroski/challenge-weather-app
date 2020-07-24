import App from "@/App.vue";
import { renderWithDependencies, flushPromises } from "@tests/helpers";
import { format } from "date-fns";
import * as locationDecoder from "@/decoders/location";
import { within, isInaccessible } from "@testing-library/vue";

const WEATHER_STATUS = {
  "weather.snow": "Snow",
  "weather.sleet": "Sleet",
  "weather.hail": "Hail",
  "weather.thunderstorm": "Thunderstorm",
  "weather.heavyRain": "Heavy Rain",
  "weather.lightRain": "Light Rain",
  "weather.showers": "Showers",
  "weather.heavyCloud": "Heavy Cloud",
  "weather.lightCloud": "Light Cloud"
};

test("renders all weather information", async () => {
  const expectedWeather = locationDecoder.decode(
    global.server.create("weather").attrs
  );

  const { getByText, getByTestId } = renderWithDependencies(App);
  await flushPromises();

  const weatherIcon = within(getByTestId("weather-summary")).getByAltText(
    WEATHER_STATUS[expectedWeather.weather.state]
  );
  const temperature = getByText(expectedWeather.weather.temperature.toString());
  const cityTitle = getByText(expectedWeather.title);
  const currentDate = getByText(format(Date.now(), "eee, MMM dd"));
  const windSpeed = getByText(expectedWeather.weather.windSpeed.toString());
  const windCompass = getByText(expectedWeather.weather.windDirectionCompass);
  const humidity = getByText(expectedWeather.weather.humidity.toString());
  const visibility = getByText(expectedWeather.weather.visibility.toString());
  const airPressure = getByText(expectedWeather.weather.airPressure.toString());

  expect(weatherIcon).toBeInTheDocument();
  expect(isInaccessible(weatherIcon)).toBe(true);
  expect(temperature).toBeInTheDocument();
  expect(cityTitle).toBeInTheDocument();
  expect(currentDate).toBeInTheDocument();

  expectedWeather.history.forEach(item => {
    const weatherTile = within(getByTestId(`weather-tile-${item.id}`));
    const tileDate = format(item.date, "eee, MMM dd");
    const tileIcon = weatherTile.getByAltText(WEATHER_STATUS[item.state]);

    expect(weatherTile.getByText(tileDate)).toBeInTheDocument();
    expect(tileIcon).toBeInTheDocument();
    expect(isInaccessible(tileIcon)).toBe(true);
    expect(
      weatherTile.getByText(item.minTemperature.toString(), { exact: false })
    ).toBeInTheDocument();
    expect(
      weatherTile.getByText(item.maxTemperature.toString(), { exact: false })
    ).toBeInTheDocument();
  });

  expect(windSpeed).toBeInTheDocument();
  expect(windCompass).toBeInTheDocument();
  expect(humidity).toBeInTheDocument();
  expect(visibility).toBeInTheDocument();
  expect(airPressure).toBeInTheDocument();
});

test("renders loading screen", async () => {
  locationDecoder.decode(global.server.create("weather").attrs);

  const { getByAltText, queryByAltText } = renderWithDependencies(App);

  expect(getByAltText("Loading...")).toBeInTheDocument();

  await flushPromises();

  expect(queryByAltText("Loading...")).not.toBeInTheDocument();
});
