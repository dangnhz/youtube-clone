<template>
  <a-row id="login" type="flex" justify="center">
    <a-col
      class="container"
      :xs="{ span: 23 }"
      :md="{ span: 8 }"
      :lg="{ span: 6 }"
    >
      <div class="title"><h1>Login</h1></div>
      <div class="error" v-if="error">
        <a-alert type="error" :message="error" banner />
      </div>
      <a-form @submit="handleSubmit">
        <a-form-item label="* Email">
          <a-input
            v-model="email"
            autocomplete="on"
            placeholder="Please enter your email"
            type="email"
            required
          ></a-input>
        </a-form-item>
        <a-form-item label="* Password">
          <a-input
            v-model="password"
            autocomplete="on"
            placeholder="Please enter your password"
            type="password"
            required
          ></a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" :loading="isLoading"
            >Login</a-button
          >
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>
<script>
import axios from "axios";
export default {
  name: "register",
  data() {
    return {
      email: "",
      password: "",
      comfirmPassword: "",
      isLoading: false,
      error: null
    };
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true;
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          { email: this.email, password: this.password }
        );
        if (response) {
          this.isLoading = false;
          // store token in local storage
          window.localStorage.setItem(
            "youtube_clone_token",
            response.data.token
          );
          this.$store.dispatch('login', response.data)
          this.$router.push({ name: "home" });
        }
      } catch (error) {
        // Error
        if (error.response) {
          this.isLoading = false;
          this.error = error.response.data.error;
          console.log(error.response.data);
          setTimeout(() => {
            this.error = null;
          }, 5000);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error);
      }
    }
  },
  mounted () {
    // console.log(this.$store.state.account.user)
  },
};
</script>
<style lang="less" scoped>
#login {
  position: relative;
  height: 100vh;
  .container {
    margin-top: 10rem;
  }
}
</style>
