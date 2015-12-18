import React from 'react';
import ReactDOM from 'react-dom';
import reactor from '../libs/reactor'
import getters from './../getters'
import _ from 'lodash'
import Card from 'material-ui/lib/card/card';
import { Panel, Input, Button } from 'react-bootstrap';
import CardActions from 'material-ui/lib/card/card-actions';
import CardExpandable from 'material-ui/lib/card/card-expandable';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardText from 'material-ui/lib/card/card-text';
import CardTitle from 'material-ui/lib/card/card-title';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import noteActions from '../actions/NoteActions';
import laneActions from '../actions/LaneActions';
import Icon from './icon'
import { DropTarget } from 'react-dnd'
import ItemTypes from '../constants/item-types'
import Notes from './notes'

const noteTarget = {
  hover(targetProps, monitor) {
    const noteId = monitor.getItem().noteId;
    const laneId = targetProps.laneId;

    reactor.batch(function(){
      noteActions.setTargetLaneToDrop({ laneId: laneId });
      if (reactor.evaluate(getters.laneToDropIsEmpty)) {
        noteActions.attachToLane({
          noteId,
          laneId,
        })
      }
    })
  },
}

const styles = {
  icon: {
    position: 'absolute',
    cursor: 'pointer',
    color: '#9e9e9e',
    right: '0',
  },
  container: {
    width: '25%',
    display: 'inline-block',
    margin: '10px',
    verticalAlign: 'top',
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

  cancelUpdatingLaneName() {

  },

  selectText(e) {
    e.target.select();
  },

  onLaneInputKeyDown(e) {
    if (e.keyCode === 13) {
      this.updateLaneName(e);
    }
  },

  renderEditingName() {
    const { name, status } = this.props;
    return (
      <Input
       type="text"
       defaultValue={name}
       placeholder="Give me a title :)"
       ref="txtFldLaneName"
       buttonAfter={
         <Button onClick={this.updateLaneName}>
           <i className="fa fa-check" style={{color: '#9e9e9e'}}/>
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
      <div className="lane-edit-container">
        <span onClick={this.editLaneName} style={{fontSize: '16px'}}>{name}</span>
        <Icon
          iconName='plus'
          className='lane__edit-icon'
          tooltipContent='Add Note'
          style={
            _.extend(
              {},
              styles.icon,
              {right: '25px'}
            )
          }
          onClick={
            noteActions.addNote.bind(null, { laneId })
          }
        />
        <Icon
          iconName='trash-o'
          className='lane__delete-icon'
          tooltipContent='Delete Lane'
          style={
            _.extend(
              {},
              styles.icon,
            )
          }
          onClick={
            laneActions.deleteLane.bind(null, { laneId })
          }
        />
      </div>
    );
  },

  isNewOrEditing() {
    const { status } = this.props;
    return status === 'new' || status === 'editing';
  },

  render() {

    const { laneId, name, status, connectDropTarget } = this.props;

    const panelHeader = (
      <div style={{position: 'relative'}}>
        { this.isNewOrEditing() ? this.renderEditingName() : this.renderName()}
      </div>
    );

    return connectDropTarget(
      <div style={styles.container}>
        <Panel
          dataKey={laneId}
          header={panelHeader}
          >
          <Notes laneId={laneId} />
        </Panel>
      </div>
    );
  },
});

export default DropTarget(
  ItemTypes.NOTE,
  noteTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  })
)(Lane);
