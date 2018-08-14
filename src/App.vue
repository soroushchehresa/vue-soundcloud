<template>
  <div id="app">
    <el-container direction="vertical">
      <el-header>
        <Navbar />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Navbar from './components/Navbar';

export default {
  components: {
    Navbar,
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
</style>
