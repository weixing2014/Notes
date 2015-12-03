import React from 'react';
import ReactDOM from 'react-dom'
import _ from 'lodash';
import ListItem from 'material-ui/lib/lists/list-item';
import TextField from 'material-ui/lib/text-field';
import NoteTextField from './note-text-field'
import Colors from 'material-ui/lib/styles/colors'
import noteActions from '../actions/NoteActions'
import {DragSource, DropTarget} from 'react-dnd'
import ItemTypes from '../constants/item-types'
import Paper from 'material-ui/lib/paper';

const noteSource = {
  beginDrag(props) {
    return {
      noteId: props.noteId,
    };
  },
}

const noteTarget = {
  hover(targetProps, monitor, component) {
    const sourceProps = monitor.getItem();

    const targetNoteId = targetProps.noteId;
    const sourceNoteId = sourceProps.noteId;

    const hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const isAbove = clientOffset.y - hoverBoundingRect.top > hoverBoundingRect.bottom - clientOffset.y

    noteActions.moveAround({
      targetNoteId,
      sourceNoteId,
      isAbove,
    })
  },
}

const Note = React.createClass({
  renderEdit() {
    const { noteId, task } = this.props;
    return (
      <Paper zDepth={1} style={{margin: '10px', padding: '10px'}}>
        <NoteTextField
          noteId={ noteId }
          task={ task }
          />
      </Paper>
    );
  },

  renderTask() {
    const { noteId, task } = this.props
    return (
      <Paper zDepth={1} style={{margin: '10px', padding: '10px'}}>
        <div onClick={noteActions.editNote.bind(null, {noteId})}>
          {task}
        </div>
      </Paper>
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
