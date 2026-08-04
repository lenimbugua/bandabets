import API from "./API";

export default () => ({
  fetchData(endpoint = "/") {
    return API().get(endpoint);
  },
});
