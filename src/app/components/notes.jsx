import React from 'react';
import reactor from '../libs/reactor'
import getters from './../getters'
import Note from './note.jsx';


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
    const notes = this.state.lanes.get(laneIndex).get('notes').toJS();

    return (
      <div className="notes">
        {
          notes.map(
            note => (
              <Note
                laneId={ laneId }
                noteId={ note.id }
                task={ note.task }
                status={ note.status }
                description={ note.description }
                activities={ note.activities } 
                />
            )
          )
        }
      </div>
    )
  },

});

export default Notes;
