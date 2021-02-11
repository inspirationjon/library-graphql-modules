const { verify } = require('../lib/jwt');

const middleware = async (token, data) => {
    const payload = await verify(token);

    if (payload.role === 0) {
        return data;
    }
};

module.exports = { middleware };
