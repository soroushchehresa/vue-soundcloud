export default {
  GET_TRACKS: (state, data) => {
    state.getTracksLoading = data;
  },
  GET_TRACKS_SUCCESS: (state, data) => {
    state.getTracksLoading = false;
    state.tracks = data.tracks;
    state.activeGenre = data.genre;
  },
  GET_TRACKS_FAIL: (state, data) => {
    state.getTracksLoading = false;
    state.getTracksFail = data;
  },
};
