import { client, errorHandler } from '../client';

const sendNotification = async (dto) => {
  console.log('do!!!!', dto);
  try {
    const url = '/notifications';
    const response = await client.post(url, dto);

    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

const getNotificationsOfMe = async () => {
  try {
    const url = '/notifications/me';
    const response = await client.get(url);

    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

const notificationsApi = {
  sendNotification,
  getNotificationsOfMe,
};

export default notificationsApi;
