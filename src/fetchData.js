import axios from 'axios';

// https://randomuser.me/api/?results=20  

const apiURL = import.meta.env.VITE_API_URL;

export const fetchData = async () => {
  try {
    const { data: { results }} = await axios.get(`${apiURL}`);
    //console.log(results);
    return results;
  } catch (error) {
    console.error(error);
  }
}
