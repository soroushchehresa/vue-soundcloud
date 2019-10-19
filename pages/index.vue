<template>
  <div>
    <el-row :style="`padding-bottom: ${currentTrack ? '70px' : '0'}`">
      <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="16" class="itemsWrapper">
        <el-row :gutter="15">
          <track-item-grid
            v-for="(track, i) in (searchResults.length > 0 ? searchResults : [...(initialMode ? initialTracks : []), ...tracks])"
            :key="i"
            :trackData="track"
            :onClick="handleClickTrack"
          />
        </el-row>
      </el-col>
      <el-col :xl="24">
        <pulse-loader class="loading" :loading="getTracksLoading && !searchTracksLoading" color="#43b883" size="20px"></pulse-loader>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { mapGetters } from 'vuex';
import _ from 'lodash';
import TrackItemGrid from '~/components/TrackItemGrid';
import Player from '~/components/Player';
import API from '~/utils/xhrWrapper';

export default {
  async asyncData() {
    const tracks = await API({
      method: 'get',
      url: 'tracks',
      query: {
        linked_partitioning: 1,
        limit: 80,
        offset: 0,
        tags: 'house',
      },
    });
    return { initialTracks: tracks.collection };
  },
  data() {
    return {
      page: 1,
      currentTrack: null,
      initialMode: true,
      initialTracks: [],
    };
  },
  mounted() {
    window.addEventListener('scroll', this.scroll);
  },
  watch: {
    tracks(nextTracks, prevTracks) {
      if (nextTracks.length > 0 && !_.isEqual(nextTracks, prevTracks)) {
        this.$store.dispatch('player/setPlayerTracks', nextTracks);
      }
    },
    searchResults(nextSearchResults, prevSearchResults) {
      if (nextSearchResults.length > 0 && !_.isEqual(nextSearchResults, prevSearchResults)) {
        this.$store.dispatch('player/setPlayerTracks', nextSearchResults);
      } else if (prevSearchResults.length > 0 && nextSearchResults.length === 0) {
        this.$store.dispatch('player/setPlayerTracks', this.tracks);
      }
    },
    activeGenre(nextActiveGenre, prevActiveGenre) {
      if (this.initialMode && prevActiveGenre && (nextActiveGenre !== prevActiveGenre)) {
        this.initialMode = false;
      }
    },
  },
  destroyed() {
    window.removeEventListener('scroll', this.scroll);
  },
  components: {
    TrackItemGrid,
    Player,
    PulseLoader,
  },
  computed: {
    ...mapGetters({
      getTracksLoading: 'home/getTracksLoading',
      tracks: 'home/tracks',
      activeGenre: 'home/activeGenre',
      lastPage: 'home/lastPage',
      searchTracksLoading: 'navbar/searchTracksLoading',
      searchResults: 'navbar/searchResults',
      searchQuery: 'navbar/searchQuery',
      lastSearchPage: 'navbar/lastSearchPage',
      playerCurrentTrack: 'player/playerCurrentTrack',
    }),
  },
  methods: {
    scroll() {
      const page = this.lastPage ? this.lastPage + 1 : this.page += 1;
      const bottomOfWindow = (document.documentElement.scrollTop + window.innerHeight) > (document.documentElement.offsetHeight - 100);
      if (bottomOfWindow && !this.getTracksLoading) {
        if (this.searchQuery) {
          this.$store.dispatch('navbar/search', {
            query: this.searchQuery,
            page: this.lastSearchPage + 1,
          });
        } else {
          this.$store.dispatch('home/getTracks', {
            genre: this.activeGenre ? this.activeGenre : 'house',
            page,
          });
        }
      }
    },
    handleClickTrack(trackData) {
      if (this.playerCurrentTrack && this.playerCurrentTrack.id === trackData.id) {
        this.$store.dispatch('player/pause');
        this.$store.dispatch('player/setPlayerTracks', []);
        this.$store.dispatch('player/setPlayerCurrentTrack', null);
      } else {
        this.$store.dispatch('player/setPlayerTracks', [...this.initialTracks, ...this.tracks]);
        this.$store.dispatch('player/setPlayerCurrentTrack', trackData);
      }
    },
  },
};
</script>

<style scoped>
  .itemsWrapper {
    margin: 0 auto;
    float: none;
    padding-top: 50px;
    box-sizing: border-box;
  }
  .loading {
    margin: 50px 0;
  }
  @media (max-width: 1000px) {
    .itemsWrapper {
      padding-top: 100px;
    }
  }
</style>
