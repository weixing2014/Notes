import React from 'react'
import ReactDOM from 'react-dom'
import reactor from '../libs/reactor'
import getters from './../getters'
import noteActions from '../actions/NoteActions'
import modalActions from '../actions/ModalActions'
import activityActions from '../actions/ActivityActions'
import Activities from './activities'
import { Panel, Input, Button, ListGroup, ListGroupItem, Label, ButtonToolbar } from 'react-bootstrap';

const NoteEdit = React.createClass({
  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
      lanes: getters.lanes,
    }
  },

  componentDidMount() {
    if (this.refs.titleInput) {
      ReactDOM.findDOMNode(this.refs.titleInput.refs.input).focus();
    }
  },

  handleSave(e) {
    const { noteId } = this.props;

    if (this.refs.titleInput.refs.input.value) {
      noteActions.postNewNote({
        noteId: noteId,
        title: this.refs.titleInput.refs.input.value,
        description: this.refs.descriptionInput.refs.input.value,
      })
    } else {
      ReactDOM.findDOMNode(this.refs.titleInput.refs.input).focus();
    }
  },

  render() {
    const { title, status, description, activities, noteId } = this.props;
    return (
      <div style={{padding: '5px 0'}}>
        <Panel>
          <Input
            type="text"
            ref="titleInput"
            placeholder="Story title"
            defaultValue={ title }
            standalone
            />
          <ButtonToolbar style={{marginTop: '5px'}}>
            <Button className="pull-right" bsSize="small" bsStyle="success" onClick={ this.handleSave }>Save & Close</Button>
            <Button
              className="pull-right"
              bsSize="small"
              bsStyle="danger"
              onClick={
                modalActions.displayModal.bind(null, {
                  title: "Delete Story?",
                  body: '',
                  kind: 'delete',
                  handleSubmit: noteActions.deleteNote.bind(null, { noteId }),
                })
              }>
              Delete
            </Button>
          </ButtonToolbar>
          <Input
            label="Description"
            ref="descriptionInput"
            type="textarea"
            defaultValue={ description }
            />
          <Activities ref="activities" label="Activity" noteId={ noteId } list={ activities } />
        </Panel>
      </div>
    );
  },
})

export default NoteEdit;
