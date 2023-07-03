export const ERRORMSG = {
  INVALID_ID: 'Invalid user ID',
  INVALID_BODY: 'Invalid request body',
  USER_NOT_FOUND: 'User not found',
  ROUTE_NOT_FOUND: 'Route not found',
  SERVER_ERROR: 'Internal server error'
}


export const badRequestError = (res, msg) => {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: msg }));
}

export const notFoundError = (res, msg) => {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: msg }));
}

export const internalError = (res) => {
  res.writeHead(500, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: ERRORMSG.SERVER_ERROR }));
}
