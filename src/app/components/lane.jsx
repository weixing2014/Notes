import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import FlatButton from 'material-ui/lib/flat-button';
import noteActions from '../actions/NoteActions';
import Notes from './notes';

const Lane = React.createClass({

  render() {

    const { laneId, name } = this.props;

    let containerStyle = {
      textAlign: 'left',
      display: 'inline-block',
      width: '300px',
    };

    return (
      <div dataKey={laneId} style={containerStyle}>
        <div>{name}</div>
        <FlatButton primary={true} onClick={noteActions.addNote.bind({ laneId })} label={"Add Note"} />
        <Notes laneId={laneId} />
      </div>
    );
  },
});

export default Lane;
