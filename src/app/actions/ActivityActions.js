import reactor from '../libs/reactor';
import uuid from 'node-uuid';

export default {
  postEditingActivity({ id, content }) {
    reactor.batch(function() {
      reactor.dispatch('UPDATE_ACTIVITY', { id: id, content: content, isEditing: false })
      reactor.dispatch('APPEND_EDITING_ACTIVITY', { id })
    })
  },

  editActivity({ id }) {
    reactor.dispatch('UPDATE_ACTIVITY', { id: id, isEditing: true })
  },

  deleteActivity({ id }) {
    reactor.dispatch('DELETE_ACTIVITY', { id: id })
  },
}
