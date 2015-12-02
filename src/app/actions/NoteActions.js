import reactor from '../libs/reactor';
import uuid from 'node-uuid';
import localforage from 'localforage';

export default {
  addNote({ laneId }) {
    reactor.dispatch(
      'ADD_NOTE',
      { laneId }
    );
  },

  editNoteDone({noteId, task}) {
    reactor.batch( function() {

      reactor.dispatch(
        'TOGGLE_NOTE_EDITING',
        {
          noteId: noteId,
          isEditing: false,
        },
      );

      reactor.dispatch(
        'UPDATE_NOTE',
        {
          noteId: noteId,
          task: task,
        }
      );

    })
  },

  deleteNote({ noteId }) {
    reactor.dispatch(
      'DELETE_NOTE',
      { noteId }
    );
  },

  editNote({ noteId }) {
    reactor.dispatch(
      'TOGGLE_NOTE_EDITING',
      {
        noteId: noteId,
        isEditing: true,
      }
    );
  },

  moveAround({ sourceNoteId, targetNoteId }) {
    reactor.dispatch(
      'MOVE_NOTE_AROUND',
      {
        sourceNoteId,
        targetNoteId,
      }
    );
  },

  persist() {
    const appState = reactor.evaluate(['lanes']).toJS();

    localforage.setItem('kanbanAppState', appState);
    // localforage.getItem('kanbanAppState', function(err, value) { console.log(value) });
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
}
