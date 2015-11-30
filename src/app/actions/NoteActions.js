import reactor from '../libs/reactor';
import uuid from 'node-uuid';

export default {
  addNote({ laneId }) {
    reactor.dispatch(
      'ADD_NOTE',
      { laneId }
    );
  },

  editNoteDone({ laneId, noteId, task }) {
    reactor.batch( function() {

      reactor.dispatch(
        'TOGGLE_NOTE_EDITING',
        {
          laneId: laneId,
          noteId: noteId,
          isEditing: false,
        },
      );

      reactor.dispatch(
        'UPDATE_NOTE',
        {
          laneId: laneId,
          noteId: noteId,
          task: task,
        }
      );

    })
  },

  deleteNote({ laneId, noteId }) {
    reactor.dispatch(
      'DELETE_NOTE',
      { laneId, noteId }
    );
  },

  editNote({ laneId, noteId }) {
    reactor.dispatch(
      'TOGGLE_NOTE_EDITING',
      {
        laneId: laneId,
        noteId: noteId,
        isEditing: true,
      }
    );
  },
}
