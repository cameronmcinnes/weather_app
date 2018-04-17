import React from 'react';
import ReactDOM from 'react-dom';

import ForecastContainer from './forecast_container';

const Root = () => {
  return <ForecastContainer />;
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Root/>, document.getElementById('root'));
});
