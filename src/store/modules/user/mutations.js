export default {
  GET_USER_PROFILE: (state) => {
    state.getUserProfileLoading = true;
  },
  GET_USER_PROFILE_SUCCESS: (state, data) => {
    state.getUserProfileLoading = false;
    state.userProfileData = data;
  },
  GET_USER_PROFILE_FAIL: (state, data) => {
    state.getUserProfileLoading = false;
    state.userProfileFail = data;
  },
  GET_USER_FOLLOWINGS: (state) => {
    state.getUserFollowingsLoading = true;
  },
  GET_USER_FOLLOWINGS_SUCCESS: (state, data) => {
    state.getUserFollowingsLoading = false;
    state.userFollowingsData = data;
  },
  GET_USER_FOLLOWINGS_FAIL: (state, data) => {
    state.getUserFollowingsLoading = false;
    state.userFollowingsFail = data;
  },
};
