<template>
  <a-row id="register" type="flex" justify="center">
    <a-col class="container" :xs="{ span: 23 }" :md="{span:8}" :lg="{ span: 6 }">
      <div class="title"><h1>Register</h1></div>
      <div class="error" v-if="error">
        <a-alert type="error" :message="error" banner />
      </div>
      <a-form  @submit="handleSubmit">
        <a-form-item label="* Name">
          <a-input v-model="name" placeholder="Please input your name" type="text" required ></a-input>
        </a-form-item>
        <a-form-item label="* Email">
          <a-input  v-model="email" autocomplete="off" placeholder="Please enter your email" type="email" required ></a-input>
        </a-form-item>
        <a-form-item label="* Password">
          <a-input v-model="password" autocomplete="off" placeholder="Please enter your password" type="password" required ></a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" :loading="isLoading">Register</a-button>
        </a-form-item>
      </a-form>

    </a-col>
  </a-row>
</template>
<script>
import axios from 'axios'
export default {
  name: "register",
  data() {
    return {
      isLoading: false,
      name: '',
      email:'',
      password:'',
      error:null
  }
  },
  methods: {
      async handleSubmit() {
      this.isLoading = true;
      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {name: this.name, email: this.email, password: this.password})
        if ( response ) {
          this.isLoading = false
          this.$store.dispatch('setUser', response.data.user)
          this.$router.push({name:'register-success'})
        }
      } catch (error) {
        // Error 
    if (error.response) {
        this.isLoading = false;
        this.error = error.response.data.error
        console.log(error.response.data);
        setTimeout(() => {
          this.error = null
        }, 5000)
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log('Error', error.message);
    }
    console.log(error);
      }

    }
  }
  
};
</script>
<style lang="less" scoped>

#register {
  position: relative;
  height: 100vh;
  .container {
    margin-top: 10rem;
  }

}
</style>