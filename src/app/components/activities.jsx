import React from 'react';
import Activity from './activity'

const Activities = React.createClass({

  renderActivities() {
    const { list } = this.props;
    
    return list.map(
      function( activity ) {
        const { id, ...other} = activity
        return <Activity key={id} dataKey={id} {...other} />
      }
    )
  },

  render() {
    const { label } = this.props;

    return (
      <div>
        <label>{label}</label>
        { this.renderActivities() }
      </div>
    )
  },
})

export default Activities;
