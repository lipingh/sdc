import React, { useState, useContext, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import EachQuestion from './EachQuestion.jsx';
import useAllQuestions from './useAllQuestions';
import { globalContext } from '../index.jsx';

const QuestionsList = ({
  moreQuestions,
}) => {
  const globalData = useContext(globalContext);
  const [page, setPage] = useState(1);
  const {
    loading, error, questionsInfinate, hasMore,
  } = useAllQuestions(globalData.state.productId, page);
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

  // if (moreQuestions) {
    return (
      <>
        <ul className="questions-list">
          {questionsInfinate.length === 0
            ? (
              <span ref={lastQuestionRef}>
                No More Questions
              </span>
            )
            : questionsInfinate.map((question, i) => {
              if (questionsInfinate.length === i + 1) {
                return (
                  <div ref={lastQuestionRef} key={question.question_id}>
                    <EachQuestion key={question.question_id} question={question} />
                  </div>
                );
              }
              return <EachQuestion key={question.question_id} question={question} />;
            })}
        </ul>
      </>
    );
  // }
  // return (
  //   <>
  //     <ul className="four-questions">
  //       {questions.filter((question, index) => (
  //         index < 4
  //       )).map((question) => (
  //         <div key={question.question_id}>
  //           <EachQuestion key={question.question_id} question={question} />
  //         </div>
  //       ))}
  //     </ul>
  //   </>
  // );
};

QuestionsList.propTypes = {
  // questionsInfinate: PropTypes.arrayOf(PropTypes.shape({
  //   answers: PropTypes.arrayOf(PropTypes.object),
  // })),
  // questions: PropTypes.arrayOf(PropTypes.shape({
  //   answers: PropTypes.arrayOf(PropTypes.object),
  // })),
  moreQuestions: PropTypes.bool,
};

QuestionsList.defaultProps = {
  // questions: [],
  moreQuestions: false,
  // questionsInfinate: [],
};

export default QuestionsList;
