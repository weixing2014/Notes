import React from 'react';
import ReactDOM from 'react-dom';
import reactor from '../libs/reactor';
import getters from './../getters';
import TextField from 'material-ui/lib/text-field';
import noteActions from '../actions/NoteActions'
import { Panel, Input, Button } from 'react-bootstrap';

const NoteTextField = React.createClass({
  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
      lanes: getters.lanes,
    }
  },

  componentDidMount() {
    if (this.refs.textField) {
      ReactDOM.findDOMNode(this.refs.textField.refs.input).focus();
    }
  },

  updateNote() {
    const { laneId, noteId, status } = this.props;
    if (this.refs.textField.getValue()) {
      const note = {
        laneId: laneId,
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

  cancelPostingNote(event) {
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

  onLaneInputKeyDown(e) {
    if (e.keyCode === 13) {
      this.updateNote();
    }
  },

  render() {
    const { task, status } = this.props;
    return (
      <Input
        type="text"
        ref="textField"
        placeholder="Say something…"
        buttonAfter={
          <Button onClick={this.postNote}>
            <i className="fa fa-check" style={{color: '#9e9e9e'}}/>
          </Button>
        }
        onKeyDown={this.onLaneInputKeyDown}
        defaultValue={ task }
        standalone
        />
    );
  },
})

export default NoteTextField;
