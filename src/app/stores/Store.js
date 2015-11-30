import { Store, toImmutable } from 'nuclear-js'
import uuid from 'node-uuid';

export default Store({
  getInitialState() {
    return toImmutable([]);
  },

  initialize() {
    this.on('ADD_LANE', addLane);
    this.on('DELETE_LANE', deleteLane);

    this.on('ADD_NOTE', addNote);
    this.on('UPDATE_NOTE', updateNote);
    this.on('DELETE_NOTE', deleteNote);
    this.on('TOGGLE_NOTE_EDITING', toggleNoteEditing);
  },
})

function deleteLane(state, { laneId }) {
}

function findLaneIndex(state, { laneId }) {
  // return state.findIndex(
  //   (lane) => lane.get('id') === id
  // )
}

function addLane(state, { name }) {
  const laneName = name || "New Lane";
  const newLane = toImmutable({
    id: uuid.v4(),
    name: laneName,
    notes: [],
  })

  return state.splice(0, 0, newLane);
}

function deleteNote(state, { laneId, noteId }) {
  // const noteIndex = findNoteIndex(state, { id });
  // return state.delete(noteIndex);
}

function updateNote(state, { laneId, noteId, task }) {
  // const noteIndex = findNoteIndex(state, { id });
  // return state.update( noteIndex, (note) => note.set('task', task) );
}

function findNoteIndex(state, { laneId, noteId }) {
  // return state.findIndex(
  //   (note) => note.get('id') === id
  // )
}

function toggleNoteEditing(state, { laneId, noteId, isEditing }) {
  // const noteIndex = findNoteIndex(state, { id });
  // return state.update(noteIndex, ( note ) => note.set('isEditing', isEditing) );
}

function addNote( state, { laneId } ) {
  const noteId = uuid.v4();

  const newNote = toImmutable({
    id: noteId,
    task: '',
    isEditing: true,
  })

  return state.splice(0, 0, newNote);
}
