import reactor from '../libs/reactor';
import uuid from 'node-uuid';

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
}
