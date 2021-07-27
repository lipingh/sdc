import React, { useState } from 'react';
import StarRating from './StarRating.jsx';

const ReviewForm = (props) =>
  // const [recommend, setRecommended] = useState('null');
  (
    <form>
      {/* <label>Overall Ratings</label>
    <input><StarRating /></input> */}
      <div className="recommend">
        <label>
          Do you recommend this product?
          <input type="radio" value="true" />
          Yes
          <input type="radio" value="false" />
          No
        </label>
      </div>
    </form>
  );
export default ReviewForm;
