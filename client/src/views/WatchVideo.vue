<template>
    <div id="watch">
        <a-row>
          <a-col :span="18">
              <video v-if="video" :src="`http://localhost:5000/${video.filePath}`" autoplay controls width="100%" ></video>
              <h4>{{video.title}}</h4>
              <p><span>{{video.view}} views</span> - <span>{{ video.createdAt | moment("dddd, MMMM Do YYYY") }}</span></p>
          </a-col>
          <a-col :span="6"></a-col>
        </a-row>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name:'watch',
        data() {
            return {
                video: null
            }
        },
        methods: {
           async getOneVideo() {
               const id= this.$route.params.id
                try {
                    const response = await axios.get(`http://localhost:5000/api/video/${id}`)
                    if (response) {
                        this.video = response.data
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        },
        mounted () {
            this.getOneVideo()
        },
    }
</script>

<style lang="less" scoped>
#watch {
    margin: 5rem;
}
</style>