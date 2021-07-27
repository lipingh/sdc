import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './Overview/Overview.jsx';
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
    <h1>hello, world</h1>
    {/* <Overview />
    <RelatedItems />
    <QuestionsAndAnswers /> */}
    <RatingsAndReviews />
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
