import reactor from '../libs/reactor';
import uuid from 'node-uuid';

export default {
  fetchNotes() {
    const notes = [];

    reactor.dispatch(
      'RECEIVE_NOTES',
      { notes }
    );
  },

  addNote({ task }) {
    reactor.dispatch('ADD_NOTE');
  },

  editNoteDone({ id, task }) {
    reactor.batch( function() {

      reactor.dispatch(
        'TOGGLE_NOTE_EDITING',
        { id: id, isEditing: false },
      );

      reactor.dispatch(
        'UPDATE_NOTE',
        { id, task }
      );

    })
  },

  deleteNote({ id }) {
    reactor.dispatch(
      'DELETE_NOTE',
      { id }
    );
  },

  editNote({ id }) {
    reactor.dispatch(
      'TOGGLE_NOTE_EDITING',
      { id: id, isEditing: true }
    );
  },

  addNote() {
    reactor.dispatch(
      'ADD_NOTE'
    );
  },
}
