/** In this file, we create a React component which incorporates components provided by material-ui */

import React from 'react';
import reactor from '../libs/reactor'
import CartStore from './../stores/Store'
import { Nav, NavItem, Button } from 'react-bootstrap';
import uuid from 'node-uuid';
import Notes from './notes';
import Lanes from './lanes';
import noteActions from '../actions/NoteActions';
import laneActions from '../actions/LaneActions';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const Main = React.createClass({

  render() {
    return (
      <div ref="kanbanContainer" className="kanban-container container-fluid">
        <Button onClick={laneActions.addLane} style={{margin: '10px 0'}}>
          <i className="fa fa-plus"/> Add Lane
        </Button>
        <Lanes />
      </div>
    )
  },

})

export default DragDropContext(HTML5Backend)(Main);
