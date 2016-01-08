/** In this file, we create a React component which incorporates components provided by material-ui */

import React from 'react'
import { Button } from 'react-bootstrap'
import Lanes from './lanes'
import SingletonModal from './singleton-modal'
import laneActions from '../actions/LaneActions'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

const Main = React.createClass({

  render() {
    return (
      <div ref="kanbanContainer" style={{height: '100%', width: '100%', padding: '0 5px'}} className="kanban-container">
        <header style={{ height: "50px", width: "100%", position: 'relative' }}>
          <Button onClick={laneActions.addLane} style={{position: 'absolute', top: '50%', transform: 'translateY(-50%)'}}>
            <i className="fa fa-plus"/> Add Lane
          </Button>
        </header>
        <Lanes />
        <SingletonModal />
      </div>
    )
  },

})

export default DragDropContext(HTML5Backend)(Main);
