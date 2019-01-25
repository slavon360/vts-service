import axios from '../utils/axios';

export function get(url, data = {}, options = {}) {
  return axios.get(url, { params: data, ...options });
}