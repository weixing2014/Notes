import React from 'react';
import ReactDOM from 'react-dom'
import activityActions from '../actions/ActivityActions'
import { Panel, Input, Button, ButtonToolbar } from 'react-bootstrap';

const Activity = React.createClass({

  handleCancel(e) {
    const { content } = this.props;

    this.refs.activityContentInput.refs.input.value = content;
  },

  renderActivity() {
    const { author, content, updated_at } = this.props;

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

  renderActivityEdit() {
    const { author, content, updated_at, dataKey } = this.props;
    return (
      <Panel>
        <Input
          style={{marginBottom:"5px"}}
          type="textarea"
          ref="activityContentInput"
          placeholder="New Activity"
          defaultValue={content}
          standalone
          />
          <ButtonToolbar>
            <Button className="pull-right" bsSize="small" bsStyle="success" onClick={activityActions.postEditingActivity.bind(null, { activityId: dataKey })}>Done</Button>
            <Button className="pull-right" bsSize="small" bsStyle="link" onClick={this.handleCancel}>Cancel</Button>
          </ButtonToolbar>
      </Panel>
    )
  },

  render() {
    const { isEditing } = this.props;
    return isEditing ? this.renderActivityEdit() : this.renderActivity();
  },
})

export default Activity;
