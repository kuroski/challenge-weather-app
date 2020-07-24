import {
  guard,
  number,
  object,
  string,
  map,
  compose,
  tuple2,
  array
} from "decoders";

const toNumberTuple = map(string, value => value.split(",").map(Number));

const result = object({
  woeid: number,
  title: string,
  location_type: string,
  latt_long: compose(toNumberTuple, tuple2(number, number))
});

const resultList = map(
  result,
  ({ woeid, location_type, latt_long, ...rest }) => ({
    id: woeid,
    locationType: location_type,
    lat: latt_long[0],
    long: latt_long[1],
    ...rest
  })
);

const searchGuard = guard(array(resultList));

export const decode = searchGuard;
