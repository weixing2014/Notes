import React from 'react';
import reactor from '../libs/reactor'
import getters from './../getters'
import Lanes from './lanes.jsx';
import noteActions from '../actions/NoteActions';

const LanesContainer = React.createClass({

  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
      lanes: getters.lanes,
    }
  },

  componentDidMount() {
    noteActions.persist();
  },

  componentDidUpdate() {
    noteActions.persist();
  },


  render() {
    return (
      <Lanes data={this.state.lanes} />
    )
  },

});

export default LanesContainer;
