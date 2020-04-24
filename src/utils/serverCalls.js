import axios from "axios";

const axiosGetData = url => {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const serverUrl = __NODE_ENV__ === "development" ? url : proxyUrl + url;

  return axios.get(serverUrl);
};

export { axiosGetData };
