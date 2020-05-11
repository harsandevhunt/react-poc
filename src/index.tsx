import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/common/Header';
import Container from './components/common/Container';

import * as serviceWorker from './serviceWorker';

import './assets/css/index.scss';

ReactDOM.render(
  <div>
    <Header />
    <hr />
    <Container />
  </div>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
