import { client, errorHandler } from '../client';

// 회원가입
const singUp = async (dto) => {
  const url = '/users/sign-up';
  const response = await client.post(url, dto);

  return response.data;
  // try {
  //   const url = '/users/sign-up';
  //   const response = await client.post(url, dto);

  //   return response.data;
  // } catch (error) {
  //   errorHandler(error);
  // }
};

// 로그인
const logIn = async (dto) => {
  const url = '/users/log-in';
  const response = await client.post(url, dto);

  const { accessToken, refreshToken } = response.data;

  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);

  return response.data;
  // try {
  //   const url = '/users/log-in';
  //   const response = await client.post(url, dto);

  //   const { accessToken, refreshToken } = response.data;

  //   localStorage.setItem('accessToken', accessToken);
  //   localStorage.setItem('refreshToken', refreshToken);

  //   return response.data;
  // } catch (error) {
  //   errorHandler(error);
  // }
};

// 토큰 재발급
const refreshToken = async (prevRefreshToken) => {
  try {
    const url = '/users/refresh-token';
    const response = await client.post(url, { prevRefreshToken });

    const { accessToken, refreshToken } = response.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 닉네임 중복 체크
const checkIsAvailableNickname = async (nickname) => {
  try {
    const url = '/users/check-nickname';
    const response = await client.post(url, nickname);

    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 내 정보 조회
const getMe = async () => {
  try {
    const url = '/users/me';
    const response = await client.get(url);

    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 포인트 추가
const addPoint = async (point) => {
  try {
    const url = '/users/me/point';
    const response = await client.put(url, { point });

    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 마지막 랜덤 박스 추첨 시각 기록
const recordLastDrawingTime = async () => {
  try {
    const url = '/users/me/record-time';
    const response = await client.put(url);

    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 마이갤러리 상단의 summary count 조회
const getMyGallerySummary = async () => {
  console.log('do gallery');
  try {
    const url = '/users/me/gallery-summary';
    const response = await client.get(url);

    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 나의 판매 포토카드 상단의 summary count 조회
const getMySalesSummary = async () => {
  console.log('do sales');
  try {
    const url = '/users/me/sales-summary';
    const response = await client.get(url);

    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

const usersApi = {
  singUp,
  logIn,
  refreshToken,
  checkIsAvailableNickname,
  getMe,
  addPoint,
  recordLastDrawingTime,
  getMyGallerySummary,
  getMySalesSummary,
};

export default usersApi;
