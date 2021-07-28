import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './comp-modal.css'

const ComparisonModal = ({open, onClose, product, currProduct}) => {

  if (!open) {
    return null;
  }

  const sharedFeatures = currProduct.features.map((featureObj) => {
    const featureName = featureObj.feature;
    let sharedFeatureObj;
    product.features.forEach((relatedFeatureObj) => {
      if (relatedFeatureObj.feature === featureName) {
        sharedFeatureObj = {name: featureName, currVal: featureObj.value, relatedVal: relatedFeatureObj.value};
      }
    })
    return sharedFeatureObj;
  })

  return ReactDOM.createPortal(
    <>
      <div className="comparison-overlay"/>
      <div className="comparison-window">
        <div className="comparing">COMPARING</div>
        <button className="btn-close-comp-modal" onClick={onClose}>X</button>
        <div className="comp-table">
          <div className="comp-titles">
            <div className="comp-title">{product.name}</div>
            <div className="comp-title">Features</div>
            <div className="comp-title">{currProduct.name}</div>
          </div>
          <div className="comp-table-features">
            <div className="comp-current">
            </div>
            <div className="comp-features">
            </div>
            <div className="comp-related">
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('comp-modal-portal'),
  );
};

export default ComparisonModal;