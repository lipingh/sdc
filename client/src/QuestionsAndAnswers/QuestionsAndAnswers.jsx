import React, {
  useState, useEffect, useRef, useCallback, useContext,
} from 'react';
import axios from 'axios';
import './QandA-list.css';
import options from '../config/config.js';
import QuestionsList from './QuestionsList.jsx';
import allInOrder from './Helpers.js';
import SearchQuestions from './SearchQuestions.jsx';
import QuestionForm from './QuestionForm.jsx';
import useAllQuestions from './useAllQuestions';
import { globalContext } from '../index.jsx';

const QuestionsAndAnswers = () => {
  const [questions, setQuestions] = useState([]);
  const [moreQuestions, showMoreQuestions] = useState(false);
  const [showQuestionsForm, setQuestionForm] = useState(false);
  const [search, setSearch] = useState('');
  const [originalQuestions, setOriginalQuestions] = useState([]);
  const globalData = useContext(globalContext);
  // const [page, setPage] = useState(1);
  // const {
  //   loading, error, questionsInfinate, hasMore,
  // } = useAllQuestions(globalData.state.productId, page);
  // const observer = useRef(null);

  // const lastQuestionRef = useCallback((node) => {
  //   if (loading) return;
  //   if (observer.current) {
  //     observer.current.disconnect();
  //   }
  //   observer.current = new IntersectionObserver((entries) => {
  //     if (entries[0].isIntersecting && hasMore) {
  //       setPage((prev) => prev + 1);
  //     }
  //   });
  //   if (node) observer.current.observe(node);
  // }, [loading, hasMore]);

  const getQuestions = () => {
    axios.get(`${options.url}qa/questions?product_id=${globalData.state.productId}`, {
      headers: options.headers,
    })
      .then((res) => {
        const notReported = res.data.results.filter((question) => (
          !question.reported
        ));
        const inQHelpOrder = notReported.sort(
          (a, b) => b.question_helpfulness - a.question_helpfulness,
        );
        const finalOrder = allInOrder(inQHelpOrder);
        setQuestions(finalOrder);
        setOriginalQuestions(finalOrder);
      })
      .catch((res, err) => {
        res.end('could not get questions', err);
      });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (search.length + 1 > 2) {
      setQuestions(questions.filter((question) => (
        question.question_body.toLowerCase().includes(search.toLowerCase()) ? question : null
      )));
    } else {
      setQuestions(originalQuestions);
    }
  };

  const handleMoreQuestions = () => {
    showMoreQuestions((more) => !more);
  };

  useEffect(() => {
    getQuestions();
  }, [globalData.state.productId]);

  return (
    <div id="questions">
      <h3>Questions and Answers</h3>
      <SearchQuestions
        handleSearch={handleSearch}
      />
      <QuestionForm
        showQuestionForm={showQuestionsForm}
        handleQuestionForm={() => { setQuestionForm(false); }}
      />
      <div className="q-a">
        <QuestionsList
          // loading={loading}
          // error={error}
          // questions={questions}
          // questionsInfinate={questionsInfinate}
          moreQuestions={moreQuestions}
          // ref={lastQuestionRef}
        />
        <button
          className="more-questions-button"
          type="button"
          onClick={handleMoreQuestions}
        >
          {moreQuestions ? 'Hide Questions' : 'More Answered Questions'}
        </button>
        <button type="button" onClick={() => { setQuestionForm(true); }}>Add a Question</button>
      </div>
    </div>
  );
};

export default QuestionsAndAnswers;
