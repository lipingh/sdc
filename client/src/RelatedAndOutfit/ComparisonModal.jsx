import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import ComparisonRow from './ComparisonRow.jsx';
import './comp-modal.css'

const ComparisonModal = ({open, onClose, product, currProduct}) => {

  if (!open) {
    return null;
  }

  const [sharedFeatures, setSharedFeatures] = useState([]);
  const [currProductFeatures, setCurrProductFeatures] = useState([]);
  const [relatedProdFeatures, setRelatedProdFeatures] = useState([]);

  const distributeFeatures = () => {
    let uniqRelatedFeatures = product.features;
    let newSharedFeatures = [];
    let newCurrProductFeatures = [];
    let newRelatedProdFeatures = [];
    for (var i = 0; i < currProduct.features.length; i++) {
      const featureObj = currProduct.features[i]
      const featureName = featureObj.feature;
      let match = false;
      for (var j = 0; j < uniqRelatedFeatures.length; j++) {
        const relatedFeatureObj = uniqRelatedFeatures[j];
        if (relatedFeatureObj.feature === featureName && relatedFeatureObj.value) {
          match = true
          uniqRelatedFeatures.splice(j, 1);
          newSharedFeatures.push({name: featureName, currVal: featureObj.value, relatedVal: relatedFeatureObj.value});
          break;
        }
      }
      if (!match && featureObj.value) {
        newCurrProductFeatures.push({name: featureName, currVal: featureObj.value});
      }
    }
    uniqRelatedFeatures.forEach(feature => {
      if (feature.value) {
        newRelatedProdFeatures.push({name: feature.feature, relatedVal: feature.value})
      }
    })
    setSharedFeatures(newSharedFeatures);
    setCurrProductFeatures(newCurrProductFeatures);
    setRelatedProdFeatures(newRelatedProdFeatures);
  }

  useEffect(() => {
    distributeFeatures();
  }, [])

  return ReactDOM.createPortal(
    <>
      <div className="comparison-overlay"/>
      <div className="comparison-window">
        <div className="comparing">COMPARING</div>
        <button className="btn-close-comp-modal" onClick={onClose}>X</button>
        <div className="comp-table">
          <div className="comp-titles">
            <div className="comp-title">{product.name}</div>
            <div className="comp-title-center">Features</div>
            <div className="comp-title">{currProduct.name}</div>
          </div>
          <div className="comp-table-features">
            {sharedFeatures.map((feature) => {
              return <ComparisonRow feature={feature} />
            })}
            {currProductFeatures.map((feature) => {
              return <ComparisonRow feature={feature} />
            })}
            {relatedProdFeatures.map((feature) => {
              return <ComparisonRow feature={feature} />
            })}
          </div>
        </div>
      </div>
    </>,
    document.getElementById('comp-modal-portal'),
  );
};

export default ComparisonModal;