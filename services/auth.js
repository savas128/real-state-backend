const jwt = require('jsonwebtoken');
const ac = require("../access-control/roles");

const authUser = (req) => {
    const token = req.cookies["mdbjwt"];
    if (!token) return { isLogged: false };

    try {
        const credentials = jwt.verify(token, 'thatisbarry');
        return credentials;
    } catch (error) {
        return { isLogged: false };
    }
}

const grantAccessWithCondition = async (role ,action, resource, context) => {
    try {
      const permission = await ac.can(role).context(context).execute(action).on(resource);
      if (!permission.granted) {
        return false;
      }
      return true;
    } catch (error) {
      throw error;
    }
  }

module.exports = {
    authUser,
    grantAccessWithCondition
};