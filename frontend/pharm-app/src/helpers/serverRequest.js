import { useCallback } from 'react';
import { BASE_URL } from '../constants';

const useServerRequest = (setGlobalLoading) => {
  const token = JSON.parse(localStorage.getItem('tokens'))?.token;
  let baseUrl = BASE_URL;
  /**
   * Main function to make server request
   *
   * requestURL - String - required
   * requestStr - String - required. You need to put here String not Object please use JSON.stringify.
   * method - String - (optional) - default "POST"
   * isProtected - Boolean - (optional) - default true. Use this flag when trying to get/set/put data.
   */
  const getRequest = useCallback(
    (requestURL, requestStr, method, isProtected) => {
      setGlobalLoading(true);
      return new Promise((resolve) => {
        serverRequest(token, baseUrl + requestURL, requestStr, method, isProtected)
          .then(({ _, data, status }) => {
            setGlobalLoading(false);
            resolve({ ...data, status });
          })
          .catch((e) => {
            console.log(e);
          });
      });
    },
    [setGlobalLoading, token, baseUrl]
  );

  return { getRequest };
};

const serverRequest = async (token, requestURL, requestStr, method = 'POST', isProtected = true) => {
  let response;
  try {
    response = await fetch(requestURL, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token && isProtected ? token : undefined,
      },
      body: method === 'GET' ? undefined : requestStr,
    });
    const status = response.status;
    const data = await response.json();

    if (data.error !== undefined) {
      return { res: 'error', data: data.error, status };
    } else {
      return { res: 'success', data: data, status };
    }
  } catch (error) {
    return { res: 'error', data: { code: 'Сервер не доступен', message: '' } };
  }
};

export default useServerRequest;
