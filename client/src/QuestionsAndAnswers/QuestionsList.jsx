import React from 'react';
import EachQuestion from './EachQuestion.jsx';

const QuestionsList = ({questions}) => (
  <>
  <ol>
  {questions.map((question) => (
      <li key={question.question_id} >
      <EachQuestion key={question.question_id} question={question}/>
      </li>
    ))}
  </ol>
  </>
);

export default QuestionsList;
