import axios from 'axios';

export const callEndPoint = async (data) => {
  return await axios
    .post('https://rickandmortyapi.com/api/character/2', data)
    .then((response) => response.data);
};
