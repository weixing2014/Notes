import React from 'react'
import reactor from '../libs/reactor'
import getters from './../getters'
import Lane from './lane.jsx'
import storageActions from '../actions/StorageActions'

const Lanes = React.createClass({

  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
      lanes: getters.lanes,
    }
  },

  componentDidMount() {
    storageActions.persist();
  },

  componentDidUpdate() {
    storageActions.persist();
  },

  render() {
    return (
      <div style={{ height: 'calc(100% - 60px)', overflowX: 'auto', overflowY: 'hidden', whiteSpace: 'nowrap' }}>
        {
          this.state.lanes.map(
            lane => (
              <Lane
                laneId={lane.get('id')}
                name={lane.get('name')}
                status={lane.get('status')}
                />
            )
          )
        }
      </div>
    )
  },

});

export default Lanes;
