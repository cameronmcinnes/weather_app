import React from 'react';

const ForecastItem = ({date, high, low, iconSrc}) => {
  return (
    <figure className = 'forecast-day'>
      <h3>{ date }</h3>
      <img src={ iconSrc }></img>
      <p>High: { high }</p>
      <p>Low: { low }</p>
    </figure>
  );
}

export default ForecastItem;
