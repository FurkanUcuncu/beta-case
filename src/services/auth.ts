import { api } from './api';

const sessionId = () => {
  return api({
    url: '/createsession',
    method: 'GET',
  });
};

const authServices = {
  sessionId,
};

export default authServices;
