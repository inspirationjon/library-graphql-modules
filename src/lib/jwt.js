const { sign, verify } = require('jsonwebtoken');

const SECRET_KEY = 'jubajuba';

module.exports = {
  sign: (payload) => sign(payload, SECRET_KEY),
  verify: (payload) => verify(payload, SECRET_KEY),
};
