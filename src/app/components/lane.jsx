import React from 'react';
import _ from 'lodash'
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
import Icon from './icon'

import Notes from './notes';

const styles = {
  icon: {
    position: 'absolute',
    fontSize: '1.2em',
    top: '50%',
    cursor: 'pointer',
    color: '#9e9e9e',
  },
  container: {
    width: '20%',
    display: 'inline-block',
    margin: '10px',
    verticalAlign: 'top',
  },
}

const Lane = React.createClass({

  render() {

    const { laneId, name } = this.props;


    return (
      <Card
        dataKey={laneId}
        initiallyExpanded={true}
        style={styles.container}
        >
        <CardHeader
          title={name}
          avatar={<Avatar style={{display:'none'}} />}
          style={{height: '40px'}}
          >
          <Icon
            iconName='plus-square-o'
            className='lane__edit-icon'
            style={
              _.extend(
                {},
                styles.icon,
                {right: '28px'}
              )
            }
            onClick={
              noteActions.addNote.bind(null, { laneId })
            }
          />
          <Icon
            iconName='trash-o'
            className='lane__delete-icon'
            style={
              _.extend(
                {},
                styles.icon,
                {right: '10px'}
              )
            }
            onClick={
              laneActions.deleteLane.bind(null, { laneId })
            }
          />
        </CardHeader>
        <Notes laneId={laneId} />
      </Card>
    );
  },
});

export default Lane;
