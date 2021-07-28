import React, { useReducer } from 'react';
import Gallery from './Gallery/Gallery.jsx';
import './main.css';

const initialState = {
  isExpanded: false,
  style: 13023,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'expand':
      return { ...state, isExpanded: true };
    case 'unexpand':
      return { ...state, isExpanded: false};
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
        {!state.isExpanded && <div className="test">hello</div>}
      </ExpandContext.Provider>
    </div>
  );
};
export default Overview;
