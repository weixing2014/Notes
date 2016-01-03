import reactor from '../libs/reactor';
import uuid from 'node-uuid';

export default {
  postEditingActivity({ id, content }) {
    reactor.batch(function() {
      reactor.dispatch('UPDATE_ACTIVITY', { id: id, content: content, isEditing: false })
      reactor.dispatch('CREATE_ACTIVITY', { id })
    })
  },
}
