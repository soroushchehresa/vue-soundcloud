import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home';
import User from '@/views/User';
import Track from '@/views/Track';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', component: Home },
    { path: '/users/:id', component: User },
    { path: '/tracks/:id', component: Track },
  ],
});
