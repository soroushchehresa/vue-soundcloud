<template>
  <el-row>
    <el-col
      :xs="24"
      :sm="22"
      :md="20"
      :lg="18"
      :xl="16"
      class="wrapper"
    >
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

<style scoped>
  .wrapper {
    margin: 0 auto;
    float: none;
  }
  .el-row {
    background: #3a3f41;
    padding: 0 17px;
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
</style>
