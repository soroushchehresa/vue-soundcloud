<template>
  <div>
    <el-row>
      <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="16" class="itemsWrapper">
        <el-row :gutter="15">
          <song-item v-for="(track, i) in tracks" :key="i" :trackData="track" />
        </el-row>
      </el-col>
      <el-col :xl="24">
        <h1 v-if="getTracksLoading">Loading...</h1>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SongItem from '../components/SongItem';

export default {
  data() {
    return {
      page: 1,
    };
  },
  mounted() {
    this.$store.dispatch('getTracks', { genre: 'house', page: 1 });
    this.scroll();
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
    }),
  },
  methods: {
    scroll() {
      const self = this;
      const nextPage = this.lastPage ? this.lastPage += 1 : this.page += 1;
      window.addEventListener('scroll', () => {
        const bottomOfWindow =
          document.documentElement.scrollTop +
          window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow && !self.getTracksLoading) {
          this.$store.dispatch('getTracks', {
            genre: self.activeGenre ? self.activeGenre : 'house',
            page: nextPage,
          });
        }
      });
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
