import throttled from './throttle.js';
import createDebug from 'debug';
import axios from 'axios-https-proxy-fix';

const debug = createDebug('google-play-scraper');

function doRequest (opts, limit) {
  let req = axios;
  if (limit) {
    req = throttled(axios, {
      interval: 1000,
      limit
    });
  } else {
    req = axios;
  }

  return new Promise((resolve, reject) => {
    req({
      ...opts,
      validateStatus: (status) => status >= 200 && status < 400
    })
      .then((response) => resolve(response.data))
      .catch(reject);
  });
}

async function request (opts, limit) {
  debug('Making request: %j', opts);
  try {
    const response = await doRequest(opts, limit);
    debug('Request finished');
    return response;
  } catch (reason) {
    debug(
      'Request error:',
      reason.message,
      reason.response && reason.response.status
    );

    let message = 'Error requesting Google Play:' + reason.message;
    if (reason.response && reason.response.status === 404) {
      message = 'App not found (404)';
    }
    const err = Error(message);
    err.status = reason.response && reason.response.status;
    throw err;
  }
}

export default request;
