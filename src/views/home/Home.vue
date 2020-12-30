<template>
  <div class="column">
    <header class="title home-header-layout">
      Grapher
    </header>
    <Login
      v-if="state === 'LOGIN'"
      @submit="login"
    />
    <Signup
      v-if="state === 'SIGNUP'"
      @submit="signup"
    />
    <div
      v-if="verification"
      class="home-verification-layout"
    >
      A verification email has been sent.
    </div>
    <hr
      class="home-hr-layout"
    >
    <input
      class="home-button-layout"
      type="button"
      :value="value"
      @click="button"
    >
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
      verification: false,
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
      this.$data.verification = true;
    },
    button() {
      switch (this.$data.state) {
        case 'LOGIN':
          this.$data.state = 'SIGNUP';
          this.$data.verification = false;
          break;
        case 'SIGNUP':
          this.$data.state = 'LOGIN';
          this.$data.verification = false;
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style>
.home-header-layout {
  margin: 128px 0 64px 0;
}

.home-verification-layout {
  margin: 16px 0 0 0;
}

.home-hr-layout {
  width: 196px;
  margin: 64px 0 16px 0;
}

.home-button-layout {
  width: 128px;
  margin: 0 0 16px 0;
}
</style>
