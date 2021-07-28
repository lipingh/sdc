import React, {useState} from 'react';

const ComparisonModal = ({open, onClose}) => {

  if (!open) {
    return null;
  }

  return (
    <div className="comparison-window">
      <button onClick={onClose}>close</button>
    </div>
  );
};

export default ComparisonModal;