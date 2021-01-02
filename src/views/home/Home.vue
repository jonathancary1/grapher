<template>
  <div id="home">
    <header class="header">
      <div class="title">
        Grapher
      </div>
    </header>
    <Login v-if="state === 'LOGIN'" class="form" @submit="login"/>
    <Signup v-if="state === 'SIGNUP'" class="form" @submit="signup"/>
    <footer class="footer">
      <div v-if="message" class="message">
        A verification email has been sent.
      </div>
      <hr class="hr">
      <input class="button" type="button" :value="value" @click="button"/>
    </footer>
  </div>
</template>

<script>
import Login from './Login.vue';
import Signup from './Signup.vue';

export default {
  name: 'Home',
  components: {
    Login,
    Signup,
  },
  data() {
    return {
      state: 'LOGIN',
      message: false,
    };
  },
  computed: {
    value() {
      switch (this.$data.state) {
        case 'LOGIN':
          return 'Sign Up';
        case 'SIGNUP':
          return 'Log In';
        default:
          return '';
      }
    },
  },
  methods: {
    login() {
      this.$router.push({ name: 'Account' });
    },
    signup() {
      this.$data.state = 'LOGIN';
      this.$data.message = true;
    },
    button() {
      switch (this.$data.state) {
        case 'LOGIN':
          this.$data.state = 'SIGNUP';
          this.$data.message = false;
          break;
        case 'SIGNUP':
          this.$data.state = 'LOGIN';
          this.$data.message = false;
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#home {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 128px 1fr 128px;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
}

.form {
  padding: 32px;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.message {
  margin: 16px 0 0 0;
}

.hr {
  width: 196px;
  margin: 0 0 32px 0;
}

.button {
  width: 128px;
}
</style>
