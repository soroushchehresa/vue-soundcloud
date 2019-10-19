export default {
  play(context) {
    context.commit('PLAY');
  },
  pause(context) {
    context.commit('PAUSE');
  },
  setPlayerCurrentTime(context, time) {
    context.commit('SET_PLAYER_CURRENT_TIME', time);
  },
  setPlayerDuration(context, time) {
    context.commit('SET_PLAYER_DURATION', time);
  },
  setPlayerTracks(context, tracks) {
    context.commit('SET_PLAYER_TRACKS', tracks);
  },
  setPlayerCurrentTrack(context, track) {
    context.commit('SET_PLAYER_CURRENT_TRACK', track);
  },
  setPlayerSeeking(context, track) {
    context.commit('SET_PLAYER_SEEKING', track);
  },
};
