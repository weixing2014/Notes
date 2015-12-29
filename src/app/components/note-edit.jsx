import React from 'react';
import ReactDOM from 'react-dom';
import reactor from '../libs/reactor';
import getters from './../getters';
import noteActions from '../actions/NoteActions'
import { Panel, Input, Button, ListGroup, ListGroupItem, Label } from 'react-bootstrap';

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
      <Panel>
        <Input
          type="text"
          ref="textField"
          placeholder="Say something…"
          buttonAfter={
            <Button className="btn-info" onClick={this.postNote}>
              <i className="fa fa-check"/>
            </Button>
          }
          defaultValue={task}
          />
        <label>Description</label>
        <Panel>
          <Input
            style={{marginBottom:"5px"}}
            type="textarea"
            placeholder="textarea"
            standalone
            />
          <div className="pull-right">
            <Button bsSize="small" bsStyle="link">Cancel</Button>
            <Button bsSize="small" bsStyle="info">Done</Button>
          </div>
        </Panel>
        <label>Activity</label>
        <Panel style={{marginBottom: '5px'}}>Item 1Item 1Item 1Item 1Item 1Item 1Item 1Item 1Item 1Item 1Item 1Item 1Item 1Item 1Item 1Item 1</Panel>
        <Panel style={{marginBottom: '5px'}}>Item 2</Panel>
        <Panel>
          <Input
            style={{marginBottom:"5px"}}
            type="textarea"
            ref="textField"
            placeholder="New Activity"
            defaultValue={""}
            standalone
          />
          <div className="pull-right">
            <Button bsSize="small" bsStyle="link">Cancel</Button>
            <Button bsSize="small" bsStyle="info">Done</Button>
          </div>
        </Panel>
      </Panel>
    );
  },
})

export default NoteEdit;
