import React, { useState } from 'react';
import './QandA-list.css';
import QuestionsList from './QuestionsList.jsx';
import SearchQuestions from './SearchQuestions.jsx';
import QuestionForm from './QuestionForm.jsx';

const QuestionsAndAnswers = () => {
  const [moreQuestions, showMoreQuestions] = useState(false);
  const [showQuestionsForm, setQuestionForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (searchTerm.length + 1 > 2) {
      setSearch(true);
      showMoreQuestions(true);
    } else {
      setSearch(false);
      showMoreQuestions(false);
    }
  };

  const handleMoreQuestions = () => {
    showMoreQuestions((more) => !more);
  };

  return (
    <div id="questions">
      <span className="q-a-title">Questions and Answers</span>
      <SearchQuestions
        handleSearch={handleSearch}
      />
      <QuestionForm
        showQuestionForm={showQuestionsForm}
        handleQuestionForm={() => { setQuestionForm(false); }}
      />
      <div className="q-a">
        <QuestionsList
          search={search}
          searchTerm={searchTerm}
          moreQuestions={moreQuestions}
        />
        <button
          className=" buttons questions-buttons"
          type="button"
          onClick={handleMoreQuestions}
        >
          {moreQuestions ? 'HIDE QUESTIONS' : 'MORE ANSWERED QUESTIONS'}
        </button>
        <button
          className=" buttons questions-buttons"
          type="button"
          onClick={() => { setQuestionForm(true); }}
        >
          ADD A QUESTION
        </button>
      </div>
    </div>
  );
};

export default QuestionsAndAnswers;
