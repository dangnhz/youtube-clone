<template>
  <div id="home">
    <div class="container">
      <a-row>
        <a-col :span="4">
          <!-- <MainMenu></MainMenu> -->
        </a-col>
        <a-col :span="20">{{msg}}</a-col>
      </a-row>
    </div>
    
  </div>
</template>

<script>
// import MainMenu from '../components/MainMenu'
import axios from 'axios'
  export default {
    name:'home',
    data() {
      return {
        msg: ''
      }
    },
    components: {
      // MainMenu
    },
    methods: {
      async loadContent() {
        const token = this.$store.getters.getToken
        const config = {
          headers: {
            "Content-type" : "application/json"
          }
        }
        config.headers['x-auth-token'] = token
          if(token) {
             try {
              const response = await axios.get('http://localhost:5000/', config)
              if (response) {
                this.msg = response.data.msg
              }
           } catch (err) {
             console.log(err)
           }
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
  padding-top: 100px;
}
</style>
