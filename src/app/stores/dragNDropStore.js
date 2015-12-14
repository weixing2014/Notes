import { Store, toImmutable } from 'nuclear-js'

export default Store({
  getInitialState() {
    return toImmutable({
      targetLaneToDrop: null,
    });
  },

  initialize() {
    this.on('SET_TARGET_LANE_TO_DROP', setTargetLaneToDrop);
  },
})

function setTargetLaneToDrop(state, { laneId }) {
  return laneId;
}
