<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import headerConfig from './store/headerConfig'
import axios from 'axios'
import Navbar from './components/Navbar'
  export default {
    name:'app',
    components: {
      Navbar,
    },
    computed: {
      ...mapGetters(['getToken'])
    },
    methods: {
      async loginByToken() {
      const token = this.$store.getters.getToken
         if (token) {
              try {
           const response = await axios.get('http://localhost:5000/api/auth/user', headerConfig(token))
           if (response) {
            //  console.log(response.data)
             this.$store.dispatch('login', response.data)
           }
         } catch(err) {
           console.log(err)
        }
         }      
      },
      setToken(){
        const token = window.localStorage.getItem('youtube_clone_token')
        if (token) {
          this.$store.dispatch('setToken', token)
        }
    
      }
    },

    mounted () {
      this.setToken()
      this.loginByToken();
      
    },
  }
</script>

<style lang="less" >
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>