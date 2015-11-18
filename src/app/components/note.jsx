import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';
import TextField from 'material-ui/lib/text-field';

export default class Note extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
    }

    this.onEditNote = this.onEditNote.bind(this);
    this.onEditFinish = this.onEditFinish.bind(this);
  }

  onEditNote() {
    this.setState({
      isEditing: true,
    });
  }

  onEditFinish() {
    this.setState({
      isEditing: false,
    });
    ;
    this.props.onUpdateNote({
      id: this.props.dataKey,
      task: this.refs.textField.getValue(),
    });
  }

  render() {
    ;
    if ( this.state.isEditing ) {
      return (
        <div>
          <TextField ref="textField" defaultValue={ this.props.task } onEnterKeyDown={ this.onEditFinish} />
        </div>
      )
    } else {
      return (
        <ListItem dataKey={ this.props.dataKey } primaryText={ this.props.task } onTouchTap={ this.onEditNote } />
      )
    }
  }
}
