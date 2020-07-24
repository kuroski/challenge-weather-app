import useFetch from "@/hooks/useFetch";
import useGeolocation from "@/hooks/useGeolocation";
import * as locationDecoder from "@/decoders/location";
import * as searchDecoder from "@/decoders/search";

export default () => {
  // const URL = "https://www.metaweather.com/api/location";
  const URL =
    "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location";

  const searchFromQuery = query =>
    useFetch(`${URL}/search/?query=${query}`, {
      decoder: searchDecoder.decode
    });
  const searchFromLatLong = (lat, long) =>
    useFetch(`${URL}/search/?latlong=${lat},${long}`);
  const getFromId = id =>
    useFetch(`${URL}/${id}`, { decoder: locationDecoder.decode });
  const searchfromCurrentPosition = async () => {
    const { getCurrentPosition } = useGeolocation();
    try {
      const position = await getCurrentPosition();
      console.log(position);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    searchFromQuery,
    searchFromLatLong,
    getFromId,
    searchfromCurrentPosition
  };
};
