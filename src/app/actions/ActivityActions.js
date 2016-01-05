import reactor from '../libs/reactor';
import uuid from 'node-uuid';

export default {
  postEditingActivity({ id, content }) {
    reactor.batch(function() {
      if (content) {
        reactor.dispatch('UPDATE_ACTIVITY', { id: id, content: content, isEditing: false })
      } else {
        reactor.dispatch('DELETE_ACTIVITY', { id: id })
      }
      reactor.dispatch('APPEND_EDITING_ACTIVITY', { id })
    })
  },

  deleteActivity({ id }) {
    reactor.dispatch('DELETE_ACTIVITY', { id: id })
  },

  toggleEditingStatus({ id, isEditing }) {
    reactor.dispatch('UPDATE_ACTIVITY', { id, isEditing })
  },
}
