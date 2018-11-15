import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const defaultState = {
  getTrackLoading: false,
  trackData: null,
  getTrackFail: null,
  getTrackCommentsLoading: false,
  trackCommentsData: null,
  getTrackCommentsFail: null,
};

export default {
  state: defaultState,
  getters,
  actions,
  mutations,
};
