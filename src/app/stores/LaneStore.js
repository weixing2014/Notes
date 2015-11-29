import { Store, toImmutable } from 'nuclear-js'
import uuid from 'node-uuid';

export default Store({
  getInitialState() {
    return toImmutable([]);
  },

  initialize() {
    this.on('ADD_LANE', addLane);
    this.on('RECEIVE_LANES', receiveLanes);
    this.on('DELETE_LANE', deleteLane);
  },
})

function receiveLanes(state, { lanes }) {
  return toImmutable(lanes);
}

function deleteLane(state, { id }) {

}

function findLaneIndex(state, { id }) {
}

function addLane(state, { name }) {
  const laneName = name || "New Lane";
  const newLane = toImmutable({
    id: uuid.v4(),
    name: laneName,
    notes: [],
  })
  
  return state.splice(0, 0, newLane);
}
