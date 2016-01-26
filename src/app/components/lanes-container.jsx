import React from 'react';
import reactor from '../libs/reactor'
import getters from './../getters'
import Lanes from './lanes.jsx';

const LanesContainer = React.createClass({

  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
      lanes: getters.lanes,
    }
  },

  render() {
    return (
      <Lanes data={this.state.lanes} />
    )
  },

});

export default LanesContainer;
