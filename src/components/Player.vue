<template>
  <div class="playerWrapper" v-if="!!activeTrack">
    <div class="mainButtons">
      <button @click="handleChangeTrack('previous')">
        <img src="../assets/icons/previous.svg" />
      </button>
      <button @click="handlePlay" class="playButton">
        <img
          :src=" isPlay ?
            require('../assets/icons/pause.svg') :
            require('../assets/icons/play.svg')
          "
          :style=" !isPlay && 'margin-left: 2px'"
        />
      </button>
      <button @click="handleChangeTrack('next')">
        <img src="../assets/icons/next.svg" />
      </button>
    </div>
    <span class="pastTime">{{secondsToTime(seek)}}</span>
    <span class="remainingTime">{{`- ${secondsToTime(duration - seek)}`}}</span>
    <el-slider
      class="seekBar"
      v-model="seekRange"
      :show-tooltip="false"
      @change="handleSeekChange"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Howl } from 'howler';
import secondsToTime from '@/utils/secondsToTime';

export default {
  data() {
    return {
      isPlay: false,
      player: null,
      activePlayerTrack: null,
      duration: 0,
      seek: 0,
      seekRange: 0,
    };
  },
  computed: {
    ...mapGetters({
      activeTrack: 'activeTrack',
      tracks: 'tracks',
    }),
  },
  methods: {
    handlePlay() {
      if (this.isPlay) {
        this.player.pause();
      } else {
        if (this.seek === this.duration) {
          this.player.seek(0);
          this.seekRange = 0;
          this.seek = 0;
        }
        this.player.play();
      }
      this.isPlay = !this.isPlay;
    },
    handleSeekChange(data) {
      return new Promise((resolve) => {
        const nextSeek = Math.round(data * (this.duration / 100));
        this.player.seek(nextSeek);
        this.seek = nextSeek;
        this.seekRange = nextSeek;
        resolve();
      });
    },
    handleChangeTrack(direction) {
      this.tracks.forEach((track, index) => {
        if (this.activePlayerTrack.id === track.id) {
          let nextIndex = null;
          switch (direction) {
            case 'next':
              nextIndex = index + 1;
              if (nextIndex < this.tracks.length) {
                this.$store.dispatch('setActiveTeack', this.tracks[nextIndex]);
              }
              break;
            case 'previous':
              nextIndex = index - 1;
              if (nextIndex >= 0) {
                this.$store.dispatch('setActiveTeack', this.tracks[nextIndex]);
              }
              break;
            default:
              break;
          }
        }
      });
    },
    secondsToTime,
  },
  updated() {
    if (!this.activePlayerTrack && this.activeTrack) {
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
              this.handleSeekChange(Math.round(e.clientX / (window.innerWidth / 100))).then(() => {
                startMouseDown = false;
                this.player.play();
              });
            }
          });
        }
      }, 500);
    }
    this.seekRange = this.seek / (this.duration / 100);
    if (
      this.activeTrack &&
      (!this.activePlayerTrack || (this.activeTrack.id !== this.activePlayerTrack.id))
    ) {
      this.seekRange = 0;
      this.seek = 0;
      this.duration = 0;
      if (this.player) this.player.pause();
      this.activePlayerTrack = this.activeTrack;
      this.player = new Howl({
        src: `${this.activeTrack.stream_url}?client_id=a281614d7f34dc30b665dfcaa3ed7505`,
        html5: true,
        volume: 1.0,
      });
      this.isPlay = true;
      this.player.on('play', () => {
        setInterval(() => {
          if (this.player.playing()) {
            this.duration = Math.round(this.player.duration() || 0);
            this.seek = Math.round(this.player.seek() || 0);
          }
        }, 100);
      });
      this.player.play();
    } else if (!this.activeTrack && this.player) {
      this.player.pause();
      this.activePlayerTrack = null;
      this.player = null;
      this.isPlay = false;
    } else if (this.duration > 0 && this.duration === this.seek) {
      this.isPlay = false;
      this.player.pause();
    }
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
