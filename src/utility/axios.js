import axios from 'axios';
import store from 'store';

const axiosAlt = async ({ endPoint, method, data, fullData, token }) => {
  const localUrl = 'http://localhost:5000/adverwriting/us-central1/api';
  const publicUrl = 'https://us-central1-adverwriting.cloudfunctions.net/api';
  try {
    const config = {
      url: localUrl + endPoint,
      headers: {
        'Content-Type': 'application/json',
      },
      method,
    };

    if (token) {
      config.headers.Authorization = `Bearer ${store.get('token')}`;
    }

    if (data) {
      config.data = data;
    }

    const res = await axios(config);
    return fullData ? res : res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default axiosAlt;
