<template>
  <div id="nav-bar">
    <a-row type="flex" justify="space-around" align="middle">
      <a-col :span="8">
        <router-link :to="{ name: 'home' }" class="logo">
          <a-icon type="youtube" theme="filled" class="logo-icon" />
          <span class="brand-name" style="line-height: 2rem">MeTuBe</span>
        </router-link>
      </a-col>
      <a-col :span="8">
        <a-input-search placeholder="Search" @search="handleSearch" enterButton :loading="loading"></a-input-search>
      </a-col>
      <a-col :span="8">
        <a-row type="flex" justify="end" align="middle">
          <router-link :to="{ name: 'register' }" v-if="!this.$store.state.auth.isAuthenticated">
            <a-button class="btn">Register</a-button>
          </router-link>
          <router-link :to="{ name: 'login' }" v-if="!this.$store.state.auth.isAuthenticated">
            <a-button class="btn">Login</a-button>
          </router-link>
          <router-link :to="{ name: 'upload-video' }">
            <a-button class="btn" v-if="this.$store.state.auth.isAuthenticated">
              <a-icon type="upload" />Upload
            </a-button>
          </router-link>
          <a-button v-if="this.$store.state.auth.isAuthenticated" @click="handleLogout">Logout</a-button>
          <a-avatar
            v-if="this.$store.state.auth.isAuthenticated && getCurrentUser"
            class="btn"
            :src="getCurrentUser.image"
          />
          <span
            class="user-name"
            v-if="this.$store.state.auth.isAuthenticated && getCurrentUser"
            v-text="getCurrentUser.name"
          ></span>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "nav-bar",
  data() {
    return {
      searchTerm: null,
      loading: false
    };
  },
  methods: {
    handleSearch() {
      this.loading = true;
      console.log(this.searchTerm);
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    handleLogout() {
      this.$store.dispatch("logout");
      // delete token from local storage

      window.localStorage.removeItem("youtube_clone_token");
      // change route to login page
      this.$router.push({ name: "login" });
    }
  },
  computed: {
    ...mapGetters(["getCurrentUser"])
  }
};
</script>

<style lang="less" scoped>
#nav-bar {
  width: 100%;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 999;
  box-shadow: 0px 1px 5px 0px rgba(214,214,214,.5);
  .btn {
    margin: 0 0.5rem;
  }
  .logo {
    color: #333;
    display: flex;
    align-items: center;
    .logo-icon {
      color: red;
      font-size: 2rem;
      margin-right: 1rem;
    }
    .brand-name {
      font-size: 1.5rem;
      font-weight: 600;
    }
  }
}
</style>
