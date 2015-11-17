import React from 'react';

export default class Note extends React.Component {

  render() {
    return (
      <li key={this.props.id}>
        {this.props.task}
      </li>
    )
  }
}
