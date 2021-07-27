import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './Overview/ProductInfo.jsx';
import RelatedItems from './RelatedAndOutfit/RelatedAndOutfit.jsx';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers.jsx';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews.jsx';

// class App extends React.Component {
//   render() {
//     <div>Hello, World</div>;
//   }
// };

const App = () => (
  <div>
    <Overview />
    <RelatedItems />
    <QuestionsAndAnswers />
    <RatingsAndReviews />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
