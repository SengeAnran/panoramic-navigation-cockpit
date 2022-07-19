import axios from '@/utils/axios';

export const getAll = (stime, etime, val, village = '') => {
  return axios.get('/api/448/get', {
    params: { startTime: stime, endTime: etime, keyWord: `%${val}%`, village: village },
  });
};

export const AllCommunities = () => {
  return axios.get('/api/459/get');
};
