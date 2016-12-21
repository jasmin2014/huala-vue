<template>
  <div>
    <mt-field label="邮箱" placeholder="请输入邮箱" type="text" :value.sync="username"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" :value.sync="password"></mt-field>
    <mt-button type="primary" @click="login()" size="large">登录</mt-button>
  </div>
</template>
<style>

</style>
<script>
  export default {
    data(){
      return {
        username: '',
        password: '',
        index: 0
      }
    },
    methods: {
      login () {
        let self=this;
        this.$http.post("/sys/login", {'username': this.username, 'password': this.password})
          .then(function (response) {
            var a = typeof response.data;
            var j = (a === 'object' ? response.data : JSON.parse(response.data.toString()));
            if (j.success) {
              window.localStorage.setItem("token", j.token);
              self.$route.router.go('/');
            } else {
              alert(j.message);
            }
          });
      }
    }
  }
</script>
