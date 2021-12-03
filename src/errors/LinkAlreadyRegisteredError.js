class LinkAlreadyRegisteredError extends Error {
  constructor(message) {
    super(message);
    this.name = 'LinkAlreadyRegisteredError';
  }
}

export default LinkAlreadyRegisteredError;
