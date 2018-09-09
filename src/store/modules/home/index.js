import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const defaultState = {
  getTracksLoading: null,
  tracks: [],
  getTracksFail: false,
  activeGenre: null,
  lastPage: null,
  activeTrack: null,
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
