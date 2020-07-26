export default () => {
  const isSupported = !!navigator.geolocation;

  return {
    isSupported,
    getCurrentPosition: () => {
      if (!isSupported)
        return Promise.reject("Your browser doesn't support geolocation");
      return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(
          currentPosition => {
            resolve(currentPosition);
          },
          error => {
            reject(error);
          }
        )
      );
    }
  };
};
