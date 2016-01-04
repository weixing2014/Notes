import React from 'react'
import ReactDOM from 'react-dom'
import reactor from '../libs/reactor'
import getters from './../getters'
import noteActions from '../actions/NoteActions'
import modalActions from '../actions/modalActions'
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

  updateNote() {
    const { laneId, noteId, status } = this.props;
    if (this.refs.titleInput.getValue()) {
      const note = {
        laneId: laneId,
        noteId: noteId,
        title: this.refs.titleInput.getValue(),
      }

      if ( status === 'new' ) {
        noteActions.postNewNote(note);
      } else if ( status === 'editing' ) {
        noteActions.postEditingNote(note);
      }
    } else {
      noteActions.deleteNote({
        noteId: noteId,
      })
    }
  },

  cancelPostingNote(event) {
    const { noteId, status } = this.props;

    if ( status === 'new' ) {
      noteActions.deleteNote({
        noteId: noteId,
      })
    } else if ( status === 'editing' ){
      noteActions.postEditingNote({
        noteId: noteId,
        status: 'edited',
      })
    }
  },

  postNote(event) {
    event.preventDefault();
    this.updateNote();
  },

  onLaneInputKeyDown(e) {
    if (e.keyCode === 13) {
      this.updateNote();
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

  renderActivity( activity ) {
    const { author, content, updated_at } = activity;

    return (
      <Panel>
        <header className="clearfix" style={{marginBottom: '3px'}}>
          <label style={{marginBottom: '0'}}>@{author}</label>
          <span className="pull-right" style={{fontSize: '0.8em', marginTop: '0.2em', color: '#777'}}>{updated_at}</span>
        </header>
        {content}
      </Panel>
    );
  },

  renderActivities() {
    const { activities } = this.props;

    return activities.map(
      function( activity ) {
        const { id, ...other} = activity
        return <Activity key={id} {...other} />
      }
    )
  },

  render() {
    const { title, status, description, activities, noteId } = this.props;
    return (
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
        <Activities label="Activity" list={ activities } />
      </Panel>
    );
  },
})

export default NoteEdit;
