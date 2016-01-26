import React from 'react'
import reactor from '../libs/reactor'
import { Modal, Button } from 'react-bootstrap'
import modalActions from '../actions/ModalActions'
import storageActions from '../actions/StorageActions';
import getters from './../getters'
import Radium from 'radium'

const kinds = {
  'delete': {
    btnLabel: 'Delete',
    btnStyle: 'danger',
  },
}

const SingletonModal = React.createClass({

  mixins: [reactor.ReactMixin],
  
  getDataBindings() {
    return {
      modal: getters.modal,
    }
  },

  close() {
    modalActions.hideModal()
  },

  renderBody() {
    const { body } = this.state.modal.toJS()
    if (body) {
      return (
        <Modal.Body>
          {body}
        </Modal.Body>
      )
    }
  },

  handleClickOk() {
    const { handleSubmit } = this.state.modal.toJS()
    handleSubmit()
    modalActions.hideModal()
  },

  render() {
    const { visible, title, body, kind } = this.state.modal.toJS()

    return (
      <div className="modal">
        <Modal show={visible} onHide={modalActions.hideModal}>
         <Modal.Header closeButton>
           <Modal.Title>{title}</Modal.Title>
         </Modal.Header>
         { this.renderBody() }
         <Modal.Footer>
           <Button
             onClick={this.handleClickOk}
             bsStyle={(kinds[kind] || {btnStyle: 'primary'}).btnStyle}
             >
             { (kinds[kind] || {btnStyle: 'primary'}).btnLabel }
           </Button>
         </Modal.Footer>
       </Modal>
      </div>
    );
  },
});

export default Radium(SingletonModal);
