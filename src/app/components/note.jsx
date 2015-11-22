import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import TextField from 'material-ui/lib/text-field';
import NoteTextField from './note-text-field'
import Colors from 'material-ui/lib/styles/colors'

export default class Note extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
    }

    this.onEditNote = this.onEditNote.bind(this);
    this.onEditFinish = this.onEditFinish.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.renderTask = this.renderTask.bind(this);
  }

  onEditNote() {
    this.setState({
      isEditing: true,
    });
  }

  onEditFinish( newTask ) {
    this.setState({
      isEditing: false,
    });

    this.props.onUpdateNote(newTask);
  }

  renderEdit() {
    return (
      <NoteTextField ref={"noteTextField"} task={ this.props.task } onEnterKeyDown={ this.onEditFinish } />
    );
  }

  renderTask() {
    return (
      <ListItem>
        <span dataKey={ this.props.dataKey } onTouchTap={ this.onEditNote }>
          { this.props.task }
        </span>
        <span style={{ marginLeft: '5px', color: Colors.red500 }} className="fa fa-times" />
      </ListItem>
    );
  }

  render() {
    return (
      <div>
        { this.state.isEditing ? this.renderEdit() : this.renderTask() }
      </div>
    );
  }
}
