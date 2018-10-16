<template>
  <div sticky-container>
    <el-row :style="`padding-bottom: ${currentTrack ? '70px' : '0'}`">
      <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="16" class="container">
        <el-row :gutter="15">
          <el-col :span="18">
            <el-card shadow="always" class="mainUserCardWrapper">
              <h4 v-if="getUserProfileLoading">Loading...</h4>
              <div v-if="userProfileData && !getUserProfileLoading">
                <img
                  :src="userProfileData.avatar_url"
                  :alt="userProfileData.username"
                  class="avatar"
                />
                <h3>{{userProfileData.username}}</h3>
                <div class="otherDetailsWrapper">
                  <p>
                    <font-awesome-icon icon="map-marker-alt" />
                    {{userProfileData.country || 'Earth'}}
                  </p>
                  <p>
                    <font-awesome-icon icon="users" />
                    {{userProfileData.followers_count}}
                  </p>
                  <a target="_blank" :href="userProfileData.website">
                    <font-awesome-icon icon="globe" />
                    {{userProfileData.website_title}}
                  </a>
                </div>
                <p class="description" v-html="userProfileData.description"></p>
              </div>
            </el-card>
            <el-row :gutter="15" class="userMusicsWrapper">
              <h4 v-if="getUserTracksLoading">Loading...</h4>
              <track-item-row
                v-if="!getUserTracksLoading && (userTracksData && userTracksData.length > 0)"
                v-for="(track, i) in userTracksData"
                :key="i"
                :trackData="track"
                :onClickTrack="handleClickTrack"
                :activeTrack="currentTrack"
                :activeTrackPastTime="currentTrackPastTime"
                :activeTrackDuration="currentTrackDuration"
                :handleSeek="handleSongItemSeekTo"
                :handlePlayPause="handleSongItemPlayPause"
                :isPlay="isPlay"
              />
            </el-row>
          </el-col>
          <div
            v-sticky="true"
            sticky-side="both"
            :class="`stickyWrapper${currentTrack ? ' playerOpened' : ''}`"
          >
            <el-col :span="6" class="followingWrapper">
              <h4 v-if="getUserFollowingsLoading">Loading...</h4>
              <h4 v-if="!getUserFollowingsLoading">
                Following {{userFollowingsData && userFollowingsData.length}} Users
              </h4>
              <follower-item
                v-if="!getUserFollowingsLoading"
                v-for="(user, i) in userFollowingsData"
                :key="i"
                :userData="user"
              />
              </el-col>
          </div>
        </el-row>
      </el-col>
    </el-row>
    <Player
      :tracks="userTracksData"
      :currentTrack="currentTrack"
      :setCurrentTrack="handleSetCurrentTrack"
      :setCurrentTrackPastTime="handleSetCurrentTrackPastTime"
      :setCurrentTrackDuration="handleSetCurrentTrackDuration"
      :setCurrentTrackIsPlay="handleSetCurrentTrackIsPlay"
      :outsideSeek="trackItemSeek"
      :outsidePlayPause="currentTrackPlayPause"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Sticky from 'vue-sticky-directive';
import FollowerItem from '@/components/FollowerItem';
import TrackItemRow from '@/components/TrackItemRow';
import Player from '@/components/Player';

export default {
  data() {
    return {
      currentTrack: null,
      currentTrackPastTime: 0,
      currentTrackDuration: 0,
      currentTrackSeek: null,
      trackItemSeek: 0,
      currentTrackPlayPause: false,
      isPlay: false,
    };
  },
  mounted() {
    const { params: { id } } = this.$route;
    this.$store.dispatch('getUserProfile', id);
    this.$store.dispatch('getUserFollowings', id);
    this.$store.dispatch('getUserTracks', id);
  },
  components: {
    FollowerItem,
    TrackItemRow,
    Player,
  },
  watch: {
    $route({ params: { id: nextUserID } }, { params: { id: prevUserID } }) {
      if (nextUserID !== prevUserID) {
        this.$store.dispatch('getUserProfile', nextUserID);
        this.$store.dispatch('getUserFollowings', nextUserID);
        this.$store.dispatch('getUserTracks', nextUserID);
      }
    },
  },
  computed: {
    ...mapGetters({
      getUserProfileLoading: 'getUserProfileLoading',
      userProfileData: 'userProfileData',
      getUserProfileFail: 'getUserProfileFail',
      getUserFollowingsLoading: 'getUserFollowingsLoading',
      userFollowingsData: 'userFollowingsData',
      getUserFollowingsFail: 'getUserFollowingsFail',
      getUserTracksLoading: 'getUserTracksLoading',
      userTracksData: 'userTracksData',
      getUserTracksFail: 'getUserTracksFail',
    }),
  },
  directives: {
    Sticky,
  },
  methods: {
    handleClickTrack(trackData) {
      if (this.currentTrack && trackData.id === this.currentTrack.id) {
        this.currentTrack = null;
      } else {
        this.currentTrack = trackData;
      }
    },
    handleSetCurrentTrack(currentTrack) {
      this.currentTrack = currentTrack;
    },
    handleSetCurrentTrackPastTime(pastTime) {
      this.currentTrackPastTime = pastTime;
    },
    handleSetCurrentTrackDuration(duration) {
      this.currentTrackDuration = duration;
    },
    handleSongItemSeekTo(time) {
      this.trackItemSeek = Math.floor(time);
    },
    handleSongItemPlayPause() {
      this.currentTrackPlayPause = !this.currentTrackPlayPause;
    },
    handleSetCurrentTrackIsPlay(isPlay) {
      this.isPlay = isPlay;
    },
  },
};
</script>

<style scoped>
  .container {
    margin: 0 auto;
    float: none;
  }
  .followingWrapper {
    background: #fff;
    overflow-y: scroll;
    height: 100vh;
    position: absolute;
    right: 0;
  }
  .mainUserCardWrapper .avatar {
    border-radius: 50px;
  }
  .mainUserCardWrapper .otherDetailsWrapper {
    text-align: center;
  }
  .mainUserCardWrapper .otherDetailsWrapper > * {
    display: inline-block;
    margin: 0 20px;
    color: #a1a1a1;
  }
  .mainUserCardWrapper .otherDetailsWrapper > * > svg {
    margin-right: 5px;
  }
  .userMusicsWrapper {
    margin: 20px 0 0 !important;
  }
  .description {
    font-size: 14px;
  }
  .stickyWrapper.top-sticky > div {
    height: calc(100vh - 20px);
  }
  .stickyWrapper.playerOpened.top-sticky > div {
    height: calc(100vh - 90px);
  }
</style>
