import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/lib/text-field';

export default class NoteTextField extends React.Component {

  constructor(props) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
    this.onEditFinish = this.onEditFinish.bind(this);
  }

  componentDidMount() {
    this.refs.textField.focus();
  }

  onEditFinish() {
    this.props.onEnterKeyDown(this.refs.textField.getValue());
  }

  render() {
    return (
      <TextField ref="textField" defaultValue={ this.props.task } onEnterKeyDown={ this.onEditFinish } />
    );
  }
}
