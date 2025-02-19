const { client, errorHandler } = require('../client');

const getMyCardsOfGallery = async () => {
  try {
    const url = '/cards/me/gallery';
    const response = await client.get(url);

    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

const cardsApi = {
  getMyCardsOfGallery,
};

export default cardsApi;
