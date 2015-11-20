import React from 'react';
import Note from './note.jsx'
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

export default class Notes extends React.Component {

  render() {
    return (
      <List>
        {
          this.props.items.map(
            note =>  (<Note dataKey={ note.id }
                              task={ note.task }
                              onUpdateNote={ this.props.onUpdateNote.bind(null, note.id) }/>)
          )
        }
      </List>
    )
  }
}
