import React from 'react';
import ReactDOM from 'react-dom';
import reactor from '../libs/reactor';
import getters from './../getters';
import TextField from 'material-ui/lib/text-field';
import noteActions from '../actions/NoteActions'

const NoteTextField = React.createClass({
  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
      lanes: getters.lanes,
    }
  },

  componentDidMount() {
    this.refs.textField.focus();
  },

  onEditDone(event) {
    event.preventDefault();
    const { laneId, noteId } = this.props;
    if (this.refs.textField.getValue()) {
      noteActions.editNoteDone({
        laneId: laneId,
        noteId: noteId,
        task: this.refs.textField.getValue(),
      })
    } else {
      noteActions.deleteNote({
        noteId: noteId,
      })
    }
  },

  onLoseFocus(event) {
    const { laneId, noteId } = this.props;

    const laneIndex = this.state.lanes.findIndex(lane => lane.get('id') === laneId );
    const noteIndex = this.state.lanes.getIn([laneIndex, 'notes']).findIndex(note => note.get('id') === noteId);

    if(this.state.lanes.getIn([laneIndex, 'notes', noteIndex, 'task'])) {
      noteActions.toggleNoteEditing({
        noteId: noteId,
        isEditing: false,
      });
    } else {
      noteActions.deleteNote({
        noteId: noteId,
      })
    }
  },

  render() {
    const { task } = this.props;
    return (
      <TextField
        ref="textField"
        defaultValue={ task }
        multiLine={true}
        style={{width: '200px'}}
        onEnterKeyDown={ this.onEditDone }
        onBlur={ this.onLoseFocus } />
    );
  },
})

export default NoteTextField;
