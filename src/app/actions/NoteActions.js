import reactor from '../libs/reactor'
import uuid from 'node-uuid'
import localforage from 'localforage'
import getters from './../getters'

export default {
  addNote({ laneId }) {
    const lane = reactor.evaluate(getters.lanes).findIndex( lane => lane.get('id') === laneId )
    const laneIncludesNewNote = reactor.evaluate(['lanes']).getIn([0, 'notes']).map( note => note.get('status') ).includes('new')

    if (!laneIncludesNewNote) {
      reactor.dispatch(
        'ADD_NOTE',
        { laneId }
      );
    }
  },

  toggleNoteStatus({ noteId, status }) {
    reactor.dispatch(
      'UPDATE_NOTE',
      {
        noteId: noteId,
        status: status,
      },
    );
  },

  postNewNote({laneId, noteId, title, description}) {
    reactor.batch( function() {
      reactor.dispatch('UPDATE_NOTE', {
        noteId: noteId,
        title: title,
        description: description,
        status: 'posted',
      });
    })
  },

  postEditingNote({laneId, noteId, title}) {
    reactor.dispatch('UPDATE_NOTE', { noteId: noteId, title: title, status: 'edited' });
  },

  deleteNote({ noteId }) {
    reactor.dispatch(
      'DELETE_NOTE',
      { noteId }
    );
  },

  editNote({ noteId }) {
    reactor.dispatch(
      'UPDATE_NOTE',
      {
        noteId: noteId,
        status: 'editing',
      }
    );
  },

  moveAround({ sourceNoteId, targetNoteId, isAbove }) {
    reactor.dispatch(
      'MOVE_NOTE',
      {
        sourceNoteId,
        targetNoteId,
        isAbove,
      }
    );
  },

  persist() {
    const appState = reactor.evaluate(['lanes']).toJS();

    localforage.setItem('kanbanAppState', appState);
  },

  fetchAppState() {
    localforage.getItem('kanbanAppState', function(err, value) {
      reactor.dispatch(
        'RECEIVE_APP_STATE',
        {
          appState: value,
        }
      );
    });
  },

  setTargetLaneToDrop({ laneId }) {
    reactor.dispatch(
      'SET_TARGET_LANE_TO_DROP',
      {
        laneId,
      }
    )
  },

  attachToLane({ noteId, laneId }) {
    reactor.dispatch(
      'ATTACH_TO_LANE',
      {
        noteId,
        laneId,
      }
    )
  },
}
