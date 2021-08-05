import React, { useContext } from 'react';
import { ExpandContext } from '../Overview.jsx';
import style from './StyleSelector.module.css';
import checkmark from './greenmark.png';

const StyleSelector = () => {
  const contextData = useContext(ExpandContext);

  const selectorClickHandler = (index) => (
    () => {
      contextData.dispatchFunc({ type: 'changeStyleIndex', data: index });
    }
  );

  return (
    <div className={style.styleSelector}>
      <>
        <span className={style.styleText}>STYLE &gt;</span>
        <span className={style.styleName}>{contextData.currState.styleName}</span>
      </>
      <div className={style.flex}>
        {contextData.currState.styleThumbnails.map((thumbnailurl, index) => (
          <div key={index} className={style.selector} onClick={selectorClickHandler(index)}>
            <div className={style.frame}>
              <img src={thumbnailurl} alt="style thumbnail" className={style.thumbnail} />
            </div>
            {contextData.currState.styleIndex === index
              && <div className={style.checkmark}><img src={checkmark} alt="checkmark" style={{ width: '30px', height: '30px' }} /></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
