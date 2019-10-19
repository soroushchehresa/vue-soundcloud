<template>
  <el-row>
    <el-col :xs="24" :sm="20" :md="16" :lg="14" :xl="12" class="container">
      <el-row>
        <el-card shadow="always" class="mainUserCardWrapper">
          <div v-if="profileDetails">
            <img
              :src="profileDetails.avatar_url"
              :alt="profileDetails.username"
              class="avatar"
            />
            <h3 class="title">
              {{profileDetails.username}}
            </h3>
            <div class="otherDetailsWrapper">
              <p>
                <font-awesome-icon icon="map-marker-alt" />
                {{profileDetails.country
                ||
                'Earth'}}
              </p>
              <p>
                <font-awesome-icon icon="users" />
                {{numberSeparator(profileDetails.followers_count)}}
              </p>
              <a target="_blank" :href="profileDetails.website">
                <font-awesome-icon icon="globe" />
                {{profileDetails.website_title}}
              </a>
            </div>
            <p class="description" v-html="profileDetails.description"></p>
          </div>
        </el-card>
      </el-row>
      <el-row :class="`tabsWrapper${playerCurrentTrack ? ' playerOpened' : ''}`">
        <el-card shadow="always">
          <el-tabs>
            <el-tab-pane>
              <span slot="label">
                Tracks
              </span>
              <track-item-row
                v-if="userTracks && (userTracks.length > 0)"
                v-for="(track, i) in userTracks"
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
                Followings
                ({{followingItems.length}})
              </span>
              <follower-item
                v-for="(user, i) in followingItems"
                :key="i"
                :userData="user"
              />
              <p v-if="!followingItems || followingItems.length === 0">
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
import FollowerItem from '@/components/FollowerItem';
import TrackItemRow from '@/components/TrackItemRow';
import Player from '@/components/Player';
import numberSeparator from '@/utils/number';
import API from '~/utils/xhrWrapper';

export default {
  async asyncData({ params: { id } }) {
    const userProfileDetails = await API({
      method: 'get',
      url: `users/${id}`,
      query: {},
    });
    const userFollowings = await API({
      method: 'get',
      url: `users/${id}/followings`,
      query: {},
    });
    const userTracks = await API({
      method: 'get',
      url: `users/${id}/tracks`,
      query: {},
    });
    return {
      profileDetails: userProfileDetails,
      followingItems: userFollowings.collection,
      userTracks: userTracks,
    };
  },
  components: {
    FollowerItem,
    TrackItemRow,
    Player,
  },
  computed: {
    ...mapGetters({
      playerCurrentTrack: 'player/playerCurrentTrack',
      isPlay: 'player/isPlay',
    }),
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
  .mainUserCardWrapper {
    margin: 10px 0;
  }
  .mainUserCardWrapper .avatar {
    border-radius: 50px;
  }
  .mainUserCardWrapper .title {
    font-size: 25px;
    margin: 10px 0 0;
  }
  .mainUserCardWrapper .otherDetailsWrapper {
    text-align: center;
  }
  .mainUserCardWrapper .otherDetailsWrapper > * {
    display: inline-block;
    margin: 20px 15px;
    color: #a1a1a1;
  }
  .mainUserCardWrapper .otherDetailsWrapper > * > svg {
    margin-right: 5px;
  }
  .description {
    font-size: 14px;
  }
  .followingsWrapper > div {
    height: calc(100vh - 20px);
    position: fixed;
    right: 175px;
    width: 340px;
    top: 77px;
  }
  .tabsWrapper {
    margin: 20px 0 !important;
    background: #fff;
  }
  @media only screen and (max-width: 500px) {
    .mainTrackWrapper {
      margin: 0;
    }
    
    .tabsWrapper {
      margin: 0 !important;
    }
    
    .mainUserCardWrapper {
      margin: 0 0 10px;
    }
    
    .mainUserCardWrapper .title {
      font-size: 20px;
    }
    
    .mainUserCardWrapper .avatar {
      width: 80px;
    }
    
    .mainUserCardWrapper .otherDetailsWrapper > * {
      font-size: 14px;
      margin: 20px 8px;
    }
    
    .description {
      font-size: 12px;
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
