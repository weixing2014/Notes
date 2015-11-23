import reactor from '../libs/reactor';
import uuid from 'node-uuid';

export default {
  fetchNotes() {
    const notes = [
      {
        id: uuid.v4(),
        task: 'Learn Webpack',
        isEditing: false,
      },
      {
        id: uuid.v4(),
        task: 'Learn React',
        isEditing: false,
      },
      {
        id: uuid.v4(),
        task: 'Do laundry',
        isEditing: false,
      },
    ];

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
