import axios from 'axios';
import store from 'store';

const axiosAlt = async ({ endPoint, method, data, fullData, token }) => {
  const localUrl = 'http://localhost:5000/adverwriting/us-central1/api';
  const publicUrl = 'https://us-central1-adverwriting.cloudfunctions.net/api';
  const app = store.get('app');

  try {
    const config = {
      url: localUrl + endPoint,
      headers: {
        'Content-Type': 'application/json',
      },
      method,
    };

    if (token) {
      config.headers.Authorization = `Bearer ${app && app.token}`;
    }

    if (data) {
      config.data = data;
    }

    const res = await axios(config);
    return res;
  } catch ({ response }) {
    console.error(response);
    return response;
  }
};

export default axiosAlt;
