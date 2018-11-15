export default {
  GET_TRACK: (state) => {
    state.getTrackLoading = true;
  },
  GET_TRACK_SUCCESS: (state, data) => {
    state.getTrackLoading = false;
    state.trackData = data;
  },
  GET_TRACK_FAIL: (state, data) => {
    state.getTrackLoading = false;
    state.getTrackFail = data;
  },
  GET_TRACK_COMMENTS: (state) => {
    state.getTrackCommentsLoading = true;
  },
  GET_TRACK_COMMENTS_SUCCESS: (state, data) => {
    state.getTrackCommentsLoading = false;
    state.trackCommentsData = data;
  },
  GET_TRACK_COMMENTS_FAIL: (state, data) => {
    state.getTrackCommentsLoading = false;
    state.getTrackCommentsFail = data;
  },
};
