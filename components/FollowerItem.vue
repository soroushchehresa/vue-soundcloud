<template>
  <el-card shadow="never" class="userCard followersItemWrapper">
    <div class="cardWrapper">
      <div class="userDetails">
        <router-link :to="`/users/${userData.id}`" class="avatarWrapper">
          <img :src="userData.avatar_url" :alt="userData.username" class="avatar" />
        </router-link>
        <div class="usernameWrapper">
          <router-link class="username" :to="`/users/${userData.id}`">
            {{userData.username}}
          </router-link>
          <p class="location">
            <font-awesome-icon icon="map-marker-alt" />
            {{userData.country
            ||
            'Earth'}}
          </p>
        </div>
      </div>
      <div class="followers">
        <span>{{numberSeparator(userData.followers_count)}}</span>
        Followers
      </div>
    </div>
  </el-card>
</template>

<script>
import numberSeparator from '~/utils/number';

export default {
  props: ['userData'],
  methods: {
    numberSeparator,
  },
};
</script>

<style scoped>
  .cardWrapper {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin: 10px 0;
  }
  .userDetails {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .userDetails .avatarWrapper {
    display: block;
    height: 40px;
  }
  .userDetails .avatarWrapper .avatar {
    width: 40px;
    border-radius: 20px;
  }
  .userDetails .usernameWrapper {
    margin-left: 10px;
    text-align: left;
  }
  .userDetails .usernameWrapper .username {
    margin: 0;
    font-size: 14px;
    text-decoration: navajowhite;
    color: #444;
    font-weight: bold;
  }
  .userDetails .usernameWrapper .location {
    margin: 0;
    font-size: 14px;
    color: #a1a1a1;
  }
  .userDetails .usernameWrapper .location > svg {
    margin-right: 3px;
  }
  .followers {
    display: flex;
    justify-content: center;
    color: #c3c3c3;
    font-size: 12px;
    align-items: center;
    flex-direction: row;
  }
  .followers span {
    color: #999;
    margin-right: 5px;
    font-size: 16px;
    font-weight: bold;
  }
  @media only screen and (max-width: 420px) {
    .userDetails .avatarWrapper .avatar {
      width: 35px;
    }
    
    .userDetails .usernameWrapper .username {
      font-size: 12px;
    }
    
    .userDetails .usernameWrapper .location[data-v-26b1eeac] {
      margin: 0;
      font-size: 12px;
    }
    
    .followers span {
      color: #999;
      margin-right: 5px;
      font-size: 12px;
    }
  }
</style>

<style>
  .followersItemWrapper.el-card {
    border: none;
    border-bottom: 1px solid #ebeef5;
  }
  .followersItemWrapper.el-card:last-child {
    border: none;
  }
  .followersItemWrapper .el-card__body {
    padding: 8px;
  }
</style>
