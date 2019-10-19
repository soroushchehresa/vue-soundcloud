export default {
  PLAY(state) {
    state.isPlay = true;
  },
  PAUSE(state) {
    state.isPlay = false;
  },
  SET_PLAYER_CURRENT_TIME(state, time) {
    state.playerCurrentTime = time;
  },
  SET_PLAYER_DURATION(state, time) {
    state.playerDuration = time;
  },
  SET_PLAYER_TRACKS(state, tracks) {
    state.playerTracks = tracks;
  },
  SET_PLAYER_CURRENT_TRACK(state, track) {
    state.playerCurrentTrack = track;
  },
  SET_PLAYER_SEEKING(state, seeking) {
    state.playerSeeking = seeking;
  },
};
