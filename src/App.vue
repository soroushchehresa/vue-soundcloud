<template>
  <div id="app">
    <el-container direction="vertical">
      <el-header>
        <navbar />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>
        <player />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import Player from './components/Player';

export default {
  components: {
    Navbar,
    Player,
  },
};
</script>

<style>
  body {
    margin: 0;
    background: #f1f1f1;
  }
  a {
    text-decoration: none;
    color: #000;
  }
  button {
    cursor: pointer;
    background: transparent;
    border: none;
    outline: none;
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
  .el-header {
    padding: 0;
    height: auto !important;
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
</style>
