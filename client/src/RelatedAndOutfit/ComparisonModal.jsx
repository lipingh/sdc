import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ComparisonRow from './ComparisonRow.jsx';
import './comp-modal.css';
import { globalContext } from '../index.jsx';

const ComparisonModal = ({
  open, onClose, product,
}) => {
  if (!open) {
    return null;
  }

  const globalData = useContext(globalContext);

  const [sharedFeatures, setSharedFeatures] = useState([]);
  const [currProductFeatures, setCurrProductFeatures] = useState([]);
  const [relatedProdFeatures, setRelatedProdFeatures] = useState([]);
  const [windowHt, setwindowHt] = useState(window.innerHeight);

  const distributeFeatures = () => {
    const uniqRelatedFeatures = product.features;
    const newSharedFeatures = [];
    const newCurrProductFeatures = [];
    const newRelatedProdFeatures = [];
    for (let i = 0; i < globalData.state.features.length; i += 1) {
      const featureObj = globalData.state.features[i];
      const featureName = featureObj.feature;
      let match = false;
      for (let j = 0; j < uniqRelatedFeatures.length; j += 1) {
        const relatedFeatureObj = uniqRelatedFeatures[j];
        if (relatedFeatureObj.feature === featureName && relatedFeatureObj.value) {
          match = true;
          uniqRelatedFeatures.splice(j, 1);
          newSharedFeatures.push(
            { name: featureName, currVal: featureObj.value, relatedVal: relatedFeatureObj.value },
          );
          break;
        }
      }
      if (!match && featureObj.value) {
        newCurrProductFeatures.push({ name: featureName, currVal: featureObj.value });
      }
    }
    uniqRelatedFeatures.forEach((feature) => {
      if (feature.value) {
        newRelatedProdFeatures.push({ name: feature.feature, relatedVal: feature.value });
      }
    });
    setSharedFeatures(newSharedFeatures);
    setCurrProductFeatures(newCurrProductFeatures);
    setRelatedProdFeatures(newRelatedProdFeatures);
  };

  const updateHeight = () => {
    setwindowHt(window.innerHeight);
  };

  useEffect(() => {
    distributeFeatures();
    window.addEventListener('resize', updateHeight);
    return () => { window.removeEventListener('resize', updateHeight); };
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className="comparison-overlay" />
      <div className="comparison-window">
        <div className="comparing">COMPARING</div>
        <button type="button" className="btn-close-comp-modal" onClick={onClose}>X</button>
        <div className="comp-table">
          <div className="comp-titles">
            <div className="comp-title">{product.name}</div>
            <div className="comp-title-center">Features</div>
            <div className="comp-title">{globalData.state.name}</div>
          </div>
          <div className="comp-table-features" style={{ height: `${Math.floor(windowHt * 0.44)}px` }}>
            {sharedFeatures.map((feature) => <ComparisonRow key={`${product.id + feature.currVal}`} feature={feature} />)}
            {currProductFeatures.map((feature) => <ComparisonRow key={`${product.id + feature.name}`} feature={feature} />)}
            {relatedProdFeatures.map((feature) => <ComparisonRow key={`${product.id + feature.relatedVal}`} feature={feature} />)}
          </div>
        </div>
      </div>
    </>,
    document.getElementById('comp-modal-portal'),
  );
};

ComparisonModal.propTypes = {
  open: PropTypes.bool.isRequired,
};

// ComparisonModal.defaultProps = {
//   open: false,
// };

export default ComparisonModal;
