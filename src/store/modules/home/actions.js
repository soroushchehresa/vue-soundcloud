import API from '@/utils/xhrWrapper';

export default {
  getTracks: (context, genre) => {
    context.commit('GET_TRACKS', genre);
    API.get({
      url: 'tracks',
      query: {
        linked_partitioning: 1,
        limit: 50,
        offset: 0,
        tags: genre,
      },
    })
      .then((response) => {
        context.commit('GET_TRACKS_SUCCESS', { tracks: response.collection, genre });
      })
      .catch((error) => {
        context.commit('GET_TRACKS_FAIL', error);
      });
  },
};
