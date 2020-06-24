const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  //console.log("authMw")
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1];
    //console.log("0")
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    //console.log("1")
    const username = decodedToken.username;
    console.log(username)
    if (req.username && req.username !== username) {
      throw 'Invalid user info';
    } else {
      next();
    }
  } catch(e) {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};