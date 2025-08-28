const { userLoginService } = require('../model/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.handleRefreshToken = async (req, res, next) => {
  const cookies = req.cookies;
  try {
    if (!cookies?.jwt) {
      console.log("Brak ciasteczek");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const refreshToken = cookies.jwt;
    console.log("Odebrany refreshToken:", refreshToken);

    const decoded = jwt.decode(refreshToken);
    if (!decoded?.login) {
      return res.status(403).json({ message: "Invalid token structure" });
    }

    const user = await userLoginService(decoded.login);
    if (!user || user.length === 0) {
      return res.status(403).json({ message: "User not found" });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || user.login !== decoded.login) {
          return res.status(403).json({ message: "Forbidden" });
        }

        const accessToken = jwt.sign(
          { login: decoded.login },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '10s' }
        );

        res.json({ accessToken });
      }
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
