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

// 마이갤러리 카드 목록 조회
const getMyCardsOfGallery = async () => {
  try {
    const url = '/cards/me/gallery';
    const response = await client.get(url);

    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 카드 상세 정보 조회
const getMyCardOfGallery = async (cardId) => {
  try {
    const url = `/cards/me/gallery/${cardId}`;
    const response = await client.get(url);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

const cardsApi = {
  createCard,
  getMyCardsOfGallery,
  getMyCardOfGallery,
};

export default cardsApi;
