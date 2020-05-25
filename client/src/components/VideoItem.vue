<template>
  <div class="video-item-container">
    <div class="video-item">
      <div class="video">
        <router-link :to="{name:'watch', params:{id: video._id, video:video}}"><video width="100%" :src="`http://localhost:5000/${video.filePath}`"></video></router-link>
      </div>
      <a-row type="flex" justify="space-between">
        <a-col :span="4">
          <a-avatar :src="video.author.image"></a-avatar>
        </a-col>
        <a-col :span="20">
          <router-link :to="{name:'watch', params:{id: video._id, video:video}}"><h4 :title="video.title">
            {{video.title.substring(0,60)}}
            <span v-if="video.title.length > 60">...</span>
          </h4></router-link>
          <p>{{video.author.name}}</p>
          <p>
            <span>{{video.view}} views</span> -
            <span>{{ video.createdAt | moment("from", "now", true) }} ago</span>
          </p>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "video-item",
  props: ["video"]
};
</script>

<style lang="less" scoped>
.video-item-container {
  width: 100%;
  .video-item {
      cursor: pointer;
    .video {
      min-height: 100px;
      margin-bottom: 1rem;
    }
  }
}
</style>