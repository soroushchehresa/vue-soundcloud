import API from '@/utils/xhrWrapper';

export default {
  getTrack: (context, id) => {
    context.commit('GET_TRACK');
    API.get({
      url: `tracks/${id}`,
      query: {},
    })
      .then((response) => {
        context.commit('GET_TRACK_SUCCESS', response);
      })
      .catch((error) => {
        context.commit('GET_TRACK_FAIL', error);
      });
  },
  getTrackComments: (context, id) => {
    context.commit('GET_TRACK_COMMENTS');
    API.get({
      url: `tracks/${id}/comments`,
      query: {},
    })
      .then((response) => {
        context.commit('GET_TRACK_COMMENTS_SUCCESS', response.sort((a, b) => a.timestamp - b.timestamp));
      })
      .catch((error) => {
        context.commit('GET_TRACK_COMMENTS_FAIL', error);
      });
  },
};
