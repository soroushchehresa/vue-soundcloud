import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const defaultState = {
  getUserProfileLoading: false,
  userProfileData: null,
  getUserProfileFail: null,
  getUserFollowingsLoading: false,
  userFollowingsData: null,
  getUserFollowingsFail: null,
  getUserTracksLoading: false,
  userTracksData: null,
  getUserTracksFail: null,
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
