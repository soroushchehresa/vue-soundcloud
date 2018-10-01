<template>
  <div>
    <el-row>
      <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="16" class="itemsWrapper">
        <el-row :gutter="15" v-if="(searchResults.length < 1)">
          <song-item
            v-for="(track, i) in tracks"
            :key="i"
            :trackData="track"
            :onClickTrack="handleClickTrack"
          />
        </el-row>
        <el-row :gutter="15" v-if="searchResults.length > 0">
          <song-item
            v-for="(track, i) in searchResults"
            :key="i"
            :trackData="track"
            :onClickTrack="handleClickTrack"
          />
        </el-row>
      </el-col>
      <el-col :xl="24">
        <h1 v-if="getTracksLoading || searchTracksLoading">Loading...</h1>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SongItem from '../components/SongGridItem';

export default {
  data() {
    return {
      page: 1,
    };
  },
  mounted() {
    this.$store.dispatch('getTracks', { genre: 'house', page: 1 });
    window.addEventListener('scroll', this.scroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scroll);
  },
  components: {
    SongItem,
  },
  computed: {
    ...mapGetters({
      getTracksLoading: 'getTracksLoading',
      tracks: 'tracks',
      activeGenre: 'activeGenre',
      lastPage: 'lastPage',
      activeTrack: 'activeTrack',
      searchTracksLoading: 'searchTracksLoading',
      searchResults: 'searchResults',
      searchQuery: 'searchQuery',
      lastSearchPage: 'lastSearchPage',
    }),
  },
  methods: {
    scroll() {
      const page = this.lastPage ? this.lastPage + 1 : this.page += 1;
      const bottomOfWindow =
        document.documentElement.scrollTop +
        window.innerHeight ===
        document.documentElement.offsetHeight;
      if (bottomOfWindow && !this.getTracksLoading) {
        if (this.searchQuery) {
          this.$store.dispatch('search', {
            query: this.searchQuery,
            page: this.lastSearchPage + 1,
          });
        } else {
          this.$store.dispatch('getTracks', {
            genre: this.activeGenre ? this.activeGenre : 'house',
            page,
          });
        }
      }
    },
    handleClickTrack(trackData) {
      if (this.activeTrack && trackData.id === this.activeTrack.id) {
        this.$store.dispatch('setActiveTeack', null);
      } else {
        this.$store.dispatch('setActiveTeack', trackData);
      }
    },
  },
};
</script>

<style scoped>
  .itemsWrapper {
    margin: 0 auto;
    float: none;
  }
</style>
