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

  updateNote() {
    const { noteId, status } = this.props;
    if (this.refs.textField.getValue()) {
      const note = {
        noteId: noteId,
        task: this.refs.textField.getValue(),
      }

      if ( status === 'new' ) {
        noteActions.postNewNote(note);
      } else if ( status === 'editing' ) {
        noteActions.postEditingNote(note);
      }
    } else {
      noteActions.deleteNote({
        noteId: noteId,
      })
    }
  },

  cancelPostingNote() {
    const { noteId, status } = this.props;

    if ( status === 'new' ) {
      noteActions.deleteNote({
        noteId: noteId,
      })
    } else if ( status === 'editing' ){
      noteActions.postEditingNote({
        noteId: noteId,
        status: 'edited',
      })
    }
  },

  postNote(event) {
    event.preventDefault();
    this.updateNote();
  },

  render() {
    const { task, status } = this.props;
    return (
      <TextField
        ref="textField"
        defaultValue={ task }
        multiLine={true}
        style={{width: '200px', fontSize:'14px'}}
        onEnterKeyDown={ this.postNote }
        onBlur={ this.cancelPostingNote }
        />
    );
  },
})

export default NoteTextField;
