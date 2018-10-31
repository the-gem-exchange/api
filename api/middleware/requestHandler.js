exports.handleRequest = (req, res, next) => {
  // Log all calls
  console.log(`${req.method}: ${req.originalUrl}`);

  // Set response headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,HEAD,POST,PUT,PATCH,DELETE');
  res.header('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Headers', 'Content-Type, auth-token, accept, Access-Control-Allow-Headers, Authorization, X-Requested-With');

  next();
};
