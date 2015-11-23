import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import TextField from 'material-ui/lib/text-field';
import NoteTextField from './note-text-field'
import Colors from 'material-ui/lib/styles/colors'
import noteActions from '../actions/NoteActions'

const Note = React.createClass({
  renderEdit() {
    const { dataKey, task } = this.props;
    return (
      <NoteTextField
        dataKey={ dataKey }
        task={ task }
        onEnterKeyDown = { noteActions.editNoteDone }
        />
    );
  },

  renderTask() {
    const { dataKey, task } = this.props
    return (
      <ListItem>
        <span dataKey={ dataKey } onClick={ noteActions.editNote.bind(null, { id: dataKey }) }>
          { task }
        </span>
        <span style={{ marginLeft: '5px', color: Colors.red500 }} className="fa fa-times" onClick={ noteActions.deleteNote.bind(null, { id: dataKey }) }/>
      </ListItem>
    );
  },

  render() {
    const { isEditing } = this.props

    return (
      <div>
        { isEditing ? this.renderEdit() : this.renderTask() }
      </div>
    );
  },
});

export default Note;
