export default {
  GET_TRACKS(state, data) {
    state.getTracksLoading = data;
  },
  GET_TRACKS_SUCCESS(state, data) {
    state.getTracksLoading = false;
    state.tracks = [...state.tracks, ...data.tracks];
    state.activeGenre = data.genre;
    state.lastPage = data.page;
  },
  GET_TRACKS_FAIL(state, data) {
    state.getTracksLoading = false;
    state.getTracksFail = data;
  },
  CLEAR_TRACKS(state) {
    state.getTracksLoading = false;
    state.tracks = [];
  },
};
