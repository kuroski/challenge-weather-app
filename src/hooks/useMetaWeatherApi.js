import useFetch from "@/hooks/useFetch";
import env from "@/env";
import useGeolocation from "@/hooks/useGeolocation";
import * as locationDecoder from "@/decoders/location";
import * as searchDecoder from "@/decoders/search";

export default () => {
  const searchFromQuery = query =>
    useFetch(`${env.apiUrl}/search/?query=${query}`, {
      decoder: searchDecoder.decode
    });
  const searchFromLatLong = (lat, long) =>
    useFetch(`${env.apiUrl}/search/?latlong=${lat},${long}`);
  const getFromId = id =>
    useFetch(`${env.apiUrl}/${id}`, { decoder: locationDecoder.decode });
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
