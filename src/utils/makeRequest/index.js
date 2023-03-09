/* eslint-disable consistent-return */
import axios from 'axios';
import { AUTH_URL, BACKEND_URL } from '../../constants/apiEndPoints';
// import { ERROR_ROUTE } from '../../constants/routes';

const makeRequest = async (
  apiEndPoint,
  navigate = () => { },
  dynamicConfig = {}
) => {
  try {
    const requestDetails = {
      baseURL: BACKEND_URL,
      url: apiEndPoint.url,
      method: apiEndPoint.method,
      ...dynamicConfig,
    };

    const { data } = await axios(requestDetails);
    return data;
  } catch (e) {
    console.log(e);
    if (navigate) {
      // const errorStatus = e.response?.status;
      // if (errorStatus) {
      //   navigate(`${ERROR_ROUTE}/${errorStatus}`);
      // } else {
      //   navigate(ERROR_ROUTE);
      // }
    }
  }
};

const makeRequestAuth = async (
  apiEndPoint,
  dynamicConfig = {}
) => {
  console.log(dynamicConfig);
  const requestDetails = {
    baseURL: AUTH_URL,
    url: apiEndPoint.url,
    method: apiEndPoint.method,
    ...dynamicConfig,
  };

  const { data } = await axios(requestDetails);
  return data;
};

export default makeRequest;
export { makeRequestAuth };
