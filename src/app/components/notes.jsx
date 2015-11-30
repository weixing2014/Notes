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
      lanes: getters.lanes,
    }
  },

  render() {
    const { laneId } = this.props;
    const laneIndex = this.state.lanes.findIndex((lane) => lane.get('id') === laneId);
    const notes = this.state.lanes.get(laneIndex).get('notes');

    return (
      <List>
        {
          notes.map(
            note => (
              <Note
                laneId = { laneId }
                noteId={ note.get('id') }
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
