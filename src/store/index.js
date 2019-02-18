import Vue from 'vue';
import Vuex from 'vuex';
import navbar from './modules/navbar';
import home from './modules/home';
import user from './modules/user';
import track from './modules/track';
import player from './modules/player';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    navbar,
    home,
    user,
    track,
    player,
  },
});
