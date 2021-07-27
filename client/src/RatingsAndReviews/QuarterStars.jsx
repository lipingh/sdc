import React from 'react';
import './star.css';

function QuarterStars(props) {
  let rating = props.rating || 0;
  const stars = [];
  while (stars.length < 5) {
    if (rating > 1) {
      stars.push(1);
    } else if (rating > 0) {
      const empty = Math.abs(0 - rating);
      const quart = Math.abs(0.25 - rating);
      const half = Math.abs(0.5 - rating);
      const three = Math.abs(0.75 - rating);
      const full = Math.abs(1 - rating);
      const closest = Math.min(empty, quart, half, three, full);
      switch (closest) {
        case (empty):
          stars.push(0);
          break;
        case quart:
          stars.push(0.28);
          break;
        case half:
          stars.push(0.5);
          break;
        case three:
          stars.push(0.72);
          break;
        case full:
          stars.push(1.0);
          break;
        default:
          console.log('OOPS');
          stars.push(0);
          break;
      }
    } else {
      stars.push(0);
    }
    rating -= 1;
  }
  return (
    <div>
      <h1>Fill Stars to Nearest Quarter</h1>
      {stars.map((item, i) => (
        <div className="single-star-container" key={i}>
          <div className="single-star-fill" style={{ width: `${parseInt(item * 31)}px` }}>
            <img className="single-star-outline" src="star.png" alt="stars alt" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuarterStars;
