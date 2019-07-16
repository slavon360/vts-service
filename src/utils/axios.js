import Axios from 'axios';

const axios = Axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
    responseType: 'json'
});

axios.interceptors.request.use((config) => {
    return config;
  });

axios.interceptors.response.use(
    response => response,
    async (err) => {
        const { error, config, code, request, response } = err;
        console.log(error, config, code, request, response, new Error(err));
        return response;
    }
);

export default axios;