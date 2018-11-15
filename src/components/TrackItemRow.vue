<template>
  <el-col :xl="24" :class="`itemWrapper${main ? ' main':''}`">
    <div
      :style="`backgroundImage: url(${trackData.artwork_url})`"
      class="artwork"
    >
      <div
        :class="`playOverlay${
          (activeTrack && (activeTrack.id === trackData.id)) && !isPlay ? ' active' :
            ((activeTrack && trackData && (activeTrack.id === trackData.id))
             && isPlay) ? ' palying' : ''
        }`"
        @click="
          (!activeTrack || (activeTrack && activeTrack.id !== trackData.id))
            ? onClickTrack(trackData) : (!activeTrack ||
             (activeTrack && trackData && (activeTrack.id === trackData.id))) && handlePlayPause()
        "
      >
        <font-awesome-icon icon="play" />
      </div>
      <div
        :class="`pauseOverlay${
          (activeTrack && trackData && (activeTrack.id === trackData.id)) && isPlay ? ' active' : ''
        }`"
        @click="onClickTrack(trackData)"
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
          <img class="avatar" :src="trackData.user.avatar_url" :alt="trackData.user.username" />
          <router-link class="username" :to="`/users/${trackData.user.id}`">
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
            {{numberSeparator(trackData.favoritings_count)}}</span>
          <span>
            <font-awesome-icon icon="play" />
            {{numberSeparator(trackData.playback_count)}}</span>
        </div>
      </div>
      <p class="description">
        {{trackData.description}}
      </p>
    </div>
    <div
      :class="`waveformWrapper${
        (activeTrack && (activeTrack.id === trackData.id)) ? ' playing' : ''
      }`"
      @mousemove="handleHoverWave"
      @click="handleClickWave"
    >
      <div
        class="waveform"
        :style="`background-image: url(${trackData.waveform_url})`"
        @click="onClickTrack(trackData)"
      />
      <div class="playOverlay">
        <font-awesome-icon icon="play" class="play" />
      </div>
      <div class="seekBackground" :style="`width: ${waveWidth}px`" />
      <div class="seekLine" :style="`width: ${waveWidth}px`" />
      <div
        class="playedBackground"
        :style="`width: ${activeTrackPastTime / (activeTrackDuration / 100)}%`"
      />
    </div>
  </el-col>
</template>

<script>
import numberSeparator from '@/utils/number';

export default {
  data() {
    return {
      waveWidth: 0,
    };
  },
  props: [
    'activeTrack',
    'activeTrackPastTime',
    'activeTrackDuration',
    'trackData',
    'onClickTrack',
    'handleSeek',
    'isPlay',
    'handlePlayPause',
    'main',
  ],
  methods: {
    handleHoverWave({ currentTarget, clientX }) {
      if (this.activeTrack && (this.activeTrack.id === this.trackData.id)) {
        const { left } = currentTarget.getBoundingClientRect();
        this.waveWidth = clientX - left;
      }
    },
    handleClickWave({ currentTarget, clientX }) {
      if (this.activeTrack && (this.activeTrack.id === this.trackData.id)) {
        const { left } = currentTarget.getBoundingClientRect();
        this.handleSeek(((clientX - left) / (250 / 100)) * (this.activeTrackDuration / 100));
      }
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
    padding-right: 250px !important;
    display: flex;
    align-items: center;
    height: 80px;
    position: relative;
    border-color: #e0e0e0;
    border-width: 0 1px 1px 1px;
    border-style: solid;
  }
  .main.itemWrapper {
    height: 150px;
  }
  .artwork {
    width: 60px;
    height: 60px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    position: relative;
    background-color: #e1e1e1;
    float: left;
    cursor: pointer;
  }
  .main .artwork {
    width: 130px;
    height: 130px;
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
    display: flex;
    flex-direction: column;
    overflow: hidden;
    align-items: flex-start;
    position: relative;
    padding-left: 20px;
  }
  .main .detailsWrapper {
    display: block;
    height: 150px;
    padding: 10px 0 0 20px;
    box-sizing: border-box;
    width: calc(100% - 130px);
  }
  .userWrapper {
    flex-direction: row;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .main .userWrapper {
    flex-direction: column;
    align-items: flex-start;
  }
  .avatarWrapper {
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  }
  .avatar {
    width: 25px;
    height: 25px;
    border-radius: 20px;
    margin: 5px 10px 5px 0;
  }
  .main .avatar {
    margin: 5px 10px 5px 0;
  }
  .title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: left;
    display: block;
    margin: 0 0 5px;
    font-size: 15px;
    width: 100%;
  }
  .main .title {
    font-size: 18px;
    width: calc(100% - 20px);
  }
  .title:hover {
    color: #505155;
  }
  .username {
    color: #909297;
    font-size: 16px;
  }
  .username:hover {
    color: #6c6d71;
  }
  .otherDetails > span {
    margin: 0 15px 0 0;
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
    margin: 0;
    text-align: left;
    margin-top: 5px;
    height: 35px;
    overflow: hidden;
  }
  .main .description {
    display: block;
  }
</style>
