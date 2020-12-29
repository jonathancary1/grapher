<template>
  <form
    class="column"
    @submit.prevent="submit"
  >
    <label
      class="login-label-layout"
      for="username"
    >
      Username
    </label>
    <input
      v-model="$v.username.$model"
      class="login-input-layout"
      name="username"
      type="text"
    >
    <template v-if="$v.username.$error">
      <div
        v-if="!$v.username.required"
        class="validation-error login-error-layout"
      >
        This field is required.
      </div>
      <div
        v-if="!$v.username.alphaNum"
        class="validation-error login-error-layout"
      >
        Please enter a valid username.
      </div>
    </template>
    <label
      class="login-label-layout"
      for="password"
    >
      Password
    </label>
    <input
      v-model="$v.password.$model"
      class="login-input-layout"
      name="password"
      type="password"
    >
    <template v-if="$v.password.$error">
      <div
        v-if="!$v.password.required"
        class="validation-error login-error-layout"
      >
        This field is required.
      </div>
      <div
        v-if="!$v.password.minLength"
        class="validation-error login-error-layout"
      >
        At least 8 characters are required.
      </div>
    </template>
    <input
      class="login-submit-layout"
      type="submit"
      value="Log In"
    >
    <div
      v-if="error !== null"
      class="submition-error login-error-layout"
    >
      {{ error.message }}
    </div>
  </form>
</template>

<script>
import { alphaNum, minLength, required } from 'vuelidate/lib/validators';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async submit() {
      this.$data.error = null;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      try {
        const { username, password } = this.$data;
        await this.$store.dispatch('logIn', { username, password });
        this.$emit('submit');
      } catch (error) {
        this.$data.error = error;
      } finally {
        this.$data.password = '';
        this.$v.password.$reset();
      }
    },
  },
  validations: {
    username: {
      required,
      alphaNum,
    },
    password: {
      required,
      minLength: minLength(8),
    },
  },
};
</script>

<style>
.login-label-layout {
  width: 256px;
  margin: 16px 0 4px 0;
}

.login-input-layout {
  width: 256px;
  margin: 0 0 4px 0;
}

.login-error-layout {
  width: 256px;
  margin: 4px 0 0 0;
}

.login-submit-layout {
  width: 128px;
  margin: 32px 0 8px 0;
}
</style>
