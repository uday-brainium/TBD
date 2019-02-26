import React, { Component } from 'react';


export default class SimpleLoader extends Component {
  

  render() {
    return (
     <div>
      {this.props.loading &&
        <div className="loader-container">
           <center>
             <div className="loader-body animated bounceIn">
              <div className="spinner-border custom-loader" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <span className="loader-text">Loading...</span>
            </div>
            </center>
        </div>
        }
     </div>
    );
  }
}
