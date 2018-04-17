import React from 'react';
import ReactDOM from 'react-dom';

import Weather from './weather';

const Root = () => {
  return <Weather />;
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Root/>, document.getElementById('root'));
});
