/**
 * index.js
 * Define the routes and skeleton for the React app. 
 */

import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from 'containers/HomePage/Loadable';
import ErrorPage from 'containers/ErrorPage/Loadable';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="" component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
}