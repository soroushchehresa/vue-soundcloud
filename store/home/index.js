import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state = () => ({
  getTracksLoading: null,
  tracks: [],
  getTracksFail: null,
  activeGenre: 'house',
  lastPage: 1,
});

export default {
  state,
  getters,
  actions,
  mutations,
};
