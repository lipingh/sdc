import React, { useReducer, useEffect } from 'react';
import Gallery from './Gallery/Gallery.jsx';
import './main.css';
import UserShop from './UserShop/UserShop.jsx';

const initialState = {
  isExpanded: false,
  productId: 13023,
  styleIndex: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'expand':
      return { ...state, isExpanded: true };
    case 'unexpand':
      return { ...state, isExpanded: false };
    default:
      return state;
  }
};

export const ExpandContext = React.createContext();

const Overview = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
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
