class LinkError extends Error {
  constructor(message) {
    super(message);
    this.name = 'LinkError';
  }
}

export default LinkError;
