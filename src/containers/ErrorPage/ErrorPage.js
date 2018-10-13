/**
 * ErrorPage.js
 * Define the error page to display on undefined url routes. 
 */

import React from 'react';

export default class ErrorPage extends React.PureComponent {
  render() {
    return (
      <h1> Error: Unable to retrieve page. </h1>
    );
  }
}
