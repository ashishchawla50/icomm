import Axios from 'axios';
export const getMessageData = () => {
  const uri ="http://localhost:3000/data"
  return Axios.request({
    url: uri,
    method: 'get',
  });
};
