import React, { Component } from 'react';

import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Loadable from 'react-loadable';

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

const Page500 = Loadable({
  loader: () => import('./pages/Page500'),
  loading
});

const Page600 = Loadable({
  loader: () => import('./pages/Page500'),
  loading
});
const Home = Loadable({
  loader: () => import('./Home'),
  loading
});
export default class MainContent extends Component {
  render() {
    return (
      <div className="mainContent">
        <Switch>
          <Route path="/" name="home" component={Home} />
        </Switch>
      </div>
    );
  }
}
