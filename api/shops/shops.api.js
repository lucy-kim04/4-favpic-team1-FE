import { client, errorHandler } from '../client';

// 상점 shop 목록 조회
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

const shopsApi = {
  getShops,
  getShop,
  purchaseCards,
};

export default shopsApi;
