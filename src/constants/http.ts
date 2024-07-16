const HTTPCode = {
  BAD_REQUEST: 400,
  CREATED: 201,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
  NOT_FOUND: 404,
  OK: 200,
  UNAUTHORIZED: 401,
  UNPROCESSED_ENTITY: 422
} as const;

const HTTPMethod = {
  DELETE: 'DELETE',
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT'
} as const;

const ExceptionName = {
  HTTP_ERROR: 'HTTPError'
} as const;

const HttpHeader = {
  AUTHORIZATION: 'authorization',
  CONTENT_TYPE: 'content-type'
} as const;

const ContentType = {
  JSON: 'application/json'
} as const;

export {
  HTTPCode,
  HTTPMethod,
  ExceptionName,
  HttpHeader,
  ContentType
};
