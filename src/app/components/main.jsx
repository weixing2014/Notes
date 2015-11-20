/** In this file, we create a React component which incorporates components provided by material-ui */

import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import List from 'material-ui/lib/lists/list';
import ListDivider from 'material-ui/lib/lists/list-divider';
import ListItem from 'material-ui/lib/lists/list-item';
import uuid from 'node-uuid';
import Notes from './notes'
import MenuItem from 'material-ui/lib/menus/menu-item';
import MenuDivider from 'material-ui/lib/menus/menu-divider';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import Colors from 'material-ui/lib/styles/colors'

export default class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      notes: [
        {
          id: uuid.v4(),
          task: 'Learn Webpack',
        },
        {
          id: uuid.v4(),
          task: 'Learn React',
        },
        {
          id: uuid.v4(),
          task: 'Do laundry',
        },
      ],
    }

    this.addNote = this.addNote.bind(this);
    this.onUpdateNote = this.onUpdateNote.bind(this);
  }

  addNote() {
    this.setState(
      {
        notes: this.state.notes.concat({
          id: uuid.v4(),
          task: 'Do laundry',
        }),
      }
    );
  }

  onUpdateNote( noteId, newTask ) {
    let notes = this.state.notes;
    let index = notes.findIndex(
      (n) => n.id === noteId
    );

    notes[index]['task'] = newTask;
    this.setState(notes);
  }

  render() {

    let containerStyle = {
      textAlign: 'center',
      paddingTop: '200px',
    };

    return (
      <div style={containerStyle}>
        <FlatButton primary={true} onClick={this.addNote} label={"Add Note"} />
        <Notes items={this.state.notes} onUpdateNote={this.onUpdateNote} />
      </div>
    )
  }

}
