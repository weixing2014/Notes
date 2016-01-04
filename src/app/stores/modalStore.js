import { Store, toImmutable } from 'nuclear-js'

export default Store({
  getInitialState() {
    return toImmutable({
      visible: false,
      title: null,
      body: null,
      handleCancel: null,
      handleSubmit: null,
      kind: null,
    });
  },

  initialize() {
    this.on('LOAD_MODAL', loadModal);
  },
})

function loadModal(state, { visible, title, body, handleSubmit, kind }) {
  return toImmutable({
    visible,
    title,
    body,
    handleSubmit,
    kind,
  });
}
