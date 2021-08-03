import React, {
  useState, useContext, useRef, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { globalContext } from '../index.jsx';
import useAllQuestions from './useAllQuestions';
import EachQuestion from './EachQuestion.jsx';

const QuestionsList = ({
  moreQuestions, search, searchTerm,
}) => {
  const [page, setPage] = useState(1);
  const globalData = useContext(globalContext);
  const {
    loading, error, questionsInfinite, hasMore,
  } = useAllQuestions(globalData.state.productId, page, search, searchTerm);
  const observer = useRef(null);
  const lastQuestionRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  let sortQuestions = questionsInfinite;
  if (search) {
    sortQuestions = questionsInfinite.filter((question) => (
      question.question_body.toLowerCase().includes(searchTerm.toLowerCase()) ? question : null
    ));
  }
  if (moreQuestions) {
    return (
      <>
        <ul className="questions-list">
          {questionsInfinite.length === 0
            ? (
              <span ref={lastQuestionRef}>
                No More Questions
              </span>
            )
            : sortQuestions.map((question, i) => {
              if (questionsInfinite.length === i + 1) {
                return (
                  <div ref={lastQuestionRef} key={question.question_id}>
                    <EachQuestion key={question.question_id} question={question} />
                  </div>
                );
              }
              return <EachQuestion key={question.question_id} question={question} />;
            })}
          <span>{loading ? 'loading' : null}</span>
          <span>{error ? 'error' : null}</span>
        </ul>
      </>
    );
  }
  return (
    <>
      <ul className="four-questions">
        {
        sortQuestions.filter((question, index) => (
          index < 4
        )).map((question) => (
          <div key={question.question_id}>
            <EachQuestion key={question.question_id} question={question} />
          </div>
        ))
}
      </ul>
    </>
  );
};

QuestionsList.propTypes = {
  moreQuestions: PropTypes.bool,
  search: PropTypes.bool,
  searchTerm: PropTypes.string,
};

QuestionsList.defaultProps = {
  moreQuestions: false,
  search: false,
  searchTerm: '',
};

export default QuestionsList;
