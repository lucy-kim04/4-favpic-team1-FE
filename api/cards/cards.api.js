import { client, errorHandler } from '../client';

const createCard = async (dto) => {
  try {
    const { name, grade, genre, price, issuedQuantity, imgUrl, description } =
      dto;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('grade', grade);
    formData.append('genre', genre);
    formData.append('price', price);
    formData.append('issuedQuantity', issuedQuantity);
    formData.append('imgUrl', imgUrl);
    formData.append('description', description);

    const url = '/cards';
    const response = await client.post(url, formData);

    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

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
  createCard,
  getMyCardsOfGallery,
};

export default cardsApi;
