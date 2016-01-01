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

    this.on('MOVE_NOTE', moveNote);
    this.on('ATTACH_TO_LANE', attachToLane);

    this.on('UPDATE_LANE', updateLane);

    this.on('UPDATE_ACTIVITY', updateActivity)
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
    status: 'new',
    notes: [],
  })

  return state.push(newLane);
}

function deleteNote(state, { noteId }) {
  const { laneIndex, noteIndex } = findLaneAndNoteIndex(state, { noteId });
  return state.deleteIn([laneIndex, 'notes', noteIndex]);
}

function addNote( state, { laneId } ) {
  const laneIndex = findLaneIndex(state, { laneId }),
          newNote = toImmutable({
         id: uuid.v4(),
         task: '',
         status: 'new',
         description: {
           content: 'description',
           isEditing: true,
         },
         activities: [
           {
             id: uuid.v4(),
             author: 'Xing.Wei',
             updated_at: '12 Dec, 9:58pm',
             content: 'Hello, World',
             isEditing: false,
           },
           {
             id: uuid.v4(),
             author: 'Xing.Wei',
             updated_at: '12 Dec, 9:53pm',
             content: '',
             isEditing: true,
           },
         ],
       })

  const newState = state.updateIn(
    [laneIndex, 'notes'],
    function(notes) {
      return notes.push(newNote);
    }
  )
  return newState;
}

function updateNote(state, { noteId, task, status, description, activities }) {
  const { laneIndex, noteIndex } = findLaneAndNoteIndex(state, { noteId });
  return state.updateIn(
    [laneIndex, 'notes', noteIndex],
    function(note) {
      let newNote = note;
      if (task) newNote = newNote.set('task', task);
      if (status) newNote = newNote.set('status', status);
      if (description) newNote = newNote.set('description', description);
      if (activities) newNote = newNote.set('activities', activities);
      return newNote;
    }
  );
}

function findLaneAndNoteIndex(state, { noteId }) {
  const laneIndex = findLaneIndex(state, { noteId }),
        noteIndex = state.getIn([laneIndex, 'notes']).findIndex((n) => n.get('id') === noteId);

  return { laneIndex, noteIndex };
}

function toggleNoteStatus(state, { laneId, noteId, status }) {
  const { laneIndex, noteIndex } = findLaneAndNoteIndex(state, { noteId });
  return state.updateIn(
    [laneIndex, 'notes', noteIndex],
    (note) => note.set('status', status)
  );
}

function moveNote( state, { sourceNoteId, targetNoteId, isAbove }) {
  if (sourceNoteId !== targetNoteId) {

    const sourceLaneAndNoteIndexes = findLaneAndNoteIndex(state, { noteId: sourceNoteId });
    const sourceLaneIndex = sourceLaneAndNoteIndexes.laneIndex;
    const sourceNoteIndex = sourceLaneAndNoteIndexes.noteIndex;

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

function updateLane(state, { laneId, name, status }) {
  const laneIndex = findLaneIndex(state, { laneId });
  return state.update(
    laneIndex,
    lane =>
    lane.set(
      'status',
      status || state.getIn([laneIndex, 'status'])
    ).set(
      'name',
      name || state.getIn([laneIndex, 'name'])
    )
  );
}

function attachToLane(state, { noteId, laneId }) {
  const sourceLaneAndNoteIndexes = findLaneAndNoteIndex(state, { noteId: noteId });
  const sourceLaneIndex = sourceLaneAndNoteIndexes.laneIndex;
  const sourceNoteIndex = sourceLaneAndNoteIndexes.noteIndex;

  const laneIndexToDrop = findLaneIndex(state, { laneId });

  const sourceNote = state.getIn([sourceLaneIndex, 'notes', sourceNoteIndex]);
  const stateWithoutSourceNote = state.deleteIn([sourceLaneIndex, 'notes', sourceNoteIndex]);

  return stateWithoutSourceNote.updateIn([laneIndexToDrop, 'notes'], function(notes) {
    return notes.splice(0, 0, sourceNote);
  });
}

function findIndexesForActivity( state, activityId ) {
  for ( let laneIndex = 0; laneIndex < state.size; laneIndex++ ) {
    for ( let noteIndex = 0; noteIndex < state.getIn([laneIndex, 'notes']).size; noteIndex++ ) {
      for ( let activityIndex = 0; activityIndex < state.getIn([laneIndex, 'notes', noteIndex, 'activities']).size; activityIndex++ ) {
        if ( state.getIn([laneIndex, 'notes', noteIndex, 'activities', activityIndex, 'id']) === activityId ) {
          return { laneIndex, noteIndex, activityIndex }
        }
      }
    }
  }

  return { laneIndex: -1, noteIndex: -1, activityIndex: -1 }
}

function updateActivity(state, { activityId, isEditing }) {
  const { laneIndex, noteIndex, activityIndex } = findIndexesForActivity(state, activityId)
}
