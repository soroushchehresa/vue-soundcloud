<template>
  <el-col
    :xs="24"
    :sm="12"
    :md="8"
    :lg="6"
    :xl="4"
  >
    <div class="wrapper">
      <div
        :style="{backgroundImage: `url(${trackData.artwork_url})` }"
        class="artwork"
      />
      <div class="avatarWrapper">
        <img class="avatar" :src="trackData.user.avatar_url" :alt="trackData.user.username" />
      </div>
      <div class="titleWrappper">
        <a class="title trackTitle" href="#">{{trackData.title}}</a>
        <a class="title username" href="#">{{trackData.user.username}}</a>
      </div>
    </div>
  </el-col>
</template>

<script>
export default {
  props: ['trackData'],
};
</script>

<style scoped>
  .el-col {
    margin: 10px 0;
  }
  .wrapper {
    background: #fff;
    overflow: hidden;
    height: 155px;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #e3e3e3;
  }
  .artwork {
    width: 100%;
    height: 90px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }
  .avatarWrapper {
    width: 25%;
    float: left;
  }
  .avatarWrapper .avatar {
    width: 35px;
    height: 35px;
    border-radius: 20px;
    margin: 10px 10px 10px 0;
  }
  .titleWrappper {
    float: left;
    width: 75%;
  }
  .titleWrappper .title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: left;
    display: block;
  }
  .titleWrappper .title.trackTitle {
    margin: 10px 0 2px;
    font-size: 13px;
  }
  .titleWrappper .title.trackTitle:hover {
    color: #555;
  }
  .titleWrappper .title.username {
    color: #3381b7;
    font-size: 12px;
  }
  .titleWrappper .title.username:hover {
    color: #27517a;
  }
</style>
