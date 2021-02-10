import React, { Component } from 'react';

export default class Sample extends Component {
    state = {
        sample: "testing"
    }
  render() {
      const{sample} = this.props;
    return (
      <div> 
            <h1>Sample Display : {sample}</h1>
       </div>
    );
  }
}
