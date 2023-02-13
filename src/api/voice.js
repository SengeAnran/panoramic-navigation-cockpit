import axios from '@/utils/axios-for-voice';

// 获取语音文字
export const getVoiceTxt = (data, config) => {
  return axios.request({
    method: 'POST',
    url: '/all',
    data,
    ...config,
  });
};
