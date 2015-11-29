import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import FlatButton from 'material-ui/lib/flat-button';
import noteActions from '../actions/NoteActions';
import laneActions from '../actions/LaneActions';
import Notes from './notes';

const Lane = React.createClass({

  render() {

    const { dataKey, name } = this.props;

    let containerStyle = {
      textAlign: 'left',
      display: 'inline-block',
      width: '300px',
    };

    return (
      <div dataKey={dataKey} style={containerStyle}>
        <div>{name}</div>
        <FlatButton primary={true} onClick={noteActions.addNote} label={"Add Note"} />
        <Notes />
      </div>
    );
  },
});

export default Lane;
