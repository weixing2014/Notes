import reactor from '../libs/reactor'
import localforage from 'localforage'

export default {
  persist() {
    localforage.setItem(
      'kanbanState',
      {
        lanes: reactor.evaluate(['lanes']).toJS(),
      }
    )
  },

  fetchAppState() {
    localforage.getItem(
      'kanbanState',
      function(err, appState) {
        reactor.dispatch(
          'RECEIVE_APP_STATE',
          { appState }
        );
      }
    );
  },
}
