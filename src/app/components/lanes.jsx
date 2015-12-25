import React from 'react';
import reactor from '../libs/reactor'
import getters from './../getters'
import Lane from './lane.jsx';
import noteActions from '../actions/NoteActions';

const Lanes = React.createClass({

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
      <div className="row">
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
