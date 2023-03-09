import axios from 'axios';
import {
  BACKEND_URL,
  GET_BLOG_DATA,
  UPDATE_BLOG_DATA,
} from '../../../constants/apiEndPoints';
import { mockBlogData } from '../../../mocks/blogData';
import makeRequest from '..';
import { ERROR_ROUTE } from '../../../constants/routes';

jest.mock('axios');

describe('makeRequest', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should call API with correct request options and return response body when only endpoint is specified', async () => {
    axios.mockResolvedValue({
      data: mockBlogData,
    });
    expect(axios).not.toHaveBeenCalled();
    const response = await makeRequest(GET_BLOG_DATA);
    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios).toHaveBeenCalledWith({
      baseURL: BACKEND_URL,
      url: GET_BLOG_DATA.url,
      method: 'get',
    });
    expect(response).toEqual(mockBlogData);
  });
  it('should call axios with appropriate url, baseURL, method and return response when endpoint and body are specified', async () => {
    axios.mockResolvedValue({
      data: { claps: 1 },
    });
    const response = await makeRequest(UPDATE_BLOG_DATA(1), () => {}, {
      data: { claps: 1 },
    });
    expect(axios).toHaveBeenCalledTimes(1);
    expect(axios).toHaveBeenCalledWith({
      baseURL: BACKEND_URL,
      url: UPDATE_BLOG_DATA(1).url,
      method: 'put',
      data: { claps: 1 },
    });
    expect(response).toEqual({ claps: 1 });
  });
  it('should navigate to error page with status code when API call returns error status code', async () => {
    const mockNavigate = jest.fn();
    axios.mockRejectedValueOnce({ response: { status: 500 } });
    expect(mockNavigate).not.toBeCalled();
    await makeRequest(UPDATE_BLOG_DATA(1), mockNavigate, {
      data: { claps: 1 },
    });
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(`${ERROR_ROUTE}/500`);
  });
  it('should navigate to error page without status code when API call returns error without status code', async () => {
    const mockNavigate = jest.fn();
    axios.mockRejectedValueOnce({});
    expect(mockNavigate).not.toBeCalled();
    await makeRequest(UPDATE_BLOG_DATA(1), mockNavigate, {
      data: { claps: 1 },
    });
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(ERROR_ROUTE);
  });
});
