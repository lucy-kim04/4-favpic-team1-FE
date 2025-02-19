const { client } = require('../client');

const getShops = async () => {
  const url = '/shops';
  const response = await client.get(url);

  return response.data;
};

const shopsApi = {
  getShops,
};

export default shopsApi;
