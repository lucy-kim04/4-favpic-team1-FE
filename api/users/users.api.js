import { client } from '../client';

const singUp = async (dto) => {
  const url = '/users/sign-up';
  const response = await client.post(url, dto);

  return response.data;
};

const usersApi = { singUp };

export default usersApi;
