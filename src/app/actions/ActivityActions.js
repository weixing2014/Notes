import reactor from '../libs/reactor';
import uuid from 'node-uuid';

export default {
  postEditingActivity({ id, content }) {
    reactor.batch(function() {
      reactor.dispatch('UPDATE_ACTIVITY', { id: id, content: content, isEditing: false })
      reactor.dispatch('CREATE_ACTIVITY', { id })
    })
  },

  // toggleNoteStatus({ noteId, status }) {
  //   reactor.dispatch(
  //     'UPDATE_NOTE',
  //     {
  //       noteId: noteId,
  //       status: status,
  //     },
  //   );
  // },
  //
  // postNewNote({laneId, noteId, task}) {
  //   reactor.batch( function() {
  //     reactor.dispatch('UPDATE_NOTE', { noteId: noteId, task: task, status: 'posted' });
  //     reactor.dispatch('ADD_NOTE', { laneId });
  //   })
  // },
  //
  // postEditingNote({laneId, noteId, task}) {
  //   reactor.dispatch('UPDATE_NOTE', { noteId: noteId, task: task, status: 'edited' });
  // },
  //
  // deleteNote({ noteId }) {
  //   reactor.dispatch(
  //     'DELETE_NOTE',
  //     { noteId }
  //   );
  // },
  //
  // editNote({ noteId }) {
  //   reactor.dispatch(
  //     'UPDATE_NOTE',
  //     {
  //       noteId: noteId,
  //       status: 'editing',
  //     }
  //   );
  // },
  //
  // moveAround({ sourceNoteId, targetNoteId, isAbove }) {
  //   reactor.dispatch(
  //     'MOVE_NOTE',
  //     {
  //       sourceNoteId,
  //       targetNoteId,
  //       isAbove,
  //     }
  //   );
  // },
  //
  // persist() {
  //   const appState = reactor.evaluate(['lanes']).toJS();
  //
  //   localforage.setItem('kanbanAppState', appState);
  // },
  //
  // fetchAppState() {
  //   localforage.getItem('kanbanAppState', function(err, value) {
  //     reactor.dispatch(
  //       'RECEIVE_APP_STATE',
  //       {
  //         appState: value,
  //       }
  //     );
  //   });
  // },
  //
  // setTargetLaneToDrop({ laneId }) {
  //   reactor.dispatch(
  //     'SET_TARGET_LANE_TO_DROP',
  //     {
  //       laneId,
  //     }
  //   )
  // },
  //
  // attachToLane({ noteId, laneId }) {
  //   reactor.dispatch(
  //     'ATTACH_TO_LANE',
  //     {
  //       noteId,
  //       laneId,
  //     }
  //   )
  // },
}
