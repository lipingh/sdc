import React from 'react';
import ReactDOM from 'react-dom';

const ImageModal = ({ showFullImage, url, onClose }) => {
  if (!showFullImage) {
    return null;
  }
  return ReactDOM.createPortal(
    <>
      <button type="button" onClick={onClose}>X</button>
      <img src={url} alt="" />
    </>,
    document.getElementById('image-modal'),
  );
};

export default ImageModal;
