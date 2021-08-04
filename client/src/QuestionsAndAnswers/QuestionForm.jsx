import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import './QForm.css';
import axios from 'axios';
import options from '../config/config.js';
import { globalContext } from '../index.jsx';

const QuestionForm = ({ showQuestionForm, handleQuestionForm }) => {
  if (!showQuestionForm) return null;

  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showSubmitM, showM] = useState(false);
  const [showErr, showErrM] = useState(false);
  const globalData = useContext(globalContext);

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    const notAllowed = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (body.endsWith('?') && name.search(notAllowed) === -1 && name.match('.*\\s.*') === null) {
      showErrM(false);

      const data = {
        body, name, email, product_id: globalData.state.productId,
      };
      axios.post(`${options.url}qa/questions`, data, { headers: options.headers })
        .then(() => {
          showM(true);
          setBody('');
          setName('');
          setEmail('');
        })
        .catch((err) => {
          Promise.reject(err);
        });
    } else {
      showErrM(true);
    }
  };

  return ReactDOM.createPortal(
    <div className="question-overlay">
      <form className="question-form">
        <button className="buttons XButton" type="button" onClick={handleQuestionForm}>X</button>
        <h3 className="QTitle">Ask Your Question</h3>
        <h4 className="QSubTitle">{`About the ${globalData.state.name}`}</h4>
        <span style={{ color: 'green' }}>{showSubmitM ? 'Question submitted!' : null}</span>
        <span style={{ color: 'red' }}>{showErr ? 'You must enter the following: question with a ?, nickname, and email' : null}</span>
        <div>
          <span>Your Question</span>
          <span className="asterisk" style={{ color: 'red' }}>*</span>
        </div>
        <textarea
          className="QBody"
          type="text"
          maxLength="1000"
          placeholder="Your Question"
          value={body}
          onChange={(e) => { setBody(e.target.value); }}
          required
        />
        <div>
          <span>What is your nickname?</span>
          <span className="asterisk" style={{ color: 'red' }}>*</span>
        </div>
        <input
          className="QName"
          type="text"
          maxLength="1000"
          placeholder="Example: jackson11!"
          value={name}
          onChange={(e) => { setName(e.target.value); }}
          required
        />
        <span>For privacy reasons, do not use your full name or email address.</span>
        <div>
          <span>Your email</span>
          <span className="asterisk" style={{ color: 'red' }}>*</span>
        </div>
        <input className="QEmail" type="email" placeholder="Example: abcde@abc.com" value={email} onChange={(e) => { setEmail(e.target.value); }} required />
        <span>For authentication reasons, you will not be emailed.</span>
        <button className="buttons QSubmit" type="submit" onClick={handleSubmitQuestion}>Submit Question</button>
      </form>
    </div>,
    document.getElementById('questions'),
  );
};

export default QuestionForm;
