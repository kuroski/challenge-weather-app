import useFetch from "@/composables/useFetch";
import env from "@/env";
import useGeolocation from "@/composables/useGeolocation";
import * as locationDecoder from "@/decoders/location";
import * as searchDecoder from "@/decoders/search";

export default () => {
  const searchFromQuery = query =>
    useFetch(`${env.apiUrl}/search/?query=${query}`, {
      decoder: searchDecoder.decode
    });
  const searchFromLatLong = (lat, long) =>
    useFetch(`${env.apiUrl}/search/?latlong=${lat},${long}`);
  const getFromId = id => {
    const URL = `${env.apiUrl}/${id}`;
    const { exec, ...rest } = useFetch(URL, {
      decoder: locationDecoder.decode
    });
    return {
      ...rest,
      exec: overrideId => exec(`${env.apiUrl}/${overrideId || id}`)
    };
  };
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
