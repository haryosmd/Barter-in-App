const errorHandler = (err, req, res, next) => {
  console.log(err)
  let code = 500;
  let msg = "Internal server error";
  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    msg = err.errors[0].message;
  } else if (err.message === "INVALID_USER") {
    code = 401;
    msg = "Invalid email/password";
  } else if (err.message === "NOT_FOUND") {
    code = 404;
    msg = "Item not found";
  } else if (err.message === "FORBIDDEN") {
    code = 403;
    msg = "Forbidden to access source";
  } else if (err.message === "NO_INPUT_PASSWORD") {
    code = 400;
    msg = "Must input password";
  } else if (err.message === "NO_INPUT_EMAIL") {
    code = 400;
    msg = "Must input email";
  } else if (
    err.message === "INVALID_TOKEN" ||
    err.message === "jwt malformed" ||
    err.name === "JsonWebTokenError"
  ) {
    code = 401;
    msg = "You are not authorized";
  } else if (err.message === "ROOM_NOT_FOUND") {
    code = 404;
    msg = "Room barter not found";
  }
  res.status(code).json({ message: msg });
};

module.exports = errorHandler;

// app.use((err, req, res, next) => {
//   let code = 500
//   let msg = 'Internal server error'
//   if(err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
//     code = 400
//     msg = {message: err.errors[0].message}
//   } else if (err.message === "INVALID_USER") {
//     code = 401
//     msg = {message: "Invalid email/password"}
//   } else if (err.message === "NOT_FOUND") {
//     code = 404
//     msg = {message: "Data not found"}
//   } else if (err.message === "FORBIDDEN") {
//     code = 403
//     msg = {message: "You are not authorized"}
//   } else if (err.name === "JsonWebTokenError") {
//     code = 401
//     msg = {message: "Invalid token"}
//   }
//   res.status(code).json(msg)
// })
