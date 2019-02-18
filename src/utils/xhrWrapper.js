import fetch from 'axios';
import qs from 'qs';

const methods = ['get', 'post', 'put', 'patch', 'del', 'head'];

class Client {
  constructor() {
    methods.forEach((method) => {
      this[method] = Client.requestWrapper(method);
    });
  }

  static requestWrapper(method) {
    async function decorateRequest({ url, data, query }) {
      const queryStrings = qs.stringify({
        ...query,
        client_id: process.env.SOUNDCLOUD_CLIENT_ID,
      });
      return {
        request: {
          method,
          headers: { 'Content-Type': 'application/json; charset=UTF-8' },
          data: JSON.stringify(data),
        },
        requestURL: `https://api.soundcloud.com/${url}?${queryStrings}`,
      };
    }

    function checkStatus(response, resolve, reject) {
      const { status, data } = response;
      if (status >= 200 && status < 300) {
        return resolve(data);
      }
      return reject(data);
    }

    return async ({ url, data = null, query }) => {
      const { requestURL, request } = await decorateRequest({
        method,
        url,
        data,
        query,
      });
      return new Promise((resolve, reject) => {
        fetch(requestURL, request)
          .then(response => checkStatus(response, resolve, reject))
          .catch(error => checkStatus(error, resolve, reject))
          .catch(reject);
      });
    };
  }
}

export default new Client();
