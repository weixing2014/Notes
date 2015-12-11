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

  toggleNoteStatus({ noteId, status }) {
    reactor.dispatch(
      'UPDATE_NOTE',
      {
        noteId: noteId,
        status: status,
      },
    );
  },

  postNewNote({laneId, noteId, task}) {
    reactor.dispatch('UPDATE_NOTE', { noteId: noteId, task: task, status: 'posted' });
  },

  postEditingNote({laneId, noteId, task}) {
    reactor.dispatch('UPDATE_NOTE', { noteId: noteId, task: task, status: 'edited' });
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
