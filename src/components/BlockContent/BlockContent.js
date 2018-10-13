/**
 * BlockContent.js
 * Define and export the BlockContent React component.
 * Render a table of items retrieved from an API call.
 */

import React from 'react';
import apiCall from '../../utils/api.js';
import PropTypes from 'prop-types';

// Row method to generate rows of items.
const Row = (props) => {
  return (
    <tr style={{textAlign:"center"}}>
      <td>
        { props.data[0] }
      </td>
      <td>
        { props.data[1] }
      </td>
    </tr>
  );
};  
  
/* BlockContent component: 
 * Generate a table of items retrieved from an API call.
 * Receive 'search' prop from parent container to 
 * filter the table per user input in the search bar.
 */
class BlockContent extends React.Component {
  
  // Constructor, initialize the state.
  constructor(props){
    super(props);
    this.state = {
      currencies: [],
      conversions: [],
      curConv: [],
      filtered: [],
      search: ''
    };
    this.makeAPICall = this.makeAPICall.bind(this);
    this.filterTable = this.filterTable.bind(this);
  }

  // Make API call once when component loads, store results in state.
  componentDidMount(){
    this.makeAPICall();
  }  
  
  makeAPICall = () => {
    apiCall(this.props.base)
    .then(apiResults => { 
      let mixed = apiResults.currencies.map( (x, i) => { 
                    return [x, apiResults.conversions[i]]; 
                  });
      this.setState({
        currencies: apiResults.currencies, 
        conversions: apiResults.conversions,
        curConv: mixed,
        filtered: mixed
      });
    });
  }
  
  // Filter table per the user's input in the search bar.
  componentWillReceiveProps(newProps) {
    if (this.props.search !== newProps.search) {
      this.filterTable(newProps);
    }    
  }
  
  filterTable = (props) => {
    let itemList = this.state.curConv;
    itemList = itemList.filter( (item) => {
      return item[0].toLowerCase().search(
        props.search) !== -1; 
      });
    this.setState({filtered: itemList});
  }

  // Modularize the table header for reusability on additional tabs.
  tableHeader = () => {
    return(
      <thead>
        <tr style={{textAlign:"center"}}>
          <th scope="col" className="h4">Currency</th>
          <th scope="col" className="h4">Conversion</th>
        </tr>
      </thead>
    );
  };
  
  render() {
    
    // Define method for rendering the table rows.
    let rows = this.state.filtered.map(item => {
      return <Row key={item.id} data={item}/>;
    });
    
    return(           
      <div className="tab-content">
        {/* USD tab */}
        <div className="tab-pane fade show active" id="usd" role="tabpanel" aria-labelledby="usd-tab">
          <table className="table">
            {this.tableHeader()}
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </div> 
    );
  }
}

BlockContent.propTypes = {
  base: PropTypes.string.isRequired, /* currency base */
  search: PropTypes.string.isRequired  /* user search input */
};

export default BlockContent;

