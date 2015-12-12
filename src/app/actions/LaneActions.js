import reactor from '../libs/reactor';
import uuid from 'node-uuid';

export default {
  addLane() {
    reactor.dispatch('ADD_LANE', {});
  },

 deleteLane({ laneId }) {
    reactor.dispatch('DELETE_LANE', { laneId });
  },

  updateLaneName({ laneId, name }) {
    reactor.dispatch('UPDATE_LANE_NAME', { laneId, name });
  },
}
