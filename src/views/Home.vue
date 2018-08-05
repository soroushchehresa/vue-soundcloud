<template>
  <div>
    <h1>Home</h1>
    <button @click="getItems">GET</button>
    <h1 v-if="getTracksFail" style="color: red;">get tracks failed</h1>
    <h1 v-if="getTracksLoading">Loading...</h1>
    <h1 v-for="(track, i) in tracks" :key="i">{{track.title}}</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      getTracksLoading: 'getTracksLoading',
      tracks: 'tracks',
      getTracksFail: 'getTracksFail',
    }),
  },
  methods: {
    getItems() {
      this.$store.dispatch('getTracks');
    },
  },
};
</script>
<style>

</style>
