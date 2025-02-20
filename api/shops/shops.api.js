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

const shopsApi = {
  getShops,
};

export default shopsApi;
