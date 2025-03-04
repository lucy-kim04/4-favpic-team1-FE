import { client, errorHandler } from '../client';

const sendNotification = async (dto) => {
  console.log('send notification api', dto);
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

const setToTrueIsReadOfNotification = async (notificationId) => {
  try {
    const url = `/notifications/${notificationId}`;
    const response = await client.patch(url);

    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

const notificationsApi = {
  sendNotification,
  getNotificationsOfMe,
  setToTrueIsReadOfNotification,
};

export default notificationsApi;
