const errorMiddleware = (
  err,
  req,
  res,
  next
) => {
  console.error("ERROR:", err);

  let statusCode = err.statusCode || 500;
  let message =
    err.message || "Internal Server Error";

  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  if (err.code === "23505") {
    statusCode = 409;
    message = "Duplicate entry";
  }

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorMiddleware;