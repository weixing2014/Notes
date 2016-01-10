import React from 'react';
import Activity from './activity'
import ActivityEdit from './activity-edit'

const Activities = React.createClass({
  renderActivities() {
    const { list, noteId } = this.props;

    return list.map(
      function( activity, index ) {
        const { id, isEditing, ...other} = activity

        if (isEditing) {
          return <ActivityEdit key={id} dataKey={id} noteId={noteId} {...other} />
        } else {
          return <Activity key={id} dataKey={id} noteId={noteId} {...other} />
        }
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
