import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const defaultState = {
  getTracksLoading: false,
  tracks: null,
  getTracksFail: false,
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
