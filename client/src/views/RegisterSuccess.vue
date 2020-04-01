<template>
    <div id="register-success">
            <a-alert
            message="Success"
            description="Your account has been created."
            type="success"
            showIcon
    />
    <br>
            <a-button><router-link :to="{name:'login'}">Go to Login</router-link></a-button>
    </div>
</template>

<script>
    export default {
        name: 'register-success'
    }
</script>

<style lang="less" scoped>
#register-success {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

</style>