import { Store, toImmutable } from 'nuclear-js'
import uuid from 'node-uuid';

export default Store({
  getInitialState() {
    return toImmutable({});
  },

  initialize() {
    this.on('RECEIVE_NOTES', receiveNotes);
    this.on('ADD_NOTE', addNote);
    this.on('UPDATE_NOTE', updateNote);
    this.on('DELETE_NOTE', deleteNote);
  },
})

function receiveNotes(state, { notes }) {
  return toImmutable(notes);
}

function addNote(state, { task }) {

}

function deleteNote(state, { id }) {

}

function updateNote(state, { id, task }) {
  
}

function findNoteIndex({ id }) {

  return noteIndex;
}

//
// class NoteStore {
//   constructor() {
//     this.bindActions(NoteActions);
//
//     this.notes = [];
//   }
//
//   create(note) {
//     const notes = this.notes;
//     note.id = uuid.v4();
//
//     this.setState({
//       notes: notes.concat(note),
//     });
//   }
//
//   update({id, task}) {
//     let notes = this.notes;
//     const index = this.findNote(id);
//
//     notes[index]['task'] = task;
//     this.setState({notes});
//   }
//
//   delete(id) {
//     const notes = this.notes;
//     const index = this.findNote(id);
//
//     if( noteIndex < 0 ) {
//       return ;
//     }
//
//     this.setState({
//       notes: notes.slice(0, noteIndex).concat(notes.slice(noteIndex + 1))
//     });
//   }
//
//   findNote(id) {
//     const notes = this.notes;
//     const noteIndex = notes.findIndex(
//       (n) => n.id === noteId
//     );
//
//     if( noteIndex < 0 ) {
//       console.warn('Failed to find note', notes, id);
//     }
//
//     return noteIndex;
//   }
// }
