import React, { useReducer } from 'react';
import Gallery from './Gallery/Gallery.jsx';
import './main.css';

const initialState = {
  isExpanded: false
};

const reducer  = (state, action) => {
  switch(action.type) {
    case 'expand':
      return {...initialState, isExpanded: true};
    default:
      return state;
  }
};

export const ExpandContext = React.createContext();

const Overview = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="container">
      <ExpandContext.Provider value={{currState: state, dispatchFunc: dispatch}}>
        <Gallery />
        {!state.isExpanded && <div className="test">hello</div>}
      </ExpandContext.Provider>
    </div>
  );
};
export default Overview;
