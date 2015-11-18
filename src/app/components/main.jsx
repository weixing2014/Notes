/** In this file, we create a React component which incorporates components provided by material-ui */

import React from 'react';
import FlatButton from 'material-ui/lib/flat-button';
import List from 'material-ui/lib/lists/list';
import uuid from 'node-uuid';
import Notes from './notes'

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

  onUpdateNote( note ) {
    let notes = this.state.notes;
    let index = notes.findIndex(
      (n) => n.id === note.id
    );

    notes[index]['task'] = note.task;
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
