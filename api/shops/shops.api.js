import { client, errorHandler } from '../client';

// 상점 생성
const createShop = async (dto) => {
  try {
    const url = '/shops';
    const reponse = await client.post(url, dto);

    return reponse.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 상점 목록 조회
const getShops = async ({
  orderBy = '최신 순',
  grade = '등급',
  genre = '장르',
  onSale = '판매 여부',
  keyword = '',
}) => {
  try {
    const url = '/shops';
    const response = await client.get(url, {
      params: { orderBy, grade, genre, onSale, keyword },
    });

    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 상점 상세 조회
const getShop = async (shopId) => {
  try {
    const url = `/shops/${shopId}`;
    const response = await client.get(url);

    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 상점 삭제(판매 내리기)
const deleteShop = async (shopId) => {
  try {
    const url = `/shops/${shopId}`;
    const response = await client.delete(url);

    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 상점에서 카드 구매하기
const purchaseCards = async (shopId, dto) => {
  try {
    const url = `/shops/${shopId}/purchase`;
    const response = client.post(url, dto);

    return (await response).data;
  } catch (error) {
    errorHandler(error);
  }
};

// 상점의 교환 제시 목록 불러오기
const getExchangesOfShop = async (shopId) => {
  try {
    const url = `/shops/${shopId}/exchanges`;
    const response = client.get(url);

    return (await response).data;
  } catch (error) {
    errorHandler(error);
  }
};

const shopsApi = {
  createShop,
  getShops,
  getShop,
  deleteShop,
  purchaseCards,
  getExchangesOfShop,
};

export default shopsApi;
