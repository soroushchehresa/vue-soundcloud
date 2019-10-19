import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const defaultState = () => ({
  searchTracksLoading: false,
  searchResults: [],
  searchTracksFail: null,
  lastSearchPage: null,
  searchQuery: null,
});

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
