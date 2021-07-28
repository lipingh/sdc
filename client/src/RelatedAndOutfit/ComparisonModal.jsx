import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './comp-modal.css'

const ComparisonModal = ({open, onClose, product, currProduct}) => {

  if (!open) {
    return null;
  }

  const [sharedFeatures, setSharedFeatures] = useState([]);
  const [currProductFeatures, setCurrProductFeatures] = useState([]);
  const [relatedProdFeatures, setRelatedProdFeatures] = useState([]);

  const distributeFeatures = () => {
    let newSharedFeatures = [];
    let newCurrProductFeatures = [];
    let newRelatedProdFeatures = [];
    for (var i = 0; i < currProduct.features.length; i++) {
      const featureObj = currProduct.features[i]
      const featureName = featureObj.feature;
      for (var j = 0; j < product.features.length; j++) {
        const relatedFeatureObj = product.features[j];
        if (relatedFeatureObj.feature === featureName) {
          newSharedFeatures.push({name: featureName, currVal: featureObj.value, relatedVal: relatedFeatureObj.value});
          break;
        }
      }
    }
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