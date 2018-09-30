import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const defaultState = {
  getUserProfileLoading: false,
  userProfileData: null,
  userProfileFail: null,
  getUserFollowingsLoading: false,
  userFollowingsData: null,
  userFollowingsFail: null,
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
