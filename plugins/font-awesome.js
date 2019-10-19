import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
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

Vue.config.productionTip = false;

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
