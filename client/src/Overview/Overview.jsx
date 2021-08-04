import React, { useReducer, useEffect, useContext } from 'react';
import Gallery from './Gallery/Gallery.jsx';
import './main.css';
import UserShop from './UserShop/UserShop.jsx';
import { globalContext } from '../index.jsx';
import axios from 'axios';
import options from '../config/config.js';

const initialState = {
  isExpanded: false,
  styleIndex: 0,
  styleResults: [],
  images: [],
  thumbnails: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'expand':
      return { ...state, isExpanded: true };
    case 'unexpand':
      return { ...state, isExpanded: false };
    case 'changeStyleIndex':
      return { ...state, styleIndex: action.data };
    case 'updateStyleResults':
      return { ...state, styleResults: action.data };
    case 'updateImages':
      return { ...state, images: action.data };
    case 'updateThumbnails':
      return { ...state, thumbnails: action.data };
    default:
      return state;
  }
};

export const ExpandContext = React.createContext();

const Overview = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const globalData = useContext(globalContext);

  useEffect(() => {
    axios.get(`${options.url}products/${globalData.state.productId}/styles`, { headers: options.headers })
      .then((response) => {
        dispatch({ type: 'updateStyleResults', data: response.data.results });
        const imgs = response.data.results[state.styleIndex].photos.map((photo) => photo.url);
        const thumbnailImgs = response.data.results[state.styleIndex]
          .photos.map((photo) => photo.thumbnail_url);
        dispatch({ type: 'updateImages', data: imgs });
        dispatch({ type: 'updateThumbnails', data: thumbnailImgs });
      })
      .catch((err) => {
        console.log('styles data fetching err', err);
      });
  }, [globalData.state.productId]);

  useEffect(() => {
    if (state.styleResults[state.styleIndex]) {
      const imgs = state.styleResults[state.styleIndex].photos.map((photo) => photo.url);
      const thumbnailImgs = state.styleResults[state.styleIndex]
        .photos.map((photo) => photo.thumbnail_url);
      dispatch({ type: 'updateImages', data: imgs });
      dispatch({ type: 'updateThumbnails', data: thumbnailImgs });
    }
  }, [state.styleIndex]);

  return (
    <div className="container">
      <ExpandContext.Provider value={{ currState: state, dispatchFunc: dispatch }}>
        <Gallery />
        {!state.isExpanded && <UserShop />}
      </ExpandContext.Provider>
    </div>
  );
};
export default Overview;
