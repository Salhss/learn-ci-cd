module.exports = (error, req, res, next) => {
  let message = "Internal Server Error";
  let status = 500;

  switch (error.name) {
    case "Empty Fields":
      status = 400;
      message = "do not empty inputs";
      break;

    default:
      break;
  }
  res.status(status).json({ message: message });
};
