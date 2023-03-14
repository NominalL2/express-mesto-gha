class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class IncorrectError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class ExistsEmailError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = {
  NotFoundError,
  IncorrectError,
  ExistsEmailError,
};
