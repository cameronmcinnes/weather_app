import React from 'react';

// argument destructuring of props
const ForecastItem = ({date, high, low, iconSrc}) => {
  return (
    <figure className = 'forecast-day'>
      <h3>{ date.toString().slice(0,15) }</h3>
      <img src={ iconSrc } />
      <p>High: { high }</p>
      <p>Low: { low }</p>
    </figure>
  );
}

export default ForecastItem;
