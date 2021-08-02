import React, { useReducer, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Overview from './Overview/Overview.jsx';
import RelatedItems from './RelatedAndOutfit/RelatedAndOutfit.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews.jsx';
import { getReviewsMeta } from '../reviewRequest.js';
import calculateRating from '../helper.js';

const initialState = {
  productId: 13023,
  ratingsBreakDown: {
    oneStar: 0,
    twoStar: 0,
    threeStar: 0,
    fourStar: 0,
    fiveStar: 0,
    averageRatings: 0,
    totalReviews: 0,
  },
  recommended: { "false": 0, "true": 0 },
  characteristics: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'changeProductId':
      return { ...state, productId: action.data };
    case 'updateRatingsBreakDown':
      return { ...state, ratingsBreakDown: action.data };
    case 'updateRecommended':
      return { ...state, recommended: action.data };
    case 'updateCharacteristics':
      return { ...state, characteristics: action.data };
    default:
      return state;
  }
};

export const globalContext = React.createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    getReviewsMeta(state.productId)
      .then((res) => {
        // console.log(res);
        dispatch({ type: 'updateRecommended', data: res.recommended });
        dispatch({ type: 'updateCharacteristics', data: res.characteristics });
        dispatch({ type: 'updateRatingsBreakDown', data: calculateRating(res.ratings) });
      })
      .catch((err) => {
        console.log('review star data fetching error', err);
      });
  }, [state.productId]);
  return (
    <div>
      <globalContext.Provider value={{ state, dispatch }}>
        <Overview />
        <RelatedItems />
        <QuestionsAndAnswers />
        <RatingsAndReviews />
      </globalContext.Provider>
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById('app'));
