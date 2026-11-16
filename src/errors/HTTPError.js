// En fejl med en HTTP-statuskode, som controllerne kan kaste (throw).
// Fejlen fanges af errorHandler i src/middleware/errorHandler.js
export class HTTPError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
