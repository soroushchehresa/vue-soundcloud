<template>
  <div id="app">
    <el-container direction="vertical">
      <el-header>
        <navbar />
      </el-header>
      <el-main :style="`padding: ${!!playerCurrentTrack ? '20px 0 90px' : '0'}`">
        <nuxt />
        <Player />
      </el-main>
    </el-container>
    <a class="github" target="_blank" href="https://github.com/soroushchehresa/vue-soundcloud">
      <img :src="require('~/assets/github.png')" />
    </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Navbar from '~/components/Navbar';
import Player from '~/components/Player';

export default {
  components: {
    Navbar,
    Player,
  },
  computed: {
    ...mapGetters({
      playerCurrentTrack: 'player/playerCurrentTrack',
    }),
  },
};
</script>

<style>
  html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0;
    padding: 0;
  }
  button, a {
    outline: none;
  }
  .github {
    position: fixed;
    right: 15px;
    bottom: 10px;
    display: block;
    cursor: pointer;
  }
  .github img {
    width: 40px;
  }
  .el-header {
    padding: 0;
    height: auto !important;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 99999;
  }
  .el-main {
    padding-top: 75px !important;
  }
  .el-slider__runway {
    height: 10px;
    border-radius: 0;
  }
  .el-slider__button {
    width: 12px;
    height: 10px;
    background-color: #43b883;
    border-radius: 0;
    border: none;
    margin-top: 4px;
  }
  .el-slider__bar {
    height: 10px;
    background-color: #afd6c8;
    border-radius: 0;
    transition: all linear .2s;
  }
  .el-slider__button-wrapper {
    transition: all linear .2s;
  }
  .el-tabs__item {
    font-size: 18px;
    font-weight: bold;
  }
  .el-tabs__header {
    margin-bottom: 35px;
  }
  .el-tabs__item.is-active {
    color: #a6d2a5 !important;
  }
  .el-tabs__item:hover {
    color: #777;
  }
  .el-tabs__active-bar {
    height: 3px;
    background-color: #a6d2a5;
  }
  .el-tabs__nav-wrap:after {
    height: 3px;
  }
  .el-input__inner {
    font-weight: bold;
    font-size: 14px;
  }
  .el-input--small .el-input__icon {
    font-size: 14px;
  }
  @media only screen and (max-width: 950px) {
    .el-tabs__item {
      font-size: 16px;
    }
  }
  @media only screen and (max-width: 420px) {
    .el-tabs__item {
      font-size: 14px;
    }
    .github img {
      width: 30px;
    }
  }
</style>
