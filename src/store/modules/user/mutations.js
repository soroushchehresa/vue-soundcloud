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
    state.getUserProfileFail = data;
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
    state.getUserFollowingsFail = data;
  },
  GET_USER_TRACKS: (state) => {
    state.getUserTracksLoading = true;
  },
  GET_USER_TRACKS_SUCCESS: (state, data) => {
    state.getUserTracksLoading = false;
    state.userTracksData = data;
  },
  GET_USER_TRACKS_FAIL: (state, data) => {
    state.getUserTracksLoading = false;
    state.getUserTracksFail = data;
  },
};

