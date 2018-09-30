import Vue from 'vue';
import Vuex from 'vuex';
import home from './modules/home';
import navbar from './modules/navbar';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home,
    navbar,
    user,
  },
});
