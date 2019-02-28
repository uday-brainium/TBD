import React, { Component } from 'react';
import { Pagination } from 'react-bootstrap';

export default class Pagination_component extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentpage: 1
    };
  }

  changePaginate = (page) => {
     this.props.paginate(page)
     this.setState({currentpage: page})
  }

  render() {
    const { currentpage, perpage, totaldata } = this.props  
    let active = currentpage;
    let totalTab = totaldata / perpage
    console.log(totalTab);
    
    let items = [];
    for (let number = 1; number <= totalTab; number++) {
        items.push(
        <Pagination.Item key={number} active={number === active}>
          <a onClick={() => this.changePaginate(number)}>{number}</a>
        </Pagination.Item>,
        );
    }

    return (
      <Pagination>
        <Pagination.Prev />
         {items}
        <Pagination.Next />
      </Pagination>
    );
  }
}
