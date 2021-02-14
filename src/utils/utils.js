const { verify } = require('../lib/jwt');

const middleware = async (token, data) => {
    const payload = await verify(token);

    if (payload.role === 1) {
        return data;
    }
};

module.exports = { middleware };
