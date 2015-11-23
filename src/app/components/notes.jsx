import React from 'react';
import reactor from '../libs/reactor'
import getters from './../getters'
import Note from './note.jsx';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';


const Notes = React.createClass({

  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
      notes: getters.notes,
    }
  },

  render() {
    return (
      <List>
        {
          this.state.notes.map(
            note => (
              <Note
                dataKey={ note.get('id') }
                task={ note.get('task') }
                isEditing= { note.get('isEditing')}
                />
            )
          )
        }
      </List>
    )
  },

});

export default Notes;
