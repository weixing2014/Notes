import reactor from '../libs/reactor';
import uuid from 'node-uuid';

export default {
  addLane() {
    reactor.dispatch('ADD_LANE', {});
  },

  deleteLane({ laneId }) {
    reactor.dispatch('DELETE_LANE', { laneId });
  },

  updateLaneName({ laneId, status, name }) {
    if ( status === 'new' ) {
      const status = 'done';
      reactor.batch(function() {
        reactor.dispatch('UPDATE_LANE', { laneId, name, status });
        reactor.dispatch('ADD_NOTE', { laneId });
      })
    } else if ( status === 'editing' ) {
      const status = 'edited';
      reactor.dispatch('UPDATE_LANE', { laneId, name, status });
    }
  },

  editLaneName({ laneId }) {
    const status = 'editing';
    reactor.dispatch('UPDATE_LANE', { laneId, status })
  },
}
