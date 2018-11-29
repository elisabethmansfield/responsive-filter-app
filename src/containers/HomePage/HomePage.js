/*
 * HomePage.js
 * Define the HomePage container to display at the '/' root route.
 * Render a Bootstrap container with components.
 */

import React from 'react';
import BlockContent from 'components/BlockContent/Loadable';

/* HomePage container:
 * Generate a skeleton for the home page, including
 * header, input bar, tabs, and table.
 */
export default class HomePage extends React.Component {

  // Constructor, initialize the state.
  constructor() {
    super();
    this.state = { 
      base: 'EUR', 
      search: ''
    };
    this.liveFilter = this.liveFilter.bind(this);              
  }
  
  // Live filter the table items per user input in the search bar.
  liveFilter = (event) => {
    let value = event.target.value.toLowerCase();
    this.setState({search: value});
  }
    
  render() {
    	
    return (
      <div className="HomePage">
      {/* HomePage React container */}

        {/* Bootstrap container */}
        <div className="container">
          
          {/* page header */}
          <div className="page-header">
            <h1 className='text-center'>Currency Converter</h1>
          </div>
          <hr/>

          {/* input bar */}
          <div className="row">
            <div className="col">
              <div className="input-group input-group-lg">
                <input type="text" className="form-control" ref="toggle" onChange={this.liveFilter} style={{marginBottom:'20px',marginTop:'10px'}} placeholder="Search" aria-label="Search" aria-describedby="inputGroup-sizing-lg"></input>
              </div>
            </div>
          </div>
          
          {/* tabs */}
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" >
              <a className="nav-link active text-center" id="eur-tab" data-toggle="tab" href="#eur" role="tab" aria-controls="eur" aria-selected="true">1 EUR</a>
            </li>
          </ul>
          
          {/* content */}
          <BlockContent base={this.state.base} search={this.state.search}/> 
            
        </div>
      </div>
    );
  }
}
