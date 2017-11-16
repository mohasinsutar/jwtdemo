var jwt = require('jsonwebtoken');
function verifytoken(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    console.log("jwt token found");
    jwt.verify(req.headers.authorization.split(' ')[1], jwtkey, function (err, decode) {
      if (err) {
        res.status(401).send({ status: 'error', message: 'invalid jwt authorization token' });
      }
      else {
        console.log(decode);
        next();
      }
    });
  } else {
    console.log("jwt token not found setting user = undefined");
    //req.user = undefined;
    //next();
    return res.status(401).send({ status: 'error', message: 'No Authorization token provided' });
  }
}
module.exports = verifytoken;