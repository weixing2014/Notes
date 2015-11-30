import React from 'react';
import Colors from 'material-ui/lib/styles/colors';
import FlatButton from 'material-ui/lib/flat-button';
import noteActions from '../actions/NoteActions';
import laneActions from '../actions/LaneActions';
import Notes from './notes';

const Lane = React.createClass({

  render() {

    const { laneId, name } = this.props;

    let containerStyle = {
      textAlign: 'left',
      display: 'inline-block',
      width: '300px',
      verticalAlign: 'top',
    };

    return (
      <div dataKey={laneId} style={containerStyle}>
        <div>
          <span>{name}</span>
        <span style={{ marginLeft: '5px', color: Colors.red500 }} className="fa fa-times" onClick={ laneActions.deleteLane.bind(null, { laneId }) }/>
        </div>
        <FlatButton primary={true} onClick={ noteActions.addNote.bind(null, { laneId }) } label={"Add Note"} />
        <Notes laneId={laneId} />
      </div>
    );
  },
});

export default Lane;
