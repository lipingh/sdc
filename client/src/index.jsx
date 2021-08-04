import React, { useReducer, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Overview from './Overview/Overview.jsx';
import RelatedItems from './RelatedAndOutfit/RelatedAndOutfit.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews.jsx';
import { getReviewsMeta, getProductInfo } from '../apiRequests.js';
import calculateRating from '../helper.js';
import outfitHelpers from './RelatedAndOutfit/helpers.js';
import './global.css';

const initialState = {
  productId: 13027,
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
  outfits: [],
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
    case 'updateOutfitIds':
      return { ...state, outfits: action.data };
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
    dispatch({ type: 'updateOutfitIds', data: outfitHelpers.getOutfits() });
  }, [state.productId]);

  const [theme, setTheme] = useState(true);
  const handleTheme = () => {
    setTheme((prev) => !prev);
  };

  return (
    <div className={theme ? 'light' : 'dark'}>
      <img src="logo.png" alt="" width="30%" height="30%" />
      <globalContext.Provider value={{ state, dispatch }}>
        <button type="button" className="themeButton" onClick={handleTheme}>
          Theme:
          {theme ? ' light' : ' dark'}
        </button>
        <Overview />
        <RelatedItems />
        <QuestionsAndAnswers />
        <RatingsAndReviews />
      </globalContext.Provider>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
