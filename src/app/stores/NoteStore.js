import { Store, toImmutable } from 'nuclear-js'
import uuid from 'node-uuid';

export default Store({
  getInitialState() {
    return toImmutable([]);
  },

  initialize() {
    this.on('RECEIVE_NOTES', receiveNotes);
    this.on('ADD_NOTE', addNote);
    this.on('UPDATE_NOTE', updateNote);
    this.on('DELETE_NOTE', deleteNote);
    this.on('TOGGLE_NOTE_EDITING', toggleNoteEditing);
  },
})

function receiveNotes(state, { notes }) {
  return toImmutable(notes);
}

function deleteNote(state, { id }) {
  const noteIndex = findNoteIndex(state, { id });
  return state.delete(noteIndex);
}

function updateNote(state, { id, task }) {
  const noteIndex = findNoteIndex(state, { id });
  return state.update( noteIndex, (note) => note.set('task', task) );
}

function findNoteIndex(state, { id }) {
  return state.findIndex(
    (note) => note.get('id') === id
  )
}

function toggleNoteEditing(state, { id, isEditing }) {
  const noteIndex = findNoteIndex(state, { id });
  return state.update(noteIndex, ( note ) => note.set('isEditing', isEditing) );
}

function addNote(state) {
  const newNote = toImmutable({
    id: uuid.v4(),
    task: '',
    isEditing: true,
  })

  return state.splice(0, 0, newNote);
}
