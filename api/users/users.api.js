import { client, errorHandler } from '../client';

// 회원가입
const singUp = async (dto) => {
  try {
    const url = '/users/sign-up';
    const response = await client.post(url, dto);

    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 로그인
const logIn = async (dto) => {
  try {
    const url = '/users/log-in';
    const response = await client.post(url, dto);

    const { accessToken, refreshToken } = response.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 토큰 재발급
const refreshToken = async (prevRefreshToken) => {
  try {
    const url = '/users/refresh-token';
    const response = await client.post(url, prevRefreshToken);

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

const usersApi = {
  singUp,
  logIn,
  refreshToken,
  checkIsAvailableNickname,
  getMe,
};

export default usersApi;
