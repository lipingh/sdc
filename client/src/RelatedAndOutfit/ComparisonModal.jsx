import React, {useState, useEffect} from 'react';
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
        <button className="btn-close-comp-modal" onClick={onClose}>X</button>
        <div className="comp-table">
          <div className="comp-current"></div>
          <div className="comp-titles"></div>
          <div className="comp-related"></div>
        </div>
      </div>
    </>,
    document.getElementById('comp-modal-portal'),
  );
};

export default ComparisonModal;