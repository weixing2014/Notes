import React from 'react';
import noteActions from '../actions/NoteActions'
import { Panel, Input, Button, ButtonToolbar } from 'react-bootstrap';

const Activity = React.createClass({

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
    const { author, content, updated_at } = this.props;
    return (
      <Panel>
        <Input
          style={{marginBottom:"5px"}}
          type="textarea"
          ref="textField"
          placeholder="New Activity"
          defaultValue={content}
          standalone
          />
          <ButtonToolbar>
            <Button className="pull-right" bsSize="small" bsStyle="success">Done</Button>
            <Button className="pull-right" bsSize="small" bsStyle="link">Cancel</Button>
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
