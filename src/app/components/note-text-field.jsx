import React from 'react';
import ReactDOM from 'react-dom';
import TextField from 'material-ui/lib/text-field';

const NoteTextField = React.createClass({
  componentDidMount() {
    this.refs.textField.focus();
  },

  onEnterKeyDown() {
    const { dataKey, task, onEnterKeyDown } = this.props;
    onEnterKeyDown({
      id: dataKey,
      task: this.refs.textField.getValue(),
    })
  },

  render() {
    const { dataKey, task, onEnterKeyDown } = this.props;
    return (
      <TextField
        ref="textField"
        defaultValue={ task }
        dataKey={ dataKey}
        onEnterKeyDown={ this.onEnterKeyDown } />
    );
  },
})

export default NoteTextField;
