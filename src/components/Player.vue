<template>
  <div class="playerWrapper" v-if="!!activeTrack">
    <div class="mainButtons">
      <button @click="handleChangeTrack('previous')">
        <img src="../assets/icons/previous.svg" />
      </button>
      <button @click="handlePlayPause" class="playButton">
        <img
          :src="(this.player && this.player.playing()) ?
            require('../assets/icons/pause.svg') :
            require('../assets/icons/play.svg')
          "
          :style="(!this.player||(this.player &&!this.player.playing())) && 'margin-left: 2px'"
        />
      </button>
      <button @click="handleChangeTrack('next')">
        <img src="../assets/icons/next.svg" />
      </button>
    </div>
    <span class="pastTime">{{secondsToTime(pastTime)}}</span>
    <span
      class="remainingTime"
      v-if="secondsToTime(duration - pastTime)"
    >
      {{`- ${secondsToTime(duration - pastTime)}`}}
    </span>
    <el-slider
      class="seekBar"
      v-model="seekRange"
      :show-tooltip="false"
      @change="handleSeekChange"
    />
  </div>
</template>

<script>
import { Howl } from 'howler';
import secondsToTime from '@/utils/secondsToTime';

export default {
  data() {
    return {
      activeTrack: null,
      player: null,
      duration: 0,
      pastTime: 0,
      seekRange: 0,
    };
  },
  props: [
    'tracks',
    'currentTrack',
    'setCurrentTrack',
    'setCurrentTrackPastTime',
    'setCurrentTrackDuration',
    'outsideSeek',
    'setCurrentTrackIsPlay',
    'outsidePlayPause',
  ],
  destroyed() {
    if (this.player) {
      this.player.pause();
      this.player = null;
      this.seekRange = 0;
      this.pastTime = 0;
      this.duration = 0;
    }
  },
  watch: {
    outsidePlayPause(nextPlayPause, prevPlayPause) {
      if (nextPlayPause !== prevPlayPause && this.player) {
        this.handlePlayPause();
      }
    },
    outsideSeek(nextSeek, prevSeek) {
      if (
        (nextSeek || nextSeek === 0) &&
        (nextSeek !== prevSeek) &&
        this.player
      ) {
        this.pastTime = nextSeek;
        this.seekRange = nextSeek / (this.duration / 100);
        this.player.seek(nextSeek);
      }
    },
    currentTrack(nextCurrentTrack, prevCurrentTrack) {
      if (
        (prevCurrentTrack && nextCurrentTrack && prevCurrentTrack.id !== nextCurrentTrack.id) ||
        (nextCurrentTrack && nextCurrentTrack.id && !prevCurrentTrack) ||
        (prevCurrentTrack && !nextCurrentTrack)
      ) {
        if (this.setCurrentTrackPastTime) {
          this.setCurrentTrackPastTime(0);
        }
        if (!nextCurrentTrack && this.player) {
          this.player.pause();
          this.player = null;
          this.seekRange = 0;
          this.pastTime = 0;
          this.duration = 0;
        }
        this.activeTrack = nextCurrentTrack;
      }
    },
    pastTime(nextPastTime, prevPastTime) {
      if (
        nextPastTime &&
        nextPastTime > 0 &&
        nextPastTime !== prevPastTime
      ) {
        if (this.setCurrentTrackPastTime) {
          this.setCurrentTrackPastTime(nextPastTime);
        }
        this.seekRange = this.pastTime / (this.duration / 100);
      }
    },
    duration(nextDuration, prevDuration) {
      if (
        nextDuration &&
        nextDuration > 0 &&
        nextDuration !== prevDuration &&
        this.setCurrentTrackDuration
      ) {
        this.setCurrentTrackDuration(nextDuration);
      }
    },
    activeTrack(nextActiveTrack, prevActiveTrack) {
      if (!prevActiveTrack && nextActiveTrack) {
        setTimeout(() => {
          const seekSliderButtonElement = document.getElementsByClassName('el-slider__button-wrapper')[0];
          if (seekSliderButtonElement) {
            let startMouseDown = false;
            seekSliderButtonElement.addEventListener('mousedown', () => {
              startMouseDown = true;
              this.player.pause();
            }, false);
            window.addEventListener('mouseup', (e) => {
              if (startMouseDown) {
                this.handleSeekChange(
                  Math.round(e.clientX / (window.innerWidth / 100)),
                ).then(() => {
                  startMouseDown = false;
                  this.player.play();
                });
              }
            });
          }
        }, 500);
      }
      if (
        (prevActiveTrack && nextActiveTrack && prevActiveTrack.id !== nextActiveTrack.id) ||
        (nextActiveTrack && nextActiveTrack.id && !prevActiveTrack)
      ) {
        if (this.player) {
          this.player.pause();
          this.player = null;
          this.seekRange = 0;
          this.pastTime = 0;
          this.duration = 0;
        }
        this.player = new Howl({
          src: `${nextActiveTrack.stream_url}?client_id=a281614d7f34dc30b665dfcaa3ed7505`,
          html5: true,
          volume: 1.0,
        });
        this.player.play();
        this.player.on('play', () => {
          setInterval(() => {
            if (this.player && this.player.playing()) {
              this.duration = Math.round(this.player.duration() || 0);
              this.pastTime = Math.round(this.player.seek() || 0);
            }
          }, 100);
        });
      }
      if (!nextActiveTrack && this.player) {
        this.player.pause();
        this.activeTrack = null;
        this.player = null;
      }
    },
  },
  updated() {
    if (
      (this.player && this.player.playing()) &&
      this.duration > 0 &&
      (this.duration === this.pastTime)
    ) {
      if ((this.tracks.indexOf(this.activeTrack) + 1) < this.tracks.length) {
        this.handleChangeTrack('next');
      } else {
        this.pastTime = 0;
        this.seekRange = 0;
        this.player.pause();
        if (this.setCurrentTrackIsPlay) {
          this.setCurrentTrackIsPlay(false);
        }
      }
    }
    if (this.setCurrentTrackIsPlay) {
      if ((this.player && this.player.playing())) {
        this.setCurrentTrackIsPlay(true);
      } else {
        this.setCurrentTrackIsPlay(false);
      }
    }
  },
  methods: {
    handlePlayPause() {
      if (this.player && this.player.playing()) {
        this.player.pause();
      } else {
        if (this.pastTime === this.duration) {
          this.player.seek(0);
          this.seekRange = 0;
          this.pastTime = 0;
        }
        this.player.play();
      }
    },
    handleSeekChange(data) {
      return new Promise((resolve) => {
        const nextSeek = Math.round(data * (this.duration / 100));
        this.player.seek(nextSeek);
        this.pastTime = nextSeek;
        this.seekRange = data;
        resolve();
      });
    },
    handleChangeTrack(direction) {
      this.tracks.forEach((track, index) => {
        if (this.currentTrack.id === track.id) {
          let nextIndex = 0;
          if (direction === 'next') {
            nextIndex = index + 1;
            if (nextIndex < this.tracks.length) {
              this.setCurrentTrack(this.tracks[nextIndex]);
            }
          } else if (direction === 'previous') {
            nextIndex = index - 1;
            if (nextIndex >= 0) {
              this.setCurrentTrack(this.tracks[nextIndex]);
            }
          }
        }
      });
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
    padding-top: 12px;
    background: #fff;
    display: flex;
    height: 65px;
    z-index: 99999;
  }
  .mainButtons {
    margin: 0 auto;
    display: table;
    align-self: center;
  }
  .mainButtons button {
    float: left;
    border-radius: 20px;
    width: 40px;
    height: 40px;
    margin: 10px;
    padding: 11px;
    transition: all ease .1s;
    box-sizing: border-box;
  }
  .mainButtons button:hover {
    transform: scale(1.1);
  }
  .mainButtons button.playButton {
    border: 1px solid #a5a7b0;
  }
  .mainButtons button img {
    width: 16px;
  }
  .seekBar {
    position: absolute;
    top: -16px;
    left: 0;
    width: 100%;
  }
  .pastTime {
    position: absolute;
    left: 15px;
    top: 15px;
    font-size: 14px;
  }
  .remainingTime {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 14px;
  }
</style>
