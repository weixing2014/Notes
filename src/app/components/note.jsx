import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import TextField from 'material-ui/lib/text-field';
import NoteTextField from './note-text-field'
import Colors from 'material-ui/lib/styles/colors'
import noteActions from '../actions/NoteActions'

const Note = React.createClass({
  renderEdit() {
    const { laneId, noteId, task } = this.props;
    return (
      <NoteTextField
        laneId={ laneId }
        noteId={ noteId }
        task={ task }
        />
    );
  },

  renderTask() {
    const { laneId, noteId, task } = this.props
    return (
      <ListItem>
        <span noteId={ noteId } laneId={ laneId } onClick={ noteActions.editNote.bind(null, { laneId, noteId }) }>
          { task }
        </span>
        <span style={{ marginLeft: '5px', color: Colors.red500 }} className="fa fa-times" onClick={ noteActions.deleteNote.bind(null, { laneId, noteId }) }/>
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
