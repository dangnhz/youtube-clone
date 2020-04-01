<template>
  <div id="home">
    <div class="container">
      <a-row>
        <a-col :span="4">
          <!-- <MainMenu></MainMenu> -->
        </a-col>
        <a-col :span="20">Home</a-col>
      </a-row>
    </div>
    
  </div>
</template>

<script>
// import MainMenu from '../components/MainMenu'
  export default {
    name:'home',
    components: {
      // MainMenu
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
