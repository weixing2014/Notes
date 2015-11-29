import reactor from '../libs/reactor';
import uuid from 'node-uuid';

export default {
  addLane() {
    reactor.dispatch(
      'ADD_LANE', { name }
    );
  },
}
