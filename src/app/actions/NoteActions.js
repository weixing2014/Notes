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

  toggleNoteEditing({ noteId, isEditing }) {
    reactor.dispatch(
      'TOGGLE_NOTE_EDITING',
      {
        noteId: noteId,
        isEditing: false,
      },
    );
  },

  editNoteDone({laneId, noteId, task}) {
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

      reactor.dispatch(
        'ADD_NOTE',
        {
          laneId: laneId,
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

  moveAround({ sourceNoteId, targetNoteId, isAbove }) {
    reactor.dispatch(
      'MOVE_NOTE_AROUND',
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
}
