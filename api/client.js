import axios from 'axios';

const baseURL = 'http://localhost:5050';

export const client = axios.create({
  baseURL,
});
