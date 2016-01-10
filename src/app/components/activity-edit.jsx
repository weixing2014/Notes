import React from 'react';
import ReactDOM from 'react-dom'
import activityActions from '../actions/ActivityActions'
import modalActions from '../actions/ModalActions'
import { Panel, Input, Button, ButtonToolbar } from 'react-bootstrap';
import Radium, { Style } from 'radium'

const ActivityEdit = React.createClass({
  componentWillUnmount() {
    const { dataKey, noteId } = this.props

    activityActions.postEditingActivity({
      id: dataKey,
      noteId: noteId,
      content: this.refs.activityContentInput.refs.input.value,
    })
  },

  handleCancel(e) {
    const { dataKey, content } = this.props

    this.refs.activityContentInput.refs.input.value = content
    if (content) {
      activityActions.toggleEditingStatus({
        id: dataKey,
        isEditing: false,
      })
    }
  },

  handlePost(e) {
    const { dataKey } = this.props;
    activityActions.toggleEditingStatus({
      id: dataKey,
      isEditing: false,
    })
  },

  render() {
    const { author, content, updated_at, dataKey } = this.props;
    return (
      <Panel>
        <header className="clearfix" style={{marginBottom: '3px'}}>
          <label style={{marginBottom: '0'}}>@{author}</label>
        </header>
        <Input
          style={{marginBottom:"5px"}}
          type="textarea"
          ref="activityContentInput"
          placeholder="New Activity"
          defaultValue={content}
          standalone
          />
          <ButtonToolbar>
            <Button className="pull-right" bsSize="small" bsStyle="success" onClick={this.handlePost}>Done</Button>
            <Button className="pull-right" bsSize="small" bsStyle="link" onClick={this.handleCancel}>Cancel</Button>
          </ButtonToolbar>
      </Panel>
    )
  },
})

export default Radium(ActivityEdit);
