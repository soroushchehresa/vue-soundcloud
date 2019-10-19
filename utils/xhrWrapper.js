import axios from 'axios';
import qs from 'qs';

export default ({ method, url, data, query }) => new Promise((resolve, reject) => {
  const queryStrings = qs.stringify({
    ...query,
    client_id: process.env.SOUNDCLOUD_CLIENT_ID,
  });
  function checkStatus(response, resolve, reject) {
    const { status, data } = response;
    if (status >= 200 && status < 300) {
      return resolve(data);
    }
    return reject(data);
  }
  axios(`https://api.soundcloud.com/${url}?${queryStrings}`, {
    method,
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    data: JSON.stringify(data),
  })
    .then(response => checkStatus(response, resolve, reject))
    .catch(error => checkStatus(error, resolve, reject))
    .catch(reject);
});
