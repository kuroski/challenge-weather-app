import useFetch from "@/hooks/useFetch";
import useGeolocation from "@/hooks/useGeolocation";

export default () => {
  const URL = "https://www.metaweather.com/api/location";

  const searchFromQuery = query => useFetch(`${URL}/search/?query=${query}`);
  const searchFromLatLong = (lat, long) =>
    useFetch(`${URL}/search/?latlong=${lat},${long}`);
  const getFromId = id => useFetch(`${URL}/${id}`);
  const searchfromCurrentPosition = () => {
    const { getCurrentPosition } = useGeolocation();
    return getCurrentPosition().then(currentPosition => {});
  };

  return {
    searchFromQuery,
    searchFromLatLong,
    getFromId,
    searchfromCurrentPosition
  };
};
