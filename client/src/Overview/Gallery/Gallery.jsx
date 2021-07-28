import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import style from './Gallery.module.css';
import options from '../../config/config.js';

const Gallery = () => {
  const [styles, setStyles] = useState([]);
  const [images, setImages] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [currImgIndex, setCurrImgIndex] = useState(0);
  const [firstThumbnailIdex, setFirstThumbnailIdex] = useState(0);
  const imageMove = useRef(null);
  // const [currThumbnailIndex, setCurrThumbnailIndex] = useState(0);

  const buttonClickHandler = (direction) => (
    (event) => {
      if (direction === 'next') {
        setCurrImgIndex((prevIndex) => prevIndex + 1);
        imageMove.current.scrollBy({
          top: 0,
          left: 360,
          behavior: 'smooth',
        });
        setFirstThumbnailIdex(Math.floor(currImgIndex / 4) * 5);
      } else if (direction === 'prev') {
        setCurrImgIndex((prevIndex) => prevIndex - 1);
        imageMove.current.scrollBy({
          top: 0,
          left: -360,
          behavior: 'smooth',
        });
        setFirstThumbnailIdex(Math.floor(currImgIndex / 6) * 5);
      } else if (direction === 'up') {
        setFirstThumbnailIdex((prevIndex) => prevIndex - 5);
      } else if (direction === 'down') {
        setFirstThumbnailIdex((prevIndex) => prevIndex + 5);
      }
    }
  );

  const thumbnailClickHandler = (index) => (
    (event) => {
      const distance = (index - currImgIndex) * 360;
      imageMove.current.scrollBy({
        top: 0,
        left: distance,
        behavior: 'smooth',
      });
      setCurrImgIndex(index);
    }
  );

  useEffect(() => {
    axios.get(`${options.url}products/13023/styles`, { headers: options.headers })
      .then((response) => {
        setStyles(response.data.results);
        const imgs = response.data.results[0].photos.map((photo) => photo.url);
        const thumbnailImgs = response.data.results[0].photos.map((photo) => photo.thumbnail_url);
        setImages(imgs);
        setThumbnails(thumbnailImgs);
      })
      .catch((err) => {
        console.log('styles data fetching err', err);
      });
  }, []);

  return (
    <div className={style.gallery}>
      <div className={style.sideBar}>
        {firstThumbnailIdex !== 0 && <button type="button" onClick={buttonClickHandler('up')} className={style.upclick}>&and;</button>}
        <div className={style.thumbnails}>
          {thumbnails.slice(firstThumbnailIdex, firstThumbnailIdex + 5).map((url, index) => {
            return (
              <div className={style.selected} key={firstThumbnailIdex + index}>
                <img src={url} alt="selected style thumbnail" className={style.eachThumbnail} onClick={thumbnailClickHandler(firstThumbnailIdex + index)}/>
                {firstThumbnailIdex + index === currImgIndex && <div className={style.highlight}></div>}
              </div>
            )
          })}
        </div>
        {firstThumbnailIdex + 5 < thumbnails.length && <button type="button" onClick={buttonClickHandler('down')} className={style.downclick}>&or;</button>}
      </div>
      <div className={style.mainGallery}>
        {currImgIndex !== 0 && <button type="button" className={style.clickPrev} onClick={buttonClickHandler('prev')}>&lt;</button>}
        <div className={style.mainImage} ref={imageMove}>
          {images.map((imageurl, index) => (
            <img src={imageurl} alt="selected style" className={`${style.image} ${style.cursor}`} key={index} />
          ))}
        </div>
        {currImgIndex !== images.length - 1 && <button type="button" className={style.clickNext} onClick={buttonClickHandler('next')}>&gt;</button>}
      </div>
    </div>
  );
};

export default Gallery;
