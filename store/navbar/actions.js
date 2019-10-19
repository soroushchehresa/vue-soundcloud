import API from '~/utils/xhrWrapper';

export default {
  search(context, { page, query }) {
    context.commit('SEARCH_TRACKS');
    API({
      method: 'get',
      url: 'tracks',
      query: {
        linked_partitioning: page,
        limit: 40,
        offset: 40 * (page - 1),
        q: query,
      },
    })
      .then((response) => {
        context.commit('SEARCH_TRACKS_SUCCESS', {
          searchResults: response.collection,
          page,
          query,
        });
      })
      .catch((error) => {
        context.commit('SEARCH_TRACKS_FAIL', error);
      });
  },
  clearSearch(context) {
    context.commit('CLEAR_SEARCH');
  },
};
