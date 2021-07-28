/*
 * input: ratings, an object e.g. {"1": 43, "2": 15, "3": 8, "2": 4, "1": 10}
* output: ratingsBreakDown
*/

const calculateRating = (ratings) => {
  // console.log('input', ratings);
  const oneStar = ratings['1'] ? parseInt(ratings['1'], 10) : 0;
  const twoStar = ratings['2'] ? parseInt(ratings['2'], 10) : 0;
  const threeStar = ratings['3'] ? parseInt(ratings['3'], 10) : 0;
  const fourStar = ratings['4'] ? parseInt(ratings['4'], 10) : 0;
  const fiveStar = ratings['5'] ? parseInt(ratings['5'], 10) : 0;
  const totalReviews = oneStar + twoStar + threeStar + fourStar + fiveStar;
  const totalScores = oneStar + twoStar * 2 + threeStar * 3 + fourStar * 4 + fiveStar * 5;
  const averageRatings = (totalScores / totalReviews);
  const ratingsBreakDown = {
    oneStar,
    twoStar,
    threeStar,
    fourStar,
    fiveStar,
    averageRatings,
    totalReviews,
  };
  return ratingsBreakDown;
};

module.exports = calculateRating;
