import Axios from 'axios';

const axios = Axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
    responseType: 'json'
});

axios.interceptors.response.use(
    response => response,
    async (err) => {
        const { error, config, code, request, response } = err;
        console.log(error, config, code, request, response);
    }
);

export default axios;
