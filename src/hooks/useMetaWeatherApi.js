import useFetch from "@/hooks/useFetch";
import useGeolocation from "@/hooks/useGeolocation";
import * as locationDecoder from "@/decoders/location";

export default () => {
  const URL = "https://www.metaweather.com/api/location";

  const searchFromQuery = query => useFetch(`${URL}/search/?query=${query}`);
  const searchFromLatLong = (lat, long) =>
    useFetch(`${URL}/search/?latlong=${lat},${long}`);
  const getFromId = id =>
    useFetch(`${URL}/${id}`, { decoder: locationDecoder.decode });
  const searchfromCurrentPosition = () => {
    const { getCurrentPosition } = useGeolocation();
    return getCurrentPosition().then(data => {
      console.log(data);
    });
  };

  return {
    searchFromQuery,
    searchFromLatLong,
    getFromId,
    searchfromCurrentPosition
  };
};
