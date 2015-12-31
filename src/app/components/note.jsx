import React from 'react';
import ReactDOM from 'react-dom'
import _ from 'lodash';
import { Panel, Input, Button } from 'react-bootstrap';
import NoteEdit from './note-edit'
import noteActions from '../actions/NoteActions'
import {DragSource, DropTarget} from 'react-dnd'
import ItemTypes from '../constants/item-types'
import Icon from './icon'
import Radium, {Style} from 'radium'

const noteSource = {
  beginDrag(props) {
    return {
      noteId: props.noteId,
    };
  },

  isDragging(props, monitor) {
    return props.noteId === monitor.getItem().noteId;
  },
}

const noteTarget = {
  hover(targetProps, monitor, component) {
    const sourceProps = monitor.getItem();

    const targetNoteId = targetProps.noteId;
    const sourceNoteId = sourceProps.noteId;

    if( targetNoteId !== sourceNoteId ) {
      const hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const isAbove = clientOffset.y - hoverBoundingRect.top < hoverBoundingRect.bottom - clientOffset.y

      noteActions.moveAround({
        targetNoteId,
        sourceNoteId,
        isAbove,
      })
    }
  },
}

const styles = {
  panel: {
    marginBottom: '0px',
    cursor: 'pointer',
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  noteDisplay: {
    display: 'inline-block',
    width: '100%',
  },
}

const Note = React.createClass({
  renderEdit() {
    const {...others } = this.props;
    return (
      <NoteEdit {...others} />
    );
  },

  renderTask() {
    const { noteId, task } = this.props
    return (
      <Panel
        className="noteContainer"
        style={styles.panel}
        >
        <Style
          scopeSelector='.noteContainer'
          rules={{
            '.noteAction': {
              display: 'none',
            },
            ':hover .noteAction': {
              display: 'block',
            },
          }
        } />
        <span
          style={styles.noteDisplay}
          onClick={noteActions.editNote.bind(null, {noteId})}
          >
          {task}
        </span>
        <Icon
          iconName='pencil'
          className='noteAction'
          onClick={noteActions.editNote.bind(null, {noteId})}
          style={{right: '35px'}}
          />
        <Icon
          iconName='trash-o'
          className='noteAction'
          onClick={noteActions.deleteNote.bind(null, {noteId})}
          style={{right: '10px'}}
          />
      </Panel>
    );
  },

  render() {
    const { connectDragSource, connectDropTarget, isDragging, status } = this.props;

    const opacity = isDragging? 0 : 1;

    return connectDragSource(connectDropTarget(
      <div style={{opacity: opacity, padding: '5px 0'}}>
        { (status === 'new' || status === 'editing') ? this.renderEdit() : this.renderTask() }
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
