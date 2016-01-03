import React from 'react';
import ReactDOM from 'react-dom'
import activityActions from '../actions/ActivityActions'
import { Panel, Input, Button, ButtonToolbar, Modal } from 'react-bootstrap';
import Radium, { Style } from 'radium'

const styles = {
  activityContainer: {
    ':hover': {
      cursor: 'pointer',
    },
  },
  activityIcon: {
    padding: '0 .3em',
  },
}

const Activity = React.createClass({

  handleCancel(e) {
    const { content } = this.props;

    this.refs.activityContentInput.refs.input.value = content;
  },

  handlePost(e) {
    const { dataKey } = this.props;
    activityActions.postEditingActivity({
      id: dataKey,
      content: this.refs.activityContentInput.refs.input.value,
    })
  },

  handleEdit(e) {
    const { dataKey } = this.props
    activityActions.editActivity({
      id: dataKey,
    })
  },

  handleDelete(e) {
    const { dataKey } = this.props
    activityActions.deleteActivity({
      id: dataKey,
    })
  },

  renderActivity() {
    const { author, content, updated_at } = this.props;

    return (
      <div style={[styles.activityContainer]} className="activityContainer">
        <div className="static-modal">
    <Modal show={true}>
     <Modal.Header closeButton>
       <Modal.Title>Modal title</Modal.Title>
     </Modal.Header>

     <Modal.Body>
       One fine body...
     </Modal.Body>

     <Modal.Footer>
       <Button>Close</Button>
       <Button bsStyle="primary">Save changes</Button>
     </Modal.Footer>

   </Modal>
 </div>
        <Style
          scopeSelector='.activityContainer'
          rules={{
            '.activityUpdatedAt': {
              display: 'block',
            },
            '.activityButtonGroup': {
              display: 'none',
            },
            ':hover .activityUpdatedAt': {
              display: 'none',
            },
            ':hover .activityButtonGroup': {
              display: 'inline',
            },
          }}
          />
        <Panel>
          <header className="clearfix" style={{marginBottom: '3px'}}>
            <label style={{marginBottom: '0'}}>@{author}</label>
            <span className="pull-right activityUpdatedAt" style={{fontSize: '0.8em', marginTop: '0.2em', color: '#777'}}>{updated_at}</span>
            <ul className="activityButtonGroup">
              <li onClick={ this.handleEdit } style={[ styles.activityIcon ]} className="pull-right fa fa-pencil activityEditIcon"></li>
              <li onClick={ this.handleDelete } style={[ styles.activityIcon ]} className="pull-right fa fa-trash-o activityDeleteIcon"></li>
            </ul>
          </header>
          {content}
        </Panel>
      </div>
    );
  },

  renderActivityEdit() {
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

  render() {
    const { isEditing } = this.props;
    return isEditing ? this.renderActivityEdit() : this.renderActivity();
  },
})

export default Radium(Activity);
