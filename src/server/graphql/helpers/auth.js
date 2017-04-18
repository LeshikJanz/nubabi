// @flow
type Request = {
  headers: {
    [key: string]: any
  }
}

export function getTokenFromRequest(request: Request) {
  let token = null;

  if (request.headers.authorization) {
    // Bearer <Token>
    token = request.headers.authorization.split(' ')[1];
  }

  return {
    token,
  };
}
