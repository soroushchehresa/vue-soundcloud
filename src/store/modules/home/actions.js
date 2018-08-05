import API from '@/utils/xhrWrapper';

export default {
  getTracks: (context) => {
    context.commit('GET_TRACKS');
    API.get({
      url: 'tracks',
      query: {
        linked_partitioning: 1,
        limit: 50,
        offset: 0,
        tags: 'house',
      },
    })
      .then((response) => {
        context.commit('GET_TRACKS_SUCCESS', response.collection);
      })
      .catch((error) => {
        context.commit('GET_TRACKS_FAIL', error);
      });
  },
};
