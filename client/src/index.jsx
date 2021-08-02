import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import Overview from './Overview/Overview.jsx';
import RelatedItems from './RelatedAndOutfit/RelatedAndOutfit.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews.jsx';

const initialState = {
  productId: 13027,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'changeProductId':
      return { ...state, productId: action.data };
    default:
      return state;
  }
};

export const globalContext = React.createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
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
