import axios from 'axios';

const baseURL = 'http://localhost:5050';

export const client = axios.create({
  baseURL,
});

export function errorHandler(error) {
  console.log('AxiosError', error);
  if (error.response) {
    throw new Error(`${error.response.status}: ${error.response.data}`);
  } else {
    throw new Error(error, '요청에 실패하였습니다.');
  }
}
