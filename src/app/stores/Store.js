import { Store, toImmutable } from 'nuclear-js'
import uuid from 'node-uuid';

export default Store({
  getInitialState() {
    return toImmutable([]);
  },

  initialize() {
    this.on('RECEIVE_APP_STATE', receiveAppState);

    this.on('ADD_LANE', addLane);
    this.on('DELETE_LANE', deleteLane);

    this.on('ADD_NOTE', addNote);
    this.on('UPDATE_NOTE', updateNote);
    this.on('DELETE_NOTE', deleteNote);
    this.on('TOGGLE_NOTE_EDITING', toggleNoteEditing);

    this.on('MOVE_NOTE_AROUND', moveNoteAround);
  },
})

function receiveAppState(state, { appState }) {
  return toImmutable(appState);
}

function deleteLane(state, { laneId }) {
  const laneIndex = findLaneIndex(state, { laneId });

  return state.delete(laneIndex);
}

function findLaneIndex(state, { laneId, noteId }) {
  if (laneId) {
    return state.findIndex(
      (lane) => lane.get('id') === laneId
    )
  } else if (noteId) {
    return state.findIndex(
      lane => lane.get('notes').map(x => x.get('id')).includes(noteId)
    );
  }
}

function addLane(state, { name }) {
  const laneName = name || "New Lane";
  const newLane = toImmutable({
    id: uuid.v4(),
    name: laneName,
    notes: [],
  })

  return state.push(newLane);
}

function deleteNote(state, { laneId, noteId }) {
  const { laneIndex, noteIndex } = findLaneAndNoteIndex(state, { laneId, noteId });
  return state.deleteIn([laneIndex, 'notes', noteIndex]);
}

function updateNote(state, { laneId, noteId, task }) {
  const { laneIndex, noteIndex } = findLaneAndNoteIndex(state, { laneId, noteId });
  return state.updateIn(
    [laneIndex, 'notes', noteIndex],
    (note) => note.set('task', task)
  );
}

function findLaneAndNoteIndex(state, { noteId }) {
  const laneIndex = findLaneIndex(state, { noteId }),
        noteIndex = state.getIn([laneIndex, 'notes']).findIndex((n) => n.get('id') === noteId);

  return { laneIndex, noteIndex };
}

function toggleNoteEditing(state, { laneId, noteId, isEditing }) {
  const { laneIndex, noteIndex } = findLaneAndNoteIndex(state, { noteId });
  return state.updateIn(
    [laneIndex, 'notes', noteIndex],
    (note) => note.set('isEditing', isEditing)
  );
}

function addNote( state, { laneId } ) {

  const noteId = uuid.v4(),
     laneIndex = findLaneIndex(state, { laneId }),
       newNote = toImmutable({
         id: noteId,
         task: '',
         isEditing: true,
       })

  const newState = state.updateIn(
    [laneIndex, 'notes'],
    function(notes) {
      return notes.push(newNote);
    }
  )

  return newState;
}

function moveNoteAround( state, { sourceNoteId, targetNoteId, isAbove }) {
  if (sourceNoteId !== targetNoteId) {

    const sourceLandAndNoteIndexes = findLaneAndNoteIndex(state, { noteId: sourceNoteId });
    const sourceLaneIndex = sourceLandAndNoteIndexes.laneIndex;
    const sourceNoteIndex = sourceLandAndNoteIndexes.noteIndex;

    const sourceNote = state.getIn([sourceLaneIndex, 'notes', sourceNoteIndex]);
    const stateWithoutSourceNote = state.deleteIn([sourceLaneIndex, 'notes', sourceNoteIndex]);

    const targetLandAndNoteIndexes = findLaneAndNoteIndex(stateWithoutSourceNote, { noteId: targetNoteId });
    const targetLaneIndex = targetLandAndNoteIndexes.laneIndex;
    const targetNoteIndex = targetLandAndNoteIndexes.noteIndex;

    return stateWithoutSourceNote.updateIn([targetLaneIndex, 'notes'], function(notes) {
      return notes.splice( targetNoteIndex + (isAbove ? 0 : 1), 0, sourceNote);
    });
  } else {
    return state;
  }
}
