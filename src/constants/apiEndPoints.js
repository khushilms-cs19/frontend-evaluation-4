export const BACKEND_URL = 'http://localhost:4000/';
export const AUTH_URL = 'http://localhost:5000/auth/';

export const POST_VALIDATE_JWT = {
  url: 'validate',
  method: 'post',
};

export const POST_USER_REGISTER = {
  url: 'register',
  method: 'post',
};

export const POST_USER_LOGIN = {
  url: 'login',
  method: 'post',
};

export const GET_CONTENT_TYPES = {
  url: 'contentTypes',
  method: 'get',
};

export const POST_CONTENT_TYPE = {
  url: 'contentTypes',
  method: 'post',
};

export const PUT_CONTENT_TYPE = (contentTypeId) => {
  return {
    url: `contentTypes/${contentTypeId}`,
    method: 'put',
  };
};

export const GET_ALL_COLUMNS = (contentTypeId) => {
  return {
    url: `/column/${contentTypeId}`,
    method: 'get',
  };
};

export const PUT_COLUMN = (columnId) => {
  return {
    url: `column/${columnId}`,
    method: 'put',
  };
};

export const POST_COLUMN = {
  url: 'column',
  method: 'post',
};

export const DELETE_COLUMN = (columnId) => {
  return {
    url: `column/${columnId}`,
    method: 'delete',
  };
};


export const GET_COLLECTIONS = (contentTypeId) => {
  return {
    url: `contentTypes/data/${contentTypeId}`,
    method: 'get',
  };
};

export const POST_COLLECTION = (contentTypeId) => {
  return {
    url: `contentTypes/data/${contentTypeId}`,
    method: 'post',
  };
};

export const PUT_COLLECTION = (contentTypeId, collectionId) => {
  return {
    url: `contentTypes/data/${contentTypeId}/${collectionId}`,
    method: 'put',
  };
};

export const DELETE_COLLECTION = (collectionId) => {
  return {
    url: `contentTypes/data/${collectionId}`,
    method: 'delete',
  };
};
