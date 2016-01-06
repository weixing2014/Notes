import React from 'react';
import reactor from '../libs/reactor'
import getters from './../getters'
import Note from './note.jsx'
import NoteEdit from './note-edit.jsx'

const Notes = React.createClass({

  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
      lanes: getters.lanes,
    }
  },

  render() {
    const { laneId } = this.props
    const laneIndex = this.state.lanes.findIndex((lane) => lane.get('id') === laneId)
    const notes = this.state.lanes.get(laneIndex).get('notes').toJS()

    return (
      <div className="notes">
        {
          notes.map(
            function(note) {
              if (note.status === 'new' || note.status === 'editing') {
                return (
                  <NoteEdit
                    laneId={ laneId }
                    noteId={ note.id }
                    title={ note.title }
                    description={ note.description }
                    activities={ note.activities }
                    />
                )
              } else {
                return (
                  <Note
                    laneId={ laneId }
                    noteId={ note.id }
                    title={ note.title }
                  />
                )
              }
            }
          )
        }
      </div>
    )
  },
});

export default Notes;
