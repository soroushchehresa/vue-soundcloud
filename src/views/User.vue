<template>
  <div>
    <el-row>
      <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="16" class="pageWrapper">
        <el-row :gutter="15">
          <el-col :span="18">
            <el-card shadow="always" class="mainUserCardWrapper">
              <h1 v-if="getUserProfileLoading">Loading...</h1>
              <div v-if="userProfileData && !getUserProfileLoading">
                <img
                  :src="userProfileData.avatar_url"
                  :alt="userProfileData.username"
                  class="avatar"
                />
                <h3>{{userProfileData.username}}</h3>
                <div class="otherDetailsWrapper">
                  <p><i class="el-icon-location"></i> {{userProfileData.country || 'Earth'}}</p>
                  <p>{{userProfileData.followers_count}} Followers</p>
                  <el-tooltip
                    effect="dark"
                    :content="userProfileData.website_title"
                    placement="top"
                  >
                    <a target="_blank" :href="userProfileData.website">Website</a>
                  </el-tooltip>
                </div>
                <p class="description" v-html="userProfileData.description"></p>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6" class="followingWrapper">
            <h3 v-if="getUserFollowingsLoading">Loading...</h3>
            <h3 v-if="!getUserFollowingsLoading">
              Following {{userFollowingsData && userFollowingsData.length}} Users
            </h3>
            <user-item
              v-if="!getUserFollowingsLoading"
              v-for="(user, i) in userFollowingsData"
              :key="i"
              :userData="user"
            />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UserItem from '../components/UserItem';

export default {
  data() {
    return {};
  },
  mounted() {
    const userID = this.$route.params.id;
    this.$store.dispatch('getUserProfile', userID);
    this.$store.dispatch('getUserFollowings', userID);
  },
  components: {
    UserItem,
  },
  watch: {
    $route({ params: { id: newUserID } }, { params: { id: oldUserID } }) {
      if (newUserID !== oldUserID) {
        this.$store.dispatch('getUserProfile', newUserID);
        this.$store.dispatch('getUserFollowings', newUserID);
      }
    },
  },
  computed: {
    ...mapGetters({
      getUserProfileLoading: 'getUserProfileLoading',
      userProfileData: 'userProfileData',
      userProfileFail: 'userProfileFail',
      getUserFollowingsLoading: 'getUserFollowingsLoading',
      userFollowingsData: 'userFollowingsData',
      userFollowingsFail: 'userFollowingsFail',
    }),
  },
  methods: {},
};
</script>

<style scoped>
  .pageWrapper {
    margin: 0 auto;
    float: none;
  }
  .followingWrapper {
    background: #fff;
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
</style>
