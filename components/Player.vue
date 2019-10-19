<template>
  <div class="playerWrapper" v-if="!!playerCurrentTrack">
    <div class="trackDetails">
      <router-link :to="`/tracks/${playerCurrentTrack.id}`">
        <img :src="playerCurrentTrack.artwork_url" alt="">
      </router-link>
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
      <button :disabled="playerTracks.length === 0" @click="handleChangeTrack('previous')" class="prev">
        <img :src="require('~/assets/icons/prev.png')" />
      </button>
      <button @click="$store.dispatch(isPlay ? 'player/pause' : 'player/play')" class="playButton">
        <img
          :src="isPlay ?require('~/assets/icons/pause.png') :require('~/assets/icons/play.png')"
        />
      </button>
      <button :disabled="playerTracks.length === 0" @click="handleChangeTrack('next')" class="next">
        <img :src="require('~/assets/icons/next.png')" />
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
import secondsToTime from '~/utils/secondsToTime';

export default {
  data() {
    return {
      player: null,
      playerInterval: null,
    };
  },
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
  mounted() {
    let goToNextTrack = false;
    this.playerInterval = setInterval(() => {
      if (this.player && this.player.playing()) {
        this.$store.dispatch('player/setPlayerCurrentTime', Math.round(this.player.seek()) || 0);
        if (Math.round(this.player.duration()) !== this.playerDuration) {
          this.$store.dispatch('player/setPlayerDuration', Math.round(this.player.duration()) || 0);
        }
        if (!goToNextTrack && this.playerDuration < (this.playerCurrentTime + 2)) {
          goToNextTrack = true;
          setTimeout(() => {
            this.handleChangeTrack('next');
            goToNextTrack = false;
          }, 1000);
        }
      }
    }, 100);
  },
  watch: {
    isPlay(nextIsPlay, prevIsPlay) {
      if (nextIsPlay !== prevIsPlay && this.player) {
        this.handlePlayPause();
      }
    },
    playerCurrentTime(nextPlayerCurrentTime, prevPlayerCurrentTime) {
      if (this.player && this.playerSeeking && (nextPlayerCurrentTime !== prevPlayerCurrentTime)) {
        this.player.seek(nextPlayerCurrentTime);
        this.$store.dispatch('player/setPlayerSeeking', false);
      }
    },
    playerCurrentTrack(nextCurrentTrack, prevCurrentTrack) {
      if (nextCurrentTrack && !_.isEqual(nextCurrentTrack, prevCurrentTrack)) {
        if (this.player) {
          this.killPlayer();
        }
        setTimeout(() => {
          this.player = new Howl({
            src: `${nextCurrentTrack.stream_url}?client_id=a281614d7f34dc30b665dfcaa3ed7505`,
            html5: true,
            volume: 1.0,
          });
          this.$store.dispatch('player/play');
        }, 100);
      }
    },
  },
  destroyed() {
    if (this.player) {
      this.killPlayer();
    }
    clearInterval(this.playerInterval);
  },
  methods: {
    killPlayer() {
      if (this.player) {
        this.player.pause();
        this.$store.dispatch('player/pause');
        this.$store.dispatch('player/setPlayerCurrentTime', 0);
        this.$store.dispatch('player/setPlayerDuration', 0);
        this.player = null;
      }
    },
    handlePlayPause() {
      if (this.isPlay) {
        if (this.playerDuration > 0 && (this.playerCurrentTime === this.playerDuration)) {
          this.player.seek(0);
          this.$store.dispatch('player/setPlayerCurrentTime', 0);
          this.$store.dispatch('player/setPlayerDuration', 0);
        }
        this.player.play();
      } else {
        this.player.pause();
      }
    },
    handleChangeTrack(direction) {
      if (this.player) {
        const self = this;
        const currentTrackID = this.playerCurrentTrack.id;
        this.playerTracks.forEach((track, index) => {
          if (currentTrackID === track.id) {
            let nextIndex = 0;
            if (direction === 'next') {
              nextIndex = index + 1;
              if (nextIndex < self.playerTracks.length) {
                this.killPlayer();
                setTimeout(() => {
                  this.$store.dispatch('player/setPlayerCurrentTrack', self.playerTracks[nextIndex]);
                }, 100);
              } else {
                this.killPlayer();
                this.$store.dispatch('player/setPlayerCurrentTrack', null);
                this.$store.dispatch('player/setPlayerTracks', []);
              }
            } else if (direction === 'previous') {
              nextIndex = index - 1;
              if (nextIndex >= 0) {
                this.killPlayer();
                setTimeout(() => {
                  this.$store.dispatch('player/setPlayerCurrentTrack', self.playerTracks[nextIndex]);
                }, 100);
              }
            }
          }
        });
      }
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
    box-shadow: 0 0 15px #ededed;
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
    width: 300px;
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
    font-size: 16px;
    text-decoration: none;
    color: #444;
  }
  .trackDetails .titleWrapper .user {
    font-weight: bold;
    font-size: 12px;
    color: #008e5c;
    text-decoration: none;
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
    cursor: pointer;
    background: transparent;
  }
  .mainButtons button.next, .mainButtons button.prev {
    border: none;
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
    opacity: .5;
  }
  .mainButtons button.playButton {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    width: 38px;
    height: 38px;
    border-radius: 20px;
    overflow: hidden;
  }
  .mainButtons button.playButton img {
    width: 16px;
  }
  .mainButtons button img {
    width: 14px;
    opacity: .7;
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
  @media only screen and (max-width: 950px) {
    .playerWrapper {
      height: 100px;
    }
    
    .trackDetails {
      position: static;
    }
    
    .trackDetails img {
      display: none;
    }
    
    .trackDetails .titleWrapper .user {
      display: none;
    }
    
    .trackDetails .titleWrapper .user {
      display: none;
    }
    
    .trackDetails .titleWrapper .title {
      font-size: 13px;
    }
    
    .mainButtons {
      margin: 0 auto;
    }
    
    .seekbarWrapper > .seekbar {
      position: absolute;
      top: 0;
      width: 100%;
      margin: 0;
      left: 0;
    }
    
    .currentTime {
      font-size: 12px;
      position: absolute;
      top: 10px;
      left: 5px;
    }
    
    .durationTime {
      font-size: 12px;
      position: absolute;
      top: 10px;
      right: 5px;
    }
    
    .trackDetails {
      height: 30px;
      margin-top: 15px;
    }
    
    .trackDetails .titleWrapper {
      margin-left: 0;
      width: 400px;
    }
    
    .mainButtons button.playButton {
      width: 34px;
      height: 34px;
    }
  }
  @media only screen and (max-width: 450px) {
    .trackDetails {
      width: 100%;
    }
    .trackDetails .titleWrapper {
      width: 90%;
      overflow: hidden;
      margin: 0 10px;
      text-align: center;
    }
  }
</style>
