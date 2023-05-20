const jwt = require('jsonwebtoken');
const config = process.env;

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers['x-access-token'] || req.query.token || req.body.token || req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    const decoded = await jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { auth };