import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './Gallery.module.css';
import options from '../../config/config.js';

const Gallery = () => {
  const [styles, setStyles] = useState([]);
  const [images, setImages] = useState([]);
  const [currImgIndex, setCurrImgIndex] = useState(0);

  const buttonClickHandler = (direction) => (
    (event) => {
      if (direction === 'next') {
        setCurrImgIndex((prevIndex) => prevIndex + 1);
      } else if (direction === 'prev') {
        setCurrImgIndex((prevIndex) => prevIndex - 1);
      }
    }
  );

  useEffect(() => {
    axios.get(`${options.url}products/13023/styles`, { headers: options.headers })
      .then((response) => {
        const imgs = response.data.results[0].photos.map((photo) => photo.url);
        setImages(imgs);
        setStyles(response.data.results);
      })
      .catch((err) => {
        console.log('styles data fetching err', err);
      });
  }, []);

  return (
    <div className={style.gallery}>
      <div className={style.thumbnail}></div>
      <div className={style.mainImage}>
        {currImgIndex !== 0 && <button type="button" className={style.clickPrev} onClick={buttonClickHandler('prev')}>&lt;</button>}
        <img src={images[currImgIndex]} alt="selected style" className={style.image} />
        {currImgIndex !== images.length - 1 && <button type="button" className={style.clickNext} onClick={buttonClickHandler('next')}>&gt;</button>}
      </div>
    </div>
  );
};

export default Gallery;
