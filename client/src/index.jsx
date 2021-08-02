import React, { useReducer, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Overview from './Overview/Overview.jsx';
import RelatedItems from './RelatedAndOutfit/RelatedAndOutfit.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews.jsx';
import { getReviewsMeta, getProductInfo } from '../apiRequests.js';
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
  recommended: {},
  characteristics: {},
  name: '',
  category: '',
  features: [],
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
    case 'updateName':
      return { ...state, name: action.data };
    case 'updateCategory':
      return { ...state, category: action.data };
    case 'updateFeatures':
      return { ...state, features: action.data };
    default:
      return state;
  }
};

export const globalContext = React.createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    getProductInfo(state.productId)
      .then((res) => {
        console.log('res: ', res);
        dispatch({ type: 'updateName', data: res.name });
        dispatch({ type: 'updateCategory', data: res.category });
        dispatch({ type: 'updateFeatures', data: res.features });
      })
      .catch((err) => {
        console.log('product info data fetch error', err);
      });
    getReviewsMeta(state.productId)
      .then((res) => {
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
