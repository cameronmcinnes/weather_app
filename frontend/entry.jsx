import React from 'react';
import ReactDOM from 'react-dom';

import ForecastContainer from './forecast_container';

const Root = () => {
  return (
    <main>
      <ForecastContainer />
      <footer>
        <h4>Cameron McInnes for C4Q</h4>
      </footer>
    </main>
  );
}

// add dom content loaded callback to ensure page fully loaded
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Root/>, document.getElementById('root'));
});
