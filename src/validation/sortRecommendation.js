async function sortRecommendation(highScore, lowScore) {
  const probSort = [0, 0, 0, 0, 0, 0, 0, 1, 1, 1];
  const randomNumber = Math.floor(Math.random() * (9 - 0 + 1)) + 0;

  if (probSort[randomNumber] === 0) {
    const randNumber = Math.floor(Math.random() * ((highScore.length - 1) - 0 + 1)) + 0;
    return highScore[randNumber];
  }
  const randNumber = Math.floor(Math.random() * ((lowScore.length - 1) - 0 + 1)) + 0;
  return lowScore[randNumber];
}

export default sortRecommendation;
