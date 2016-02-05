import { Store, toImmutable } from 'nuclear-js'
import uuid from 'node-uuid';
import moment from 'moment'

export default Store({
  getInitialState() {
    return toImmutable([]);
  },

  initialize() {
    this.on('RECEIVE_APP_STATE', receiveAppState)
    
    this.on('ADD_LANE', addLane)
    this.on('DELETE_LANE', deleteLane)

    this.on('ADD_NOTE', addNote)
    this.on('UPDATE_NOTE', updateNote)
    this.on('DELETE_NOTE', deleteNote)

    this.on('MOVE_NOTE', moveNote)
    this.on('ATTACH_TO_LANE', attachToLane)

    this.on('UPDATE_LANE', updateLane)
    this.on('MOVE_LANE', moveLane)

    this.on('UPDATE_ACTIVITY', updateActivity)
    this.on('APPEND_EDITING_ACTIVITY', appendEditingActivity)
    this.on('DELETE_ACTIVITY', deleteActivity)
    this.on('POST_ALL_EDITING_ACTIVITIES', postAllEditingActivities)
  },
})

function receiveAppState(state, { appState }) {
  return toImmutable(appState.lanes);
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
         title: '',
         status: 'new',
         description: '',
         activities: [
           {
             id: uuid.v4(),
             author: 'Xing.Wei',
             updated_at: moment().format('DD MMM, h:mma'),
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

function updateNote(state, { noteId, title, status, description }) {
  const { laneIndex, noteIndex } = findLaneAndNoteIndex(state, { noteId });

  return state.updateIn(
    [laneIndex, 'notes', noteIndex],
    function(note) {
      let newNote = note;
      if (title) newNote = newNote.set('title', title);
      if (status) newNote = newNote.set('status', status);
      if (description) newNote = newNote.set('description', description);
      return newNote;
    }
  );
}

function findLaneAndNoteIndex(state, { noteId }) {

  const laneIndex = findLaneIndex(state, { noteId });

  if (laneIndex === -1) {
    return false;
  } // Todo: Just a band aid for removing the last lane. Something must be wrong here.

  const noteIndex = state.getIn([laneIndex, 'notes']).findIndex((n) => n.get('id') === noteId);

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

function updateActivity(state, { id, content, isEditing }) {
  const { laneIndex, noteIndex, activityIndex } = findIndexesForActivity(state, id)
  let newState = state;

  if (activityIndex === -1) return state;
  if (typeof content === 'string') { newState = newState.setIn([laneIndex, 'notes', noteIndex, 'activities', activityIndex, 'content'], content) }
  if (isEditing === true || isEditing === false) { newState = newState.setIn([laneIndex, 'notes', noteIndex, 'activities', activityIndex, 'isEditing'], isEditing) }

  return newState;
}

function postAllEditingActivities(state, { noteId }) {
  const { laneIndex, noteIndex } = findLaneAndNoteIndex(state, { noteId: noteId })
  const size = state.getIn([laneIndex, 'notes', noteIndex, 'activities']).size

  let newState = state

  for (let i = 0; i < size - 1; i++) {
    newState = newState.setIn([laneIndex, 'notes', noteIndex, 'activities', i, 'isEditing'], false)
  }

  return newState
}

function appendEditingActivity(state, { noteId }) {
  let { laneIndex, noteIndex } = findLaneAndNoteIndex(state, { noteId: noteId })

  if (!state.getIn([laneIndex, 'notes', noteIndex, 'activities'])) {
    return state
  }

  if (state.getIn([laneIndex, 'notes', noteIndex, 'activities']).last() && state.getIn([laneIndex, 'notes', noteIndex, 'activities']).last().get('isEditing')) {
    return state
  }

  return state.updateIn([laneIndex, 'notes', noteIndex, 'activities'], function (activities) {
    return activities.push(
      toImmutable(
        {
          id: uuid.v4(),
          author: 'Xing.Wei',
          updated_at: moment().format('DD MMM, h:mma'),
          content: '',
          isEditing: true,
        }
      )
    )
  })
}

function deleteActivity(state, { id }) {
  const { laneIndex, noteIndex, activityIndex } = findIndexesForActivity(state, id)
  return state.deleteIn([laneIndex, 'notes', noteIndex, 'activities', activityIndex])
}

function moveLane(state, { sourceLaneId, targetLaneId }) {
  console.log( sourceLaneId, targetLaneId)
  if ( sourceLaneId !== targetLaneId ) {
    console.log('hh')
    const sourceLaneIndex = findLaneIndex(state, { laneId: sourceLaneId })
    const targetLaneIndex = findLaneIndex(state, { laneId: targetLaneId })

    const sourceLane = state.get(sourceLaneIndex)
    const stateWithoutSourceLane = state.delete(sourceLaneIndex)

    return stateWithoutSourceLane.splice(targetLaneIndex, 0, sourceLane);
  }

  return state
}
