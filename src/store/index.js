import Vue from 'vue';
import Vuex from 'vuex';
import home from './modules/home';
import user from './modules/user';
import navbar from './modules/navbar';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home,
    user,
    navbar,
  },
});
