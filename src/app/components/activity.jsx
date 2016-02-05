import React from 'react';
import ReactDOM from 'react-dom'
import activityActions from '../actions/ActivityActions'
import modalActions from '../actions/ModalActions'
import { Panel, Input, Button, ButtonToolbar } from 'react-bootstrap'
import Radium, { Style } from 'radium'
import Icon from './icon'

const styles = {
  container: {
    ':hover': {
      cursor: 'pointer',
    },
  },
  updateAt: {
    'fontSize': '0.8em',
    'marginTop': '0.2em',
    'color': '#777',
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
            <span className="pull-right activityUpdatedAt" style={[styles.updateAt]}>{updated_at}</span>
            <span className="pull-right activityButtonGroup">
              <Icon onClick={ this.handleEdit } className="pencil"/>
              <Icon onClick={ this.handleDelete} className="trash-o"/>
            </span>
          </header>
          <div>{content}</div>
        </Panel>
      </div>
    );
  },
})

export default Radium(Activity);
