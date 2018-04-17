import React from 'react';

const ForecastItem = ({date, high, low, iconSrc}) => {
  return (
    <div className = 'forecast-day'>
      <h3>{date || true}</h3>
      <img src={ iconSrc }></img>
      <p>High: { high }</p>
      <p>Low: { low }</p>
    </div>
  );
}

export default ForecastItem;
