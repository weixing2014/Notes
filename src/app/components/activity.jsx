import React from 'react';
import ReactDOM from 'react-dom'
import activityActions from '../actions/ActivityActions'
import modalActions from '../actions/ModalActions'
import { Panel, Input, Button, ButtonToolbar } from 'react-bootstrap';
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

  handleEdit(e) {
    const { dataKey } = this.props
    activityActions.toggleEditingStatus({
      id: dataKey,
      isEditing: true,
    })
  },

  handleDelete(e) {
    const { dataKey } = this.props
    modalActions.displayModal({
      title: "Delete Activity?",
      body: "",
      kind: 'delete',
      handleSubmit: activityActions.deleteActivity.bind(null, { id: dataKey }),
    })
  },

  render() {
    const { author, content, updated_at } = this.props;

    return (
      <div style={[styles.activityContainer]} className="activityContainer">
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
})

export default Radium(Activity);
