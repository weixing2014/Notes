/** In this file, we create a React component which incorporates components provided by material-ui */

import React from 'react';
import reactor from '../libs/reactor'
import CartStore from './../stores/NoteStore'

import FlatButton from 'material-ui/lib/flat-button';
import List from 'material-ui/lib/lists/list';
import ListDivider from 'material-ui/lib/lists/list-divider';
import ListItem from 'material-ui/lib/lists/list-item';
import uuid from 'node-uuid';
import Notes from './notes';
import Lanes from './lanes';
import MenuItem from 'material-ui/lib/menus/menu-item';
import MenuDivider from 'material-ui/lib/menus/menu-divider';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import Colors from 'material-ui/lib/styles/colors';
import laneActions from '../actions/LaneActions';
import noteActions from '../actions/NoteActions';

const Main = React.createClass({
  render() {

    return (
      <div ref="kanbanContainer" className="kanban-container">
        <FlatButton primary={true} onClick={laneActions.addLane} label={"Add Lane"} style={{display: 'block'}} />
        <Lanes />
      </div>
    )
  },

})

export default Main;
