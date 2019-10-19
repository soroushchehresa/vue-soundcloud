<template>
  <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="4">
    <div class="wrapper">
      <div
        :style="`backgroundImage: url(${trackData.artwork_url})`"
        :class="`artwork${(playerCurrentTrack && (playerCurrentTrack.id === trackData.id))
         ? ' active' : ''}`"
        @click="onClick(trackData)"
      >
        <div class="playOverlay">
          <img v-if="isPlay" class="playing" src="../assets/playing.gif" />
          <font-awesome-icon icon="stop-circle" class="stop" />
          <font-awesome-icon icon="play-circle" class="play" />
        </div>
      </div>
      <div class="bottomWrapper">
        <router-link class="avatarWrapper" :to="`/users/${trackData.user.id}`">
          <img class="avatar" :src="trackData.user.avatar_url" :alt="trackData.user.username" />
        </router-link>
        <div class="titleWrappper">
          <router-link class="title trackTitle" :to="`/tracks/${trackData.id}`">
            {{trackData.title}}
          </router-link>
          <router-link class="title username" :to="`/users/${trackData.user.id}`">
            {{trackData.user.username}}
          </router-link>
        </div>
      </div>
    </div>
  </el-col>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      playerCurrentTrack: 'player/playerCurrentTrack',
      isPlay: 'player/isPlay',
    }),
  },
  props: ['trackData', 'onClick'],
};
</script>

<style scoped>
  .el-col {
    margin: 10px 0;
  }
  .wrapper {
    background: #fff;
    overflow: hidden;
    padding: 8px;
    box-sizing: border-box;
    box-shadow: 0 0 10px #e1e0e0;
    height: 168px;
    transition: all ease .2s;
  }
  .wrapper:hover {
    box-shadow: 0 0 18px #c9c9c9;
  }
  .artwork {
    width: 100%;
    height: 100px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
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
  .artwork .playOverlay > svg {
    font-size: 50px;
    color: #666666;
  }
  .artwork:hover .playOverlay, .artwork.active .playOverlay {
    opacity: 1;
    visibility: visible;
  }
  .artwork:hover .playOverlay > img, .artwork.active .playOverlay > img {
    margin-top: 0;
    opacity: 1;
  }
  .artwork .playOverlay .stop,
  .artwork .playOverlay .play,
  .artwork .playOverlay:hover .playing,
  .artwork.active .playOverlay:hover .play {
    display: none;
  }
  .artwork.active .playOverlay:hover .stop, .artwork .playOverlay:hover .play {
    display: block;
  }
  .bottomWrapper {
    display: flex;
    flex-direction: row;
    overflow: hidden;
  }
  .avatarWrapper .avatar {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 10px 10px -5px 0;
    background-color: #e1e1e1;
  }
  .titleWrappper {
    overflow: hidden;
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
    color: #444;
    font-weight: bold;
    text-decoration: none;
  }
  .titleWrappper .title.trackTitle:hover {
    color: #777;
  }
  .titleWrappper .title.username {
    color: #43b883;
    font-size: 12px;
    font-weight: bold;
    text-decoration: none;
  }
  .titleWrappper .title.username:hover {
    color: #777;
  }
  @media (max-width: 1000px) {
    .avatarWrapper .avatar {
      width: 30px;
      height: 30px;
    }
    
    .titleWrappper .title.trackTitle {
      margin: 12px 0 2px;
      font-size: 12px;
    }
    
    .wrapper {
      height: 162px;
    }
  }
  @media (max-width: 450px) {
    .wrapper {
      padding: 0;
    }
    
    .bottomWrapper {
      margin: 0 5px;
    }
  }
</style>
