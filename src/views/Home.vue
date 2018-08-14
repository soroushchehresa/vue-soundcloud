<template>
  <div>
    <el-row :gutter="50" v-if="getTracksLoading">
      <el-col :span="24">
        <h1>Loading...</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :xs="24"
        :sm="22"
        :md="20"
        :lg="18"
        :xl="16"
        class="itemsWrapper"
      >
        <el-row :gutter="15">
          <song-item v-for="(track, i) in tracks" :key="i" :trackData="track" />
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SongItem from '../components/SongItem';

export default {
  mounted() {
    this.getItems('house');
  },
  components: {
    SongItem,
  },
  computed: {
    ...mapGetters({
      getTracksLoading: 'getTracksLoading',
      tracks: 'tracks',
      getTracksFail: 'getTracksFail',
    }),
  },
  methods: {
    getItems(genre) {
      this.$store.dispatch('getTracks', genre);
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
