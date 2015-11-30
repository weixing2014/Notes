import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/lib/text-field';
import noteActions from '../actions/NoteActions'

const NoteTextField = React.createClass({
  componentDidMount() {
    this.refs.textField.focus();
  },

  onEnterKeyDown() {
    const { laneId, noteId } = this.props;
    noteActions.editNoteDone({
      laneId: laneId,
      noteId: noteId,
      task: this.refs.textField.getValue(),
    })
  },

  render() {
    const { task } = this.props;
    return (
      <TextField
        ref="textField"
        defaultValue={ task }
        onEnterKeyDown={ this.onEnterKeyDown } />
    );
  },
})

export default NoteTextField;
