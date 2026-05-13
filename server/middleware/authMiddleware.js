import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (decode.userId) {
      req.user = {
        user_id: decode.userId,
      };
    }

    next();
  } catch (error) {
    console.error(error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default authMiddleware;