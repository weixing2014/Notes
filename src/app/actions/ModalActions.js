import reactor from '../libs/reactor';
import uuid from 'node-uuid';

export default {
  displayModal({ title, body, handleSubmit, kind }) {
    const visible = true;
    reactor.batch(function() {
      reactor.dispatch('LOAD_MODAL', {
        visible,
        title,
        body,
        handleSubmit,
        kind,
      })
    })
  },

  hideModal() {
    reactor.dispatch('LOAD_MODAL', { visible: false })
  },
}
