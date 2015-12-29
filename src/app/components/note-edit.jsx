import React from 'react';
import ReactDOM from 'react-dom';
import reactor from '../libs/reactor';
import getters from './../getters';
import noteActions from '../actions/NoteActions'
import { Panel, Input, Button, ListGroup, ListGroupItem, Label, ButtonToolbar } from 'react-bootstrap';

const NoteEdit = React.createClass({
  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
      lanes: getters.lanes,
    }
  },

  componentDidMount() {
    if (this.refs.textField) {
      ReactDOM.findDOMNode(this.refs.textField.refs.input).focus();
    }
  },

  updateNote() {
    const { laneId, noteId, status } = this.props;
    if (this.refs.textField.getValue()) {
      const note = {
        laneId: laneId,
        noteId: noteId,
        task: this.refs.textField.getValue(),
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

  render() {
    const { task, status } = this.props;
    return (
      <Panel style={{marginBottom:"5px"}}>
        <Input
          style={{marginBottom:"5px"}}
          type="text"
          ref="textField"
          placeholder="Say something…"
          defaultValue={task}
          standalone
          />
        <ButtonToolbar>
          <Button className="pull-right" bsSize="small" bsStyle="success">Save & Close</Button>
          <Button className="pull-right" bsSize="small" bsStyle="danger">Delete</Button>
        </ButtonToolbar>
        <label>Description</label>
        <Panel>
          <Input
            style={{marginBottom:"5px"}}
            type="textarea"
            placeholder="textarea"
            standalone
            />
          <ButtonToolbar>
            <Button className="pull-right" bsSize="small" bsStyle="success">Done</Button>
            <Button className="pull-right" bsSize="small" bsStyle="link">Cancel</Button>
          </ButtonToolbar>
        </Panel>
        <label>Activity</label>
        <Panel style={{marginBottom: '5px'}}>
          <header className="clearfix" style={{marginBottom: '3px'}}>
            <label style={{marginBottom: '0'}}>@Xing.Wei</label>
            <span className="pull-right" style={{fontSize: '0.8em', marginTop: '0.2em', color: '#777'}}>27 Dec, 11:12pm</span>
          </header>
          Item 1Item 1Item 1Item 1Item 1Item 1Item 1Item 1Item 1Item 1Item 1Item 1Item 1Item 1Item 1Item 1
        </Panel>
        <Panel style={{marginBottom: '5px'}}>Item 2</Panel>
        <Panel style={{marginBottom: '5px'}}>
          <Input
            style={{marginBottom:"5px"}}
            type="textarea"
            ref="textField"
            placeholder="New Activity"
            defaultValue={""}
            standalone
          />
          <ButtonToolbar>
            <Button className="pull-right" bsSize="small" bsStyle="success">Done</Button>
            <Button className="pull-right" bsSize="small" bsStyle="link">Cancel</Button>
          </ButtonToolbar>
        </Panel>
      </Panel>
    );
  },
})

export default NoteEdit;
