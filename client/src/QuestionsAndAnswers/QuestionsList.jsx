import React from 'react';
import EachQuestion from './EachQuestion.jsx';

const QuestionsList = ({questions}) => (
  <ul className='q-list'>
  {questions.map((question, id) => (
    <div key={id}>
      <EachQuestion key={question.question_id} question={question}/>
    </div>
    ))}
  </ul>
);

export default QuestionsList;
