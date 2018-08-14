import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const defaultState = {
  getTracksLoading: null,
  tracks: null,
  getTracksFail: false,
  activeGenre: null,
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
