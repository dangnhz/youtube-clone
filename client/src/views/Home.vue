<template>
  <div id="home">
    <div class="container">
      <a-row>
        <a-col :span="4">
          <!-- <MainMenu></MainMenu> -->
        </a-col>
        <a-col :span="20">
          <VideoListing :videos="videos"></VideoListing>
        </a-col>
      </a-row>
    </div>
    
  </div>
</template>

<script>
// import MainMenu from '../components/MainMenu'
import VideoListing from '../components/VideoListing'
import axios from 'axios'
  export default {
    name:'home',
    data() {
      return {
        videos: []
      }
    },
    components: {
      VideoListing
    },
    methods: {
      async loadContent() {
             try {
              const response = await axios.get('http://localhost:5000/api/video')
              if (response) {
                this.videos = response.data.videos
              }
           } catch (err) {
             console.log(err)
           }
          
      }
    },
    mounted () {
      this.loadContent()
    },
  }
</script>

<style lang="less" scoped>
.container {
  position: relative;
  height: 100vh;
  width: 100%;
  padding: 100px;
}
</style>
