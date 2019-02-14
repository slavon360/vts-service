import axios from '../utils/axios';
import axiosCurrency from '../utils/axiosCurrency';
import jsonp from 'jsonp';

export function getFromAxios(url, data = {}, options = {}) {
  return axios.get(url, { params: data, ...options });
}

export function postFromAxios(url, body = {}, options = {}) {
  return axios.post(url, body, options);
}

export function getFromJSONPCurrency(url) {
  jsonp(url, null, (err, data) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(data);
    }
  });
}

export function getFromAxiosCurrency(url, data = {}, options = {}) {
  return axiosCurrency.get(url, { params: data, ...options })
}