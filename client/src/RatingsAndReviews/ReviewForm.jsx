import React, { useState } from 'react';
import StarRating from './StarRating.jsx';

const ReviewForm = (props) => {
  const [recommend, setRecommended] = useState('');

  const addReviews = () => {

  };

  return (
    <form>
      {/* <label>Overall Ratings</label>
    <input><StarRating /></input> */}
      <div className="recommend">
        <div>
          Do you recommend this product?
          <input type="radio" name="recommend" value="true" />
          Yes
          <input type="radio" name="recommend" value="false" />
          No
        </div>
        <div>
          Size:
          <input type="radio" name="size" value="1" />
          A size too small
          <input type="radio" name="size" value="2" />
          Half a size too small
          <input type="radio" name="size" value="3" />
          Perfect
          <input type="radio" name="size" value="4" />
          Half a size too big
          <input type="radio" name="size" value="5" />
          A size too wide
        </div>
        <div>
          Width:
          <input type="radio" name="width" value="1" />
          Too narrow
          <input type="radio" name="width" value="2" />
          Slightly narrow
          <input type="radio" name="width" value="3" />
          Perfect
          <input type="radio" name="width" value="4" />
          Slightly wide
          <input type="radio" name="width" value="5" />
          Too wide
        </div>
        <div>
          Comfort:
          <input type="radio" name="comfort" value="1" />
          Uncomfortable
          <input type="radio" name="comfort" value="2" />
          Slightly uncomfortable
          <input type="radio" name="comfort" value="3" />
          Ok
          <input type="radio" name="comfort" value="4" />
          Comfortable
          <input type="radio" name="comfort" value="5" />
          Perfect
        </div>
        <div>
          Quality:
          <input type="radio" name="quality" value="1" />
          Poor
          <input type="radio" name="quality" value="2" />
          Below Average
          <input type="radio" name="quality" value="3" />
          What I expected
          <input type="radio" name="quality" value="4" />
          Pretty great
          <input type="radio" name="quality" value="5" />
          Perfect
        </div>
        <div>
          Length:
          <input type="radio" name="length" value="1" />
          Runs short
          <input type="radio" name="length" value="2" />
          Runs slightly short
          <input type="radio" name="length" value="3" />
          Perfect
          <input type="radio" name="length" value="4" />
          Runs slightly long
          <input type="radio" name="length" value="5" />
          Runs long
        </div>
        <div>
          Fit:
          <input type="radio" name="fit" value="1" />
          Runs tight
          <input type="radio" name="fit" value="2" />
          Runs slightly tight
          <input type="radio" name="fit" value="3" />
          Perfect
          <input type="radio" name="fit" value="4" />
          Runs slightly long
          <input type="radio" name="fit" value="5" />
          Runs long
        </div>
        <div className="review-summary">
          Review Summary
          <input type="text" placeholder="Example: purchase ever!" />
        </div>
      </div>
    </form>
  );
};

export default ReviewForm;
