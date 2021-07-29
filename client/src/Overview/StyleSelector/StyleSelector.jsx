import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import options from '../../config/config.js';
import { ExpandContext } from '../Overview.jsx';
import style from './StyleSelector.module.css';

const StyleSelector = () => {
  const contextData = useContext(ExpandContext);
  const [styleName, setStyleName] = useState('');
  const [styleThumbnails, setStyleThumbnails] = useState([]);

  useEffect(() => {
    axios.get(`${options.url}products/${contextData.currState.productId}/styles`, { headers: options.headers })
      .then((response) => {
        setStyleName(response.data.results[contextData.currState.styleIndex].name);
      })
      .catch((err) => {
        console.log('styles data fetching err', err);
      });
  }, []);
  return (
    <div>
      <>
        <span className={style.styleText}>STYLE &gt;</span>
        <span className={style.styleName}>{styleName}</span>
      </>

    </div>
  );
};

export default StyleSelector;
