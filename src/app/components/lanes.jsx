import React from 'react';
import reactor from '../libs/reactor'
import getters from './../getters'
import Lane from './lane.jsx';

const Lanes = React.createClass({

  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
      lanes: getters.lanes,
    }
  },

  render() {
    return (
      <div>
        {
          this.state.lanes.map(
            lane => (
              <Lane
                dataKey={ lane.get('id') }
                name={ lane.get('name') }
                />
            )
          )
        }
      </div>
    )
  },

});

export default Lanes;
