import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './comp-modal.css'

const ComparisonModal = ({open, onClose}) => {

  if (!open) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div className="comparison-overlay"/>
      <div className="comparison-window">
        <button onClick={onClose}>close</button>
      </div>
    </>,
    document.getElementById('related-outfit'),
  );
};

export default ComparisonModal;