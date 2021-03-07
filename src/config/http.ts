import axios from 'axios';
import Config from 'react-native-config';

// axios.defaults.baseURL = Config.API_URL;
axios.defaults.baseURL = "http://192.168.1.102:3000";
// console.log(Config.API_URL,"Config.API_URL")
// axios.defaults.baseURL = 'http://192.168.31.31:3000';
axios.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    // console.log(error,"error1")
    return Promise.reject(error);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // console.log('------response', response);
    return response.data;
  },
  function(error) {
    // console.error(error,"error2")
    // Do something with response error
    return Promise.reject(error);
  },
);
