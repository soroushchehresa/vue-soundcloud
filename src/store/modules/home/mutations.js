export default {
  GET_TRACKS: (state) => {
    state.getTracksLoading = true;
  },
  GET_TRACKS_SUCCESS: (state, data) => {
    state.getTracksLoading = false;
    state.tracks = data;
  },
  GET_TRACKS_FAIL: (state, data) => {
    state.getTracksLoading = false;
    state.getTracksFail = data;
  },
};
