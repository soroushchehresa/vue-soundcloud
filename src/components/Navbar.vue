<template>
  <el-row type="flex" class="navbarWrapper" justify="center">
    <el-col :span="20">
      <el-menu
        mode="horizontal"
        background-color="#3a3f41"
        text-color="#fff"
        active-text-color="#ffd04b"
        class="navbar"
      >
        <img src="../assets/logo.png" class="navbarLogo" />
        <el-input
          size="small"
          placeholder="search music..."
          prefix-icon="el-icon-search"
          class="searchInput"
        >
        </el-input>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Button Text',
    };
  },
};
</script>

<style>
  .navbarWrapper {
    background: #3a3f41;
  }
  .navbarWrapper .navbar {
    border: none;
  }
  .navbarWrapper .navbarLogo {
    width: 170px;
    float: left;
    margin: 0 20px;
  }
  .navbarWrapper .searchInput {
    float: right;
    width: 280px;
    margin: 13px 0;
  }
  .navbarWrapper .searchInput .el-input__inner {
    background: #2b2b2b;
    border: none;
    outline: none;
    color: #fff;
  }
</style>
