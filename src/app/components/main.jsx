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
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">PivotalTraXing</a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
              <ul className="nav navbar-nav">
                <li className="active">
                  <a href="#" onClick={laneActions.addLane}><i className="fa fa-plus" /> Add Lane</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Lanes />
      </div>
    )
  },

})

export default DragDropContext(HTML5Backend)(Main);
