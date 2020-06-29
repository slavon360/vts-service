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
        const { response: { data: { error: { message } } } } = err;
        console.log('interceptors.response');
        console.log(new Error(err));
        return Promise.reject(message);
    }
);

export default axios;
