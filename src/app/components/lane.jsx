import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardExpandable from 'material-ui/lib/card/card-expandable';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import FlatButton from 'material-ui/lib/flat-button';
import noteActions from '../actions/NoteActions';
import laneActions from '../actions/LaneActions';

import Notes from './notes';

const Lane = React.createClass({

  render() {

    const { laneId, name } = this.props;

    let containerStyle = {
      width: '20%',
      display: 'inline-block',
      margin: '10px',
      verticalAlign: 'top',
    };

    return (
      <Card
        dataKey={laneId}
        initiallyExpanded={true}
        style={containerStyle}
        >
        <CardHeader
          title={name}
          avatar={<Avatar style={{display:'none'}} />}
          style={{height: '40px'}}
          >
          <span
            className='fa fa-sticky-note-o'
            style={{
              position: 'absolute',
              right: '10px',
              fontSize: '1.2em',
              top: '50%',
              cursor: 'pointer',
            }}
            onClick={
              noteActions.addNote.bind(null, { laneId })
            }
          />
        </CardHeader>
        <Notes laneId={laneId} />
      </Card>

      // <div dataKey={laneId} style={containerStyle}>
      //   <div>
      //     <span>{name}</span>
      //   <span style={{ marginLeft: '5px', color: Colors.red500 }} className="fa fa-times" onClick={ laneActions.deleteLane.bind(null, { laneId }) }/>
      //   </div>
      //   <FlatButton primary={true} onClick={ noteActions.addNote.bind(null, { laneId }) } label={"Add Note"} />
      //   <Notes laneId={laneId} />
      // </div>
    );
  },
});

export default Lane;
