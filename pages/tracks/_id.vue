<template>
  <el-row>
    <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="16" class="container">
      <el-row class="mainTrackWrapper">
        <el-card shadow="always">
          <track-item-row
            v-if="(trackDetails)"
            :trackData="trackDetails"
            :onPlayTrack="handlePlayTrack"
            :main="true"
          />
        </el-card>
      </el-row>
      <el-row :class="`tabsWrapper${playerCurrentTrack ? ' playerOpened' : ''}`">
        <el-card shadow="always">
          <el-tabs>
            <el-tab-pane>
              <span slot="label">
                Related
                tracks
              </span>
              <track-item-row
                v-if="(userTracks || userTracks).length > 0"
                v-for="(track, i) in (userTracks || userTracks)"
                :key="i"
                :trackData="track"
                :onPlayTrack="handlePlayTrack"
              />
              <p v-if="!userTracks || userTracks.length === 0">
                No
                Items
                Found
              </p>
            </el-tab-pane>
            <el-tab-pane>
              <span slot="label">
                Track
                comments
                ({{trackComments.length}})
              </span>
              <comment-item
                v-for="(comment, i) in (trackComments)"
                :key="i"
                :commentData="comment"
              />
              <p v-if="!trackComments || trackComments.length === 0">
                No
                Items
                Found
              </p>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex';
import CommentItem from '~/components/CommentItem';
import TrackItemRow from '~/components/TrackItemRow';
import Player from '~/components/Player';
import numberSeparator from '~/utils/number';
import API from '~/utils/xhrWrapper';

export default {
  async asyncData({ params: { id } }) {
    const trackDetails = await API({
      method: 'get',
      url: `tracks/${id}`,
      query: {},
    });
    const trackComments = await API({
      method: 'get',
      url: `tracks/${id}/comments`,
      query: {},
    });
    const userTracks = await API({
      method: 'get',
      url: `users/${trackDetails.user.id}/tracks`,
      query: {},
    });
    return {
      trackDetails: trackDetails,
      trackComments: trackComments.sort((a, b) => a.timestamp - b.timestamp),
      userTracks: userTracks,
    };
  },
  computed: {
    ...mapGetters({
      playerCurrentTrack: 'player/playerCurrentTrack',
    }),
  },
  components: {
    CommentItem,
    TrackItemRow,
    Player,
  },
  methods: {
    handlePlayTrack(trackData) {
      setTimeout(() => {
        if (!this.playerCurrentTrack || (this.playerCurrentTrack.id !== trackData.id)) {
          this.$store.dispatch('player/setPlayerCurrentTrack', trackData);
        } else if (this.playerCurrentTrack && !this.isPlay && (this.playerCurrentTrack.id === trackData.id)) {
          this.$store.dispatch('player/play');
        }
      }, 100);
    },
    numberSeparator,
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
  .mainTrackWrapper {
    margin: 10px 0 0;
    width: 100%;
    display: flex;
  }
  .mainTrackWrapper > div {
    width: 100%;
    margin-bottom: 10px;
  }
  .tabsWrapper {
    margin: 20px 0 !important;
    background: #fff;
  }
  @media only screen and (max-width: 420px) {
    .mainTrackWrapper {
      margin: 0;
    }
    
    .tabsWrapper {
      margin: 0 !important;
    }
  }
</style>

<style>
  @media only screen and (max-width: 500px) {
    .container .el-card__body {
      padding: 10px !important;
    }
  }
</style>
