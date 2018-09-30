<template>
  <el-card shadow="never" class="userCard">
    <div class="cardWrapper">
      <div class="userDetails">
        <img :src="userData.avatar_url" :alt="userData.username" class="avatar" />
        <div class="usernameWrapper">
          <router-link class="username" :to="`/users/${userData.id}`">
            {{userData.username}}
          </router-link>
          <p class="location"><i class="el-icon-location"></i> {{userData.country || 'Earth'}}</p>
        </div>
      </div>
      <div class="followers">
        <p>{{userData.followers_count}}</p>
        <span>Followers</span>
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      activeTrack: 'activeTrack',
    }),
  },
  props: ['userData'],
};
</script>

<style scoped>
  .cardWrapper {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
  .userDetails {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .userDetails .avatar {
    width: 50px;
    border-radius: 30px;
  }
  .userDetails .usernameWrapper {
    margin-left: 10px;
    text-align: left;
  }
  .userDetails .usernameWrapper .username {
    margin: 0;
    font-size: 15px;
  }
  .userDetails .usernameWrapper .location {
    margin: 0;
    font-size: 13px;
    margin-top: 7px;
    color: #a1a1a1;
  }
  .followers {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .followers > * {
    margin: 0;
    font-size: 14px;
  }
  .followers > span {
    color: #a1a1a1;
    font-size: 12px;
  }
</style>

<style>
  .el-card {
    border: none;
    border-bottom: 1px solid #ebeef5;
  }
  .el-card:last-child {
    border: none;
  }
  .userCard .el-card__body {
    padding: 10px;
  }
</style>
