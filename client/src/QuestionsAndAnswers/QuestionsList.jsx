import React from 'react';
import EachQuestion from './EachQuestion.jsx';

const QuestionsList = ({questions}) => (
  <ul>
  {questions.map((question, id) => (
    <div key={id} id='QEntry'>
    <span>Q: </span>
      <EachQuestion key={question.question_id} question={question}/>
    </div>
    ))}
  </ul>
);

export default QuestionsList;
