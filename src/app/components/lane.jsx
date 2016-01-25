import React from 'react'
import ReactDOM from 'react-dom'
import reactor from '../libs/reactor'
import getters from './../getters'
import _ from 'lodash'
import { Panel, Input, Button } from 'react-bootstrap'
import noteActions from '../actions/NoteActions'
import laneActions from '../actions/LaneActions'
import modalActions from '../actions/ModalActions'
import { DropTarget, DragSource } from 'react-dnd'
import ItemTypes from '../constants/item-types'
import Notes from './notes'
import Icon from './icon'

const noteAndLaneTarget = {
  hover(targetProps, monitor) {
    const sourceNoteId = monitor.getItem().noteId
    const sourceLaneId = monitor.getItem().laneId
    const targetLaneId = targetProps.laneId

    if (sourceNoteId) {
      reactor.batch(function(){
        noteActions.setTargetLaneToDrop({ laneId: targetLaneId });
        if (reactor.evaluate(getters.laneToDropIsEmpty)) {
          noteActions.attachToLane({
            noteId: sourceNoteId,
            laneId: targetLaneId,
          })
        }
      })
    } else if (sourceLaneId) {
      laneActions.moveLane({
        sourceLaneId,
        targetLaneId,
      })
    }
  },
}

const Lane = React.createClass({
  componentDidMount() {
    if (this.refs.txtFldLaneName) {
      ReactDOM.findDOMNode(this.refs.txtFldLaneName.refs.input).focus()
    }
  },

  componentDidUpdate() {
    if (this.refs.txtFldLaneName) {
      ReactDOM.findDOMNode(this.refs.txtFldLaneName.refs.input).focus()
    }
  },

  updateLaneName(e) {
    e.preventDefault();
    const { laneId, status } = this.props;
    const name = this.refs.txtFldLaneName.getValue()
    laneActions.updateLaneName({ laneId, status, name });
  },

  editLaneName() {
    const { laneId } = this.props;
    laneActions.editLaneName({ laneId });
  },

  selectText(e) {
    e.target.select();
  },

  onLaneInputKeyDown(e) {
    if (e.keyCode === 13) {
      this.updateLaneName(e);
    }
  },

  handleDelete(e) {
    const { laneId } = this.props
    modalActions.displayModal({
      title: "Delete Lane?",
      body: "",
      kind: 'delete',
      handleSubmit: laneActions.deleteLane.bind(null, { laneId }),
    })
  },

  renderEditingName() {
    const { name, status } = this.props;
    return (
      <Input
       type="text"
       defaultValue={name}
       placeholder="Give me a title :)"
       ref="txtFldLaneName"
       style={{borderColor:'#2077b2'}}
       buttonAfter={
         <Button
           className="btn-info"
           style={{backgroundColor:"#217dbb", borderColor: '#2077b2'}}
           onClick={this.updateLaneName}>
           <i className="fa fa-check"/>
         </Button>
       }
       onFocus={this.selectText}
       onKeyDown={this.onLaneInputKeyDown}
       onBlur={this.cancelUpdatingLaneName}
       standalone
      />
    );
  },

  renderName() {
    const { name, laneId } = this.props;

    return (
      <div style={{cursor: "move"}} className="lane-edit-container">
        <span className="pull-right">
          <Icon className="plus" onClick={noteActions.addNote.bind(null, { laneId })} />
          <Icon className="trash-o" onClick={this.handleDelete} />
        </span>
        <span onClick={this.editLaneName} style={{ fontSize: '16px', cursor: 'pointer' }}>{name}</span>
      </div>
    );
  },

  isNewOrEditing() {
    const { status } = this.props;
    return status === 'new' || status === 'editing';
  },

  render() {

    const { laneId, name, status, connectDropTarget, connectDragSource, connectDragPreview, isDragging } = this.props;

    const opacity = isDragging ? 0 : 1;

    const panelHeader = connectDragSource(
      <div style={{ position: 'relative', cursour: 'move' }}>
        { this.isNewOrEditing() ? this.renderEditingName() : this.renderName()}
      </div>
    );

    return connectDragPreview(
      connectDropTarget(
        <div style={{ height: '100%', width: '400px', display: 'inline-block', opacity: opacity }}>
          <Panel
            dataKey={laneId}
            header={panelHeader}
            style={{height: '100%'}}
            >
            <Notes laneId={laneId} />
          </Panel>
        </div>
      )
    );
  },
});

const laneSource = {
  beginDrag(props) {
    return {
      laneId: props.laneId,
    }
  },

  isDragging(props, monitor) {
    return props.laneId === monitor.getItem().laneId
  },
};

export default _.compose(
  DragSource(
    ItemTypes.LANE,
    laneSource,
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging(),
    })
  ),
  DropTarget(
    [ ItemTypes.LANE, ItemTypes.NOTE ],
    noteAndLaneTarget,
    (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
    })
  )
)(Lane)
