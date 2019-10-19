<template>
  <el-card shadow="never" class="userCard commentItemWrapper">
    <div class="cardWrapper">
      <router-link class="username" :to="`/users/${commentData.user.id}`">
        <img :src="commentData.user.avatar_url" :alt="commentData.user.username" class="avatar" />
      </router-link>
      <div class="detailsWrapper">
        <p class="body">
          {{commentData.body}}
        </p>
      </div>
      <span class="timestamp">{{secondsToTime(Math.floor(commentData.timestamp
                              /
                              1000))}}</span>
    </div>
  </el-card>
</template>

<script>
import numberSeparator from '~/utils/number';
import secondsToTime from '~/utils/secondsToTime';

export default {
  props: ['commentData'],
  methods: {
    numberSeparator,
    secondsToTime,
  },
};
</script>

<style scoped>
  .cardWrapper {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    position: relative;
    padding-right: 60px;
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-top: 3px;
    background-color: #eee;
  }
  .detailsWrapper {
    margin-left: 10px;
  }
  .detailsWrapper > * {
    display: block;
    text-align: left;
  }
  .detailsWrapper > .user {
    font-size: 12px;
    color: #b5b9be;
  }
  .detailsWrapper > .body {
    font-size: 16px;
    word-break: break-word;
    word-wrap: break-word;
    width: 100%;
    margin: 12px 0 0 5px;
  }
  .timestamp {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 14px;
    font-weight: bold;
  }
  @media only screen and (max-width: 600px) {
    .avatar {
      width: 30px;
      height: 30px;
    }
    
    .detailsWrapper > .body {
      font-size: 14px;
      margin: 5px 0 0 5px;
    }
    
    .timestamp {
      font-size: 12px;
    }
    
    .cardWrapper {
      padding-right: 40px;
    }
    
    .timestamp {
      top: 10px;
    }
  }
</style>

<style>
  .commentItemWrapper .el-card {
    border: none;
    border-bottom: 1px solid #ebeef5;
  }
  .commentItemWrapper .el-card:last-child {
    border: none;
  }
  .commentItemWrapper .userCard .el-card__body {
    padding: 8px;
  }
</style>
