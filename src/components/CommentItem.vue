<template>
  <el-card shadow="never" class="userCard">
    <div class="cardWrapper">
      <div>
        <img :src="commentData.user.avatar_url" :alt="commentData.user.username" class="avatar" />
      </div>
      <div class="detailsWrapper">
        <p class="body">
          {{commentData.body}}
        </p>
        <span class="user">
          <router-link class="username" :to="`/users/${commentData.user.id}`">
            {{commentData.user.username}}
          </router-link>
        </span>
      </div>
      <span class="timestamp">
        {{secondsToTime(Math.floor(commentData.timestamp
        /
        1000))}}
      </span>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex';
import numberSeparator from '@/utils/number';
import secondsToTime from '@/utils/secondsToTime';

export default {
  computed: {
    ...mapGetters({
      activeTrack: 'activeTrack',
    }),
  },
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
    padding-right: 40px;
  }
  .avatar {
    width: 30px;
    height: 30px;
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
    margin: 0;
    font-size: 14px;
    word-break: break-word;
    word-wrap: break-word;
    width: 100%;
  }
  .timestamp {
    position: absolute;
    right: 0;
    top: 0;
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
    padding: 8px;
  }
</style>
