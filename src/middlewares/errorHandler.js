export const notFoundError = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
export const errorHandler = (error, _req, res, _next) => {
  let statusCode = error.statusCode || 500; // Internal server error
  // Handle Mongoose CastError for ObjectId
  if (error.name === "CastError" && error.kind === "ObjectId" && error.path) {
    statusCode = 400; // Bad request for invalid ObjectId
    error.message = `Invalid ${error.path}: ${error.value}`;
  }

  // Handle Mongoose ValidationError
  if (error.name === "ValidationError") {
    statusCode = 400; // Bad request for validation errors
    const errors = Object.values(error.errors).map((value) => value.message);
    error.message = `Validation errors: ${errors.join(", ")}`;
  }

  // Handle Mongoose duplicate key error
  if (error.code === 11000) {
    statusCode = 400; // Bad request for duplicate key error
    error.message = `Duplicate field value entered`;
  }

  res.status(statusCode).json({
    status: false,
    statusCode: statusCode,
    message: error.message,
    data: null,
    stack: process.env.NODE_ENV === "production" ? "🥞" : error.stack,
  });
};

export class appError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
