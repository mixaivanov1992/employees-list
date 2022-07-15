import axios from 'axios';

export const API_URL = 'https://dummy.restapiexample.com/api/v1';
const $api = axios.create({
    baseURL: API_URL,
});

export default $api;