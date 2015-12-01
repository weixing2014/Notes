import React from 'react';
import _ from 'lodash';
import ListItem from 'material-ui/lib/lists/list-item';
import TextField from 'material-ui/lib/text-field';
import NoteTextField from './note-text-field'
import Colors from 'material-ui/lib/styles/colors'
import noteActions from '../actions/NoteActions'
import {DragSource, DropTarget} from 'react-dnd'
import ItemTypes from '../constants/item-types'

const noteSource = {
  beginDrag(props) {
    console.log('Dragging...', props);

    return {
      laneId: props.laneId,
      noteId: props.noteId,
    };
  },
}

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();

    const targetLaneId = targetProps.laneId;
    const targetNoteId = targetProps.noteId;
    const sourceLaneId = sourceProps.laneId;
    const sourceNoteId = sourceProps.noteId;

    noteActions.moveAround({
      targetLaneId,
      targetNoteId,
      sourceLaneId,
      sourceNoteId,
    })
  },
}

const Note = React.createClass({
  renderEdit() {
    const { laneId, noteId, task } = this.props;
    return (
      <NoteTextField
        laneId={ laneId }
        noteId={ noteId }
        task={ task }
        />
    );
  },

  renderTask() {
    const { laneId, noteId, task } = this.props
    return (
      <div>
        <span noteId={ noteId } laneId={ laneId } onClick={ noteActions.editNote.bind(null, { laneId, noteId }) }>
          { task }
        </span>
        <span style={{ marginLeft: '5px', color: Colors.red500 }} className="fa fa-times" onClick={ noteActions.deleteNote.bind(null, { laneId, noteId }) }/>
      </div>
    );
  },

  render() {
    const { connectDragSource, connectDropTarget, isDragging, isEditing } = this.props;

    return connectDragSource(connectDropTarget(
      <div>
        { isEditing ? this.renderEdit() : this.renderTask() }
      </div>
    ));
  },
});

export default _.compose(
    DropTarget(
      ItemTypes.NOTE,
      noteTarget,
      (connect, monitor) => ({
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
      })
    ),
    DragSource(
      ItemTypes.NOTE,
      noteSource,
      (connect, monitor) => ({
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
      })
    )
  )(Note)
