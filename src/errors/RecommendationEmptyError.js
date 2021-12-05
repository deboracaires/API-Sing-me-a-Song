class RecommendationEmptyError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RecommendationEmptyError';
  }
}

export default RecommendationEmptyError;
