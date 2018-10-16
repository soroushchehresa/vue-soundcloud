<template>
  <el-card shadow="never" class="userCard">
    <div class="cardWrapper">
      <div class="userDetails">
        <img :src="userData.avatar_url" :alt="userData.username" class="avatar" />
        <div class="usernameWrapper">
          <router-link class="username" :to="`/users/${userData.id}`">
            {{userData.username}}
          </router-link>
          <p class="location">
            <font-awesome-icon icon="map-marker-alt" />
            {{userData.country || 'Earth'}}
          </p>
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
    width: 40px;
    border-radius: 20px;
  }
  .userDetails .usernameWrapper {
    margin-left: 10px;
    text-align: left;
  }
  .userDetails .usernameWrapper .username {
    margin: 0;
    font-size: 13px;
  }
  .userDetails .usernameWrapper .location {
    margin: 0;
    font-size: 12px;
    color: #a1a1a1;
  }
  .userDetails .usernameWrapper .location > svg {
    margin-right: 3px;
  }
  .followers {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #a1a1a1;
    font-size: 12px;
  }
  .followers > p {
    margin: 0;
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
    padding: 8px;
  }
</style>
