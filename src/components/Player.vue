<template>
  <div class="playerWrapper" v-if="!!playerCurrentTrack">
    <div class="trackDetails">
      <img :src="playerCurrentTrack.artwork_url" alt="">
      <div class="titleWrapper">
        <router-link class="title" :to="`/tracks/${playerCurrentTrack.id}`">
          {{playerCurrentTrack.title}}
        </router-link>
        <router-link class="user" :to="`/users/${playerCurrentTrack.user.id}`">
          {{playerCurrentTrack.user.username}}
        </router-link>
      </div>
    </div>
    <div class="mainButtons">
      <button :disabled="playerTracks.length === 0" @click="handleChangeTrack('previous')">
        <img src="../assets/icons/previous.svg" />
      </button>
      <button @click="$store.dispatch(isPlay ? 'pause' : 'play')" class="playButton">
        <img
          :src="isPlay ?require('../assets/icons/pause.svg') :require('../assets/icons/play.svg')"
        />
      </button>
      <button :disabled="playerTracks.length === 0" @click="handleChangeTrack('next')">
        <img src="../assets/icons/next.svg" />
      </button>
    </div>
    <div class="seekbarWrapper">
      <span class="currentTime">{{secondsToTime(playerCurrentTime)}}</span>
      <div class="seekbar" @click="calculateSeekOnClick">
        <div
          class="seek"
          :style="{ width: `${(((playerCurrentTime / playerDuration) * 100) || 0)}%` }"
        />
        <div
          class="seekbarPoint"
          :style="{ left: `calc(${(((playerCurrentTime / playerDuration) * 100) || 0)}% - 7px)` }"
        />
      </div>
      <span class="durationTime">{{secondsToTime(playerDuration)}}</span>
    </div>
  </div>
</template>

<script>
import { Howl } from 'howler';
import _ from 'lodash';
import { mapGetters } from 'vuex';
import secondsToTime from '@/utils/secondsToTime';

export default {
  data() {
    return {
      player: null,
    };
  },
  computed: {
    ...mapGetters({
      isPlay: 'isPlay',
      playerCurrentTime: 'playerCurrentTime',
      playerDuration: 'playerDuration',
      playerTracks: 'playerTracks',
      playerCurrentTrack: 'playerCurrentTrack',
      playerSeeking: 'playerSeeking',
    }),
  },
  watch: {
    isPlay(nextIsPlay, prevIsPlay) {
      if (nextIsPlay !== prevIsPlay && this.player) {
        this.handlePlayPause();
      }
    },
    playerCurrentTime(nextPlayerCurrentTime, prevPlayerCurrentTime) {
      if (nextPlayerCurrentTime !== prevPlayerCurrentTime && this.playerSeeking) {
        this.player.seek(nextPlayerCurrentTime);
        this.$store.dispatch('setPlayerSeeking', false);
      }
    },
    playerCurrentTrack(nextCurrentTrack, prevCurrentTrack) {
      if (nextCurrentTrack && !_.isEqual(nextCurrentTrack, prevCurrentTrack)) {
        if (this.player) {
          this.player.pause();
          this.$store.dispatch('pause');
          this.$store.dispatch('setPlayerCurrentTime', 0);
          this.$store.dispatch('setPlayerDuration', 0);
          this.player = null;
        }
        setTimeout(() => {
          this.player = new Howl({
            src: `${nextCurrentTrack.stream_url}?client_id=${process.env.SOUNDCLOUD_CLIENT_ID}`,
            html5: true,
            volume: 1.0,
          });
          this.$store.dispatch('play');
          this.player.on('play', () => {
            setInterval(() => {
              if (this.player && this.player.playing()) {
                this.$store.dispatch('setPlayerCurrentTime', Math.round(this.player.seek()) || 0);
                if (Math.round(this.player.duration()) !== this.playerDuration) {
                  this.$store.dispatch('setPlayerDuration', Math.round(this.player.duration()) || 0);
                }
              }
            }, 100);
          });
        }, 100);
      } else if (prevCurrentTrack && !nextCurrentTrack) {
        this.$store.dispatch('pause');
        this.$store.dispatch('setPlayerCurrentTime', 0);
        this.$store.dispatch('setPlayerDuration', 0);
        this.player.pause();
        this.player = null;
      }
    },
  },
  destroyed() {
    if (this.player) {
      this.$store.dispatch('pause');
      this.player = null;
      this.$store.dispatch('setPlayerCurrentTime', 0);
      this.$store.dispatch('setPlayerDuration', 0);
    }
  },
  methods: {
    handlePlayPause() {
      if (this.isPlay) {
        if (this.playerDuration > 0 && (this.playerCurrentTime === this.playerDuration)) {
          this.player.seek(0);
          this.$store.dispatch('setPlayerCurrentTime', 0);
          this.$store.dispatch('setPlayerDuration', 0);
        }
        this.player.play();
      } else {
        this.player.pause();
      }
    },
    handleChangeTrack(direction) {
      const self = this;
      const currentTrackID = this.playerCurrentTrack.id;
      this.playerTracks.forEach((track, index) => {
        if (currentTrackID === track.id) {
          let nextIndex = 0;
          if (direction === 'next') {
            nextIndex = index + 1;
            if (nextIndex < self.playerTracks.length) {
              this.$store.dispatch('setPlayerCurrentTrack', self.playerTracks[nextIndex]);
            }
          } else if (direction === 'previous') {
            nextIndex = index - 1;
            if (nextIndex >= 0) {
              this.$store.dispatch('setPlayerCurrentTrack', self.playerTracks[nextIndex]);
            }
          }
        }
      });
    },
    calculateSeekOnClick(e) {
      const element = e.target;
      const offset = {
        left: element.offsetLeft,
        top: element.offsetTop,
      };
      let reference = e.offsetParent;
      while (reference !== undefined) {
        offset.left += reference.offsetLeft;
        offset.top += reference.offsetTop;
        reference = reference.offsetParent;
      }
      const percent = 100 - (((element.clientWidth - (e.pageX - offset.left)) / element.clientWidth) * 100); // eslint-disable-line
      const currentTime = Math.floor((this.playerDuration / 100) * percent);
      this.player.seek(currentTime);
    },
    secondsToTime,
  },
};
</script>

<style scoped>
  .playerWrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 85px;
    background: #fff;
    display: flex;
    z-index: 99999;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .trackDetails {
    position: absolute;
    left: 15px;
    top: 0;
    height: 85px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .trackDetails img {
    width: 60px;
    background: #eee;
    object-fit: cover;
  }
  .trackDetails .titleWrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10px;
    font-size: 12px;
    width: 200px;
    overflow: hidden;
    text-align: left;
  }
  .trackDetails .titleWrapper * {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
  }
  .trackDetails .titleWrapper .title {
    font-weight: bold;
  }
  .mainButtons {
    margin: 5px auto 0;
    display: table;
    align-self: center;
  }
  .mainButtons button {
    float: left;
    border-radius: 20px;
    width: 35px;
    height: 35px;
    margin: 0 10px;
    padding: 5px;
    transition: all ease .1s;
    box-sizing: border-box;
  }
  .mainButtons button:disabled,
  .mainButtons button[disabled] {
    cursor: default;
    pointer-events: none;
  }
  .mainButtons button:disabled img,
  .mainButtons button[disabled] img {
    opacity: .2 !important;
  }
  .mainButtons button:hover img {
    opacity: .7;
  }
  .mainButtons button.playButton {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .mainButtons button.playButton img {
    width: 20px;
  }
  .mainButtons button img {
    width: 14px;
    opacity: .4;
  }
  .seekbarWrapper {
    margin-top: 5px;
    width: 600px;
    display: flex;
    justify-content: stretch;
    align-items: center;
  }
  .seekbarWrapper > .seekbar {
    width: 100%;
    height: 5px;
    background: #eee;
    border-radius: 5px;
    position: relative;
    margin: 0 10px;
    cursor: pointer;
  }
  .seekbarWrapper > .seekbar:hover .seekbarPoint {
    opacity: 1;
  }
  .seekbarWrapper > .seekbar > .seek {
    height: 5px;
    background: #00bc7e;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    border-radius: 5px 0 0 5px;
    pointer-events: none;
    transition: all linear .1s;
  }
  .seekbarWrapper > .seekbar > .seekbarPoint {
    width: 12px;
    height: 12px;
    border-radius: 8px;
    background: #008e5c;
    position: absolute;
    top: -3.25px;
    z-index: 3;
    opacity: 0;
    transition: all linear .1s;
    pointer-events: none;
  }
  .currentTime {
    font-size: 12px;
  }
  .durationTime {
    font-size: 12px;
  }
</style>
