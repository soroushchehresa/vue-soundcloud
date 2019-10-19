export default {
  SEARCH_TRACKS(state) {
    state.searchTracksLoading = true;
  },
  SEARCH_TRACKS_SUCCESS(state, data) {
    state.searchTracksLoading = false;
    state.searchResults = data.page > 1 ?
      [...state.searchResults, ...data.searchResults] :
      data.searchResults;
    state.lastSearchPage = data.page;
    state.searchQuery = data.query;
  },
  SEARCH_TRACKS_FAIL(state, data) {
    state.searchTracksLoading = false;
    state.searchTracksFail = data;
  },
  CLEAR_SEARCH(state) {
    state.searchTracksLoading = false;
    state.searchTracksFail = null;
    state.searchResults = [];
    state.searchQuery = null;
    state.lastSearchPage = null;
  },
};
