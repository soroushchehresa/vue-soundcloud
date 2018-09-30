import API from '@/utils/xhrWrapper';

export default {
  getUserProfile: (context, id) => {
    context.commit('GET_USER_PROFILE');
    API.get({
      url: `users/${id}`,
      query: {},
    })
      .then((response) => {
        context.commit('GET_USER_PROFILE_SUCCESS', response);
      })
      .catch((error) => {
        context.commit('GET_USER_PROFILE_FAIL', error);
      });
  },
  getUserFollowings: (context, id) => {
    context.commit('GET_USER_FOLLOWINGS');
    API.get({
      url: `users/${id}/followings`,
      query: {},
    })
      .then((response) => {
        context.commit('GET_USER_FOLLOWINGS_SUCCESS', response.collection);
      })
      .catch((error) => {
        context.commit('GET_USER_FOLLOWINGS_FAIL', error);
      });
  },
};
