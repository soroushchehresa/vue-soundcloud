import API from '@/utils/xhrWrapper';

export default {
  getTracks: (context, { genre, page }) => {
    context.commit('GET_TRACKS', genre);
    API.get({
      url: 'tracks',
      query: {
        linked_partitioning: page,
        limit: 40,
        offset: 40 * (page - 1),
        tags: genre,
      },
    })
      .then((response) => {
        context.commit('GET_TRACKS_SUCCESS', { tracks: response.collection, genre, page });
      })
      .catch((error) => {
        context.commit('GET_TRACKS_FAIL', error);
      });
  },
  clearTracks: (context) => {
    context.commit('CLEAR_TRACKS');
  },
};
