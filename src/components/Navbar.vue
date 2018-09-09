<template>
  <el-row>
    <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="16" class="wrapper">
      <el-menu
        mode="horizontal"
        background-color="#3a3f41"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <img src="../assets/logo.png" class="logo" />
        <el-input
          size="small"
          placeholder="search music..."
          prefix-icon="el-icon-search"
          class="searchInput"
        />
      </el-menu>
    </el-col>
    <div class="genresMenu">
      <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="16" class="genresWrapper">
        <el-button-group size="small">
          <el-button
            v-for="(genre, i) in genres"
            :key="i"
            @click="getItems(genre)"
            v-bind:class="{active: activeGenre === genre, preActive: getTracksLoading === genre}"
          >
            {{genre}}
          </el-button>
        </el-button-group>
      </el-col>
    </div>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      genres: [
        'house',
        'chill',
        'deep',
        'dubstep',
        'classical',
        'electronic',
        'trance',
        'pop',
        'rock',
      ],
    };
  },
  computed: {
    ...mapGetters({
      activeGenre: 'activeGenre',
      getTracksLoading: 'getTracksLoading',
    }),
  },
  methods: {
    getItems(genre) {
      this.$store.dispatch('setActiveTeack', null);
      this.$store.dispatch('clearTracks');
      this.$store.dispatch('getTracks', {
        genre,
        page: 1,
      });
    },
  },
};
</script>

<style scoped>
  .wrapper {
    margin: 0 auto;
    float: none;
  }
  .el-row {
    background: #3a3f41;
    padding: 0;
  }
  .el-menu {
    border: none;
  }
  .logo {
    width: 170px;
    float: left;
    margin: 0 20px 0 0;
  }
  .searchInput {
    float: right;
    width: 280px;
    margin: 13px 0;
  }
  .searchInput .el-input__inner {
    background: #2b2b2b;
    border: none;
    outline: none;
    color: #fff;
  }
  .genresMenu {
    width: 100%;
    background: #fff;
  }
  .genresWrapper {
    margin: 0 auto;
    float: none;
    background: #fff;
    display: block;
  }
  .genresWrapper .el-button {
    padding: 15px 35px;
    border: none;
    border-radius: 0;
    background: #fff;
    color: #999;
    border-bottom: 3px solid #fff;
  }
  .genresWrapper .el-button.active {
    background: #f1f1f1;
    color: #444;
    border-bottom: 3px solid #43b883;
  }
  .genresWrapper .el-button.preActive {
    background: #f1f1f1;
    color: #444;
    border-bottom: 3px solid #f1f1f1;
  }
  .genresWrapper .el-button:hover {
    background: #f1f1f1;
    color: #444;
    border-bottom: 3px solid #f1f1f1;
  }
  .el-button > span {
    font-size: 16px;
  }
</style>
