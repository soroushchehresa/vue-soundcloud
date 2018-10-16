// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import {
  Col,
  Row,
  Menu,
  Input,
  Container,
  Header,
  Main,
  Footer,
  ButtonGroup,
  Button,
  Loading,
  MessageBox,
  Notification,
  Message,
  Slider,
  Card,
} from 'element-ui';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHeart,
  faPlay,
  faComment,
  faUsers,
  faMapMarkerAlt,
  faGlobe,
  faPlayCircle,
  faStopCircle,
  faStop,
  faPause,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import store from './store';
import App from './App';
import router from './router';

library.add(
  faHeart,
  faPlay,
  faComment,
  faUsers,
  faMapMarkerAlt,
  faGlobe,
  faPlayCircle,
  faStopCircle,
  faPause,
  faStop,
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(Col);
Vue.use(Row);
Vue.use(Menu);
Vue.use(Input);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Footer);
Vue.use(ButtonGroup);
Vue.use(Button);
Vue.use(Slider);
Vue.use(Card);
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
