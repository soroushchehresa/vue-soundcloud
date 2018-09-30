<template>
  <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
    <div class="wrapper">
      <div
        :style="`backgroundImage: url(${trackData.artwork_url})`"
        :class="`artwork${(activeTrack && (activeTrack.id === trackData.id)) ? ' active' : ''}`"
        @click="onClickTrack(trackData)"
      >
        <div class="playOverlay">
          <img src="../assets/icons/play.svg" />
        </div>
      </div>
      <div class="avatarWrapper">
        <img class="avatar" :src="trackData.user.avatar_url" :alt="trackData.user.username" />
      </div>
      <div class="titleWrappper">
        <a class="title trackTitle" href="#">{{trackData.title}}</a>
        <router-link class="title username" :to="`/users/${trackData.user.id}`">
          {{trackData.user.username}}
        </router-link>
      </div>
    </div>
  </el-col>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      activeTrack: 'activeTrack',
    }),
  },
  props: ['trackData', 'onClickTrack'],
};
</script>

<style scoped>
  .el-col {
    margin: 10px 0;
  }
  .wrapper {
    background: #fff;
    overflow: hidden;
    height: 160px;
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
    float: left;
    cursor: pointer;
    position: relative;
    background-color: #e1e1e1;
  }
  .artwork .playOverlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, .8);
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all linear .2s;
  }
  .artwork .playOverlay > img {
    width: 40px;
    margin-top: -30px;
    opacity: 0;
    transition: all linear .2s;
  }
  .artwork:hover .playOverlay, .artwork.active .playOverlay {
    opacity: 1;
    visibility: visible;
  }
  .artwork:hover .playOverlay > img, .artwork.active .playOverlay > img {
    margin-top: 0;
    opacity: 1;
  }
  .avatarWrapper {;
    float: left;
  }
  .avatarWrapper .avatar {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 10px 10px 10px 0;
  }
  .titleWrappper {
    float: left;
    width: 80%;
  }
  .titleWrappper .title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: left;
    display: block;
  }
  .titleWrappper .title.trackTitle {
    margin: 12px 0 2px;
    font-size: 13px;
  }
  .titleWrappper .title.trackTitle:hover {
    color: #505155;
  }
  .titleWrappper .title.username {
    color: #909297;
    font-size: 12px;
  }
  .titleWrappper .title.username:hover {
    color: #6c6d71;
  }
</style>
