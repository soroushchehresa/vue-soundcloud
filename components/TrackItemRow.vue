<template>
  <el-col :xl="24" :class="`itemWrapper${main ? ' mainItem' : ''}`">
    <div
      :style="`backgroundImage: url(${trackData.artwork_url})`"
      class="artwork"
    >
      <div
        :class="`playOverlay${
          (playerCurrentTrack && (playerCurrentTrack.id === trackData.id)) && !isPlay ? ' active' :
            ((playerCurrentTrack && trackData && (playerCurrentTrack.id === trackData.id))
             && isPlay) ? ' palying' : ''
        }`"
        @click="onPlayTrack(trackData)"
      >
        <font-awesome-icon icon="play" />
      </div>
      <div
        :class="`pauseOverlay${
          (playerCurrentTrack && trackData && (playerCurrentTrack.id === trackData.id)
          ) && isPlay ? ' active' : ''
        }`"
        @click="handlePause"
      >
        <font-awesome-icon icon="stop" />
      </div>
    </div>
    <div class="detailsWrapper">
      <router-link class="title" :to="`/tracks/${trackData.id}`">
        {{trackData.title}}
      </router-link>
      <div class="userWrapper">
        <div class="avatarWrapper">
          <router-link class="username" :to="`/users/${trackData.user.id}`">
            <img class="avatar" :src="trackData.user.avatar_url" :alt="trackData.user.username" />
            {{trackData.user.username}}
          </router-link>
        </div>
        <div class="otherDetails">
          <span>
            <font-awesome-icon icon="comment" />
            {{numberSeparator(trackData.comment_count)}}
          </span>
          <span>
            <font-awesome-icon icon="heart" />
            {{numberSeparator(trackData.favoritings_count)}}
          </span>
          <span>
            <font-awesome-icon icon="play" />
            {{numberSeparator(trackData.playback_count)}}
          </span>
        </div>
      </div>
      <p class="description">
        {{trackData.description}}
      </p>
    </div>
    <div
      :class="`waveformWrapper${
        (playerCurrentTrack && (playerCurrentTrack.id === trackData.id)) ? ' playing' : ''
      }`"
      @mousemove="handleHoverWave"
      @click="handleClickWave"
    >
      <div
        class="waveform"
        :style="`background-image: url(${trackData.waveform_url})`"
        @click="onPlayTrack(trackData)"
      />
      <div class="playOverlay">
        <font-awesome-icon icon="play" class="play" />
      </div>
      <div class="seekBackground" :style="`width: ${waveWidth}px`" />
      <div class="seekLine" :style="`width: ${waveWidth}px`" />
      <div
        class="playedBackground"
        :style="`width: ${playerCurrentTime / (playerDuration / 100)}%`"
      />
    </div>
  </el-col>
</template>

<script>
import numberSeparator from '~/utils/number';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      waveWidth: 0,
    };
  },
  props: ['trackData', 'onPlayTrack', 'main'],
  computed: {
    ...mapGetters({
      isPlay: 'player/isPlay',
      playerCurrentTime: 'player/playerCurrentTime',
      playerDuration: 'player/playerDuration',
      playerTracks: 'player/playerTracks',
      playerCurrentTrack: 'player/playerCurrentTrack',
      playerSeeking: 'player/playerSeeking',
    }),
  },
  methods: {
    handleHoverWave({ currentTarget, clientX }) {
      this.waveWidth = clientX - currentTarget.getBoundingClientRect().left;
    },
    handleClickWave({ currentTarget, clientX }) {
      if (this.playerCurrentTrack && (this.playerCurrentTrack.id === this.trackData.id)) {
        const { left } = currentTarget.getBoundingClientRect();
        this.$store.dispatch('player/setPlayerSeeking', true);
        this.$store.dispatch('player/setPlayerCurrentTime', Math.floor(((clientX - left) / ((window.innerWidth < 1300 ? 230 : this.main ? 350 : 250) / 100)) * (this.playerDuration / 100)));
      }
    },
    handlePause() {
      this.$store.dispatch('player/pause');
      this.$store.dispatch('player/setPlayerCurrentTrack', null);
      this.$store.dispatch('player/setPlayerTracks', []);
    },
    numberSeparator,
  },
};
</script>

<style scoped>
  .itemWrapper {
    background: #fff;
    overflow: hidden;
    box-sizing: border-box;
    padding-right: 250px;
    height: 80px;
    position: relative;
    margin-bottom: 20px;
  }
  .itemWrapper.mainItem {
    padding-right: 350px;
    margin-bottom: 20px;
    border: none;
    height: 140px;
  }
  .itemWrapper.mainItem .artwork {
    width: 140px;
    height: 140px;
  }
  .itemWrapper.mainItem .waveformWrapper {
    width: 350px;
  }
  .itemWrapper.mainItem .username {
    font-size: 16px;
  }
  .itemWrapper.mainItem .avatar {
    width: 30px;
    height: 30px;
  }
  .itemWrapper.mainItem .title {
    font-size: 22px;
    margin: 10px 0 20px;
  }
  .itemWrapper.mainItem .detailsWrapper {
    max-width: calc(100% - 140px);
    padding: 0 20px 0 10px;
    box-sizing: border-box;
  }
  .itemWrapper.mainItem .otherDetails {
    margin-top: 10px;
  }
  .itemWrapper.mainItem .otherDetails > span {
    font-size: 14px;
  }
  .artwork {
    width: 80px;
    height: 80px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    position: relative;
    background-color: #e1e1e1;
    float: left;
    cursor: pointer;
  }
  .artwork > .playOverlay, .artwork > .pauseOverlay {
    width: 100%;
    height: 100%;
    display: none;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .6);
  }
  .artwork > .playOverlay > svg, .artwork > .pauseOverlay > svg {
    color: #fff;
    font-size: 20px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .artwork:hover > .playOverlay,
  .artwork > .playOverlay.active,
  .artwork > .pauseOverlay.active {
    display: block;
  }
  .artwork > .playOverlay.palying {
    display: none !important;
  }
  .detailsWrapper {
    overflow: hidden;
    padding-left: 20px;
    float: left;
    max-width: calc(100% - 80px);
  }
  .userWrapper {
    float: left;
    min-width: 400px;
  }
  .avatarWrapper {
    float: left;
    margin-right: 20px;
  }
  .avatar {
    width: 25px;
    height: 25px;
    border-radius: 15px;
    margin: 5px 8px 5px 0;
  }
  .title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: left;
    display: block;
    margin: 10px 0 5px;
    font-size: 16px;
    width: 100%;
    text-decoration: none;
    color: #444;
    font-weight: bold;
  }
  .title:hover {
    color: #777;
  }
  .username {
    color: #a6d2a5;
    font-size: 14px;
    text-decoration: none;
    font-weight: bold;
    display: flex;
    align-items: center;
  }
  .username:hover {
    color: #777;
  }
  .otherDetails {
    margin-left: 10px;
    float: left;
    margin-top: 6px;
  }
  .otherDetails > span {
    margin: 0 10px 0 0;
    font-size: 12px;
    color: #909297;
  }
  .otherDetails > span > svg {
    color: #b6b9bf;
    margin-right: 3px;
  }
  .waveformWrapper {
    width: 250px;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    background: #fff;
    cursor: pointer;
  }
  .waveformWrapper > .waveform {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3;
    background: no-repeat 50%;
    background-size: 100% 100%;
  }
  .waveformWrapper > .playOverlay {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    background: rgba(0, 0, 0, .3);
    opacity: 0;
    visibility: hidden;
    transition: all linear .2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .waveformWrapper.playing > .playOverlay {
    display: none;
  }
  .waveformWrapper:hover > .playOverlay,
  .waveformWrapper.playing:hover > .seekBackground,
  .waveformWrapper.playing:hover > .seekLine {
    opacity: 1;
    visibility: visible;
  }
  .waveformWrapper > .playOverlay > .play {
    font-size: 18px;
    color: #a6d2a5;
  }
  .waveformWrapper > .seekBackground {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 2;
    background: rgba(0, 0, 0, .3);
    visibility: hidden;
  }
  .waveformWrapper > .seekLine {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-right: 1px solid #333;
    z-index: 4;
    visibility: hidden;
  }
  .waveformWrapper > .playedBackground {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 1;
    background: #a6d2a5;
    display: none;
  }
  .waveformWrapper.playing > .playedBackground {
    display: block;
  }
  .description {
    display: none;
    font-size: 13px;
    margin: 5px 0 0 0;
    text-align: left;
    height: 35px;
    overflow: hidden;
  }
  @media only screen and (max-width: 800px) {
    .itemWrapper {
      padding-right: 0 !important;
    }
    
    .itemWrapper .waveformWrapper {
      display: none !important;
    }
    
    .itemWrapper.mainItem .detailsWrapper {
      max-width: calc(100% - 80px);
    }
  }
  @media only screen and (max-width: 1300px) {
    .itemWrapper {
      height: 50px;
    }
    
    .itemWrapper.mainItem {
      height: 80px;
    }
    
    .itemWrapper.mainItem .artwork {
      height: 80px;
      width: 80px;
    }
    
    .itemWrapper.mainItem .title {
      font-size: 18px;
      margin: 10px 0 0;
    }
    
    .itemWrapper.mainItem .avatar {
      width: 25px;
      height: 25px;
    }
    
    .itemWrapper.mainItem .username {
      font-size: 14px;
    }
    
    .itemWrapper.mainItem .otherDetails {
      margin: 8px 0 0;
    }
    
    .artwork {
      width: 50px;
      height: 50px;
    }
    
    .title {
      margin: 3px 0 0;
      font-size: 14px;
    }
    
    .avatar {
      width: 18px;
      height: 18px;
    }
    
    .username {
      font-size: 12px;
    }
    
    .otherDetails {
      margin: 3px 0 0;
    }
    
    .itemWrapper {
      padding-right: 230px;
    }
    
    .itemWrapper .waveformWrapper {
      width: 230px;
    }
    
    .itemWrapper.mainItem .waveformWrapper {
      width: 230px;
    }
    
    .itemWrapper.mainItem {
      padding-right: 230px;
    }
  }
  @media only screen and (max-width: 500px) {
    .itemWrapper.mainItem .artwork {
      height: 50px;
      width: 50px;
    }
    
    .itemWrapper .artwork {
      height: 40px;
      width: 40px;
    }
    
    .itemWrapper.mainItem .title {
      font-size: 14px;
      margin: 2px 0 0;
    }
    
    .itemWrapper .title {
      font-size: 12px;
      margin: 2px 0 0;
    }
    
    .itemWrapper .detailsWrapper {
      max-width: calc(100% - 50px) !important;
      padding: 0 0 0 10px !important;
    }
    
    .itemWrapper.mainItem {
      height: 90px;
      margin: 5px 0;
    }
    
    .itemWrapper.mainItem .otherDetails > span {
      font-size: 12px;
    }
    
    .itemWrapper.mainItem .otherDetails {
      margin: 6px 0 0;
      width: 100%;
    }
    
    .itemWrapper.mainItem .otherDetails > span {
      float: left;
    }
  }
</style>
