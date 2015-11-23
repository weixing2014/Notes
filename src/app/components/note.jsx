import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import TextField from 'material-ui/lib/text-field';
import NoteTextField from './note-text-field'
import Colors from 'material-ui/lib/styles/colors'

const Note = React.createClass({
  onEditNote() {
    this.setState({
      isEditing: true,
    });
  },

  onEditFinish( newTask ) {
    this.setState({
      isEditing: false,
    });

    this.props.onUpdateNote(newTask);
  },

  renderEdit() {
    return (
      <NoteTextField ref={"noteTextField"} task={ this.props.task } onEnterKeyDown={ this.onEditFinish } />
    );
  },

  renderTask() {
    const { dataKey, task } = this.props
    return (
      <ListItem>
        <span dataKey={ dataKey } onTouchTap={ this.onEditNote }>
          { task }
        </span>
        <span style={{ marginLeft: '5px', color: Colors.red500 }} className="fa fa-times" />
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
