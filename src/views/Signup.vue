<template>
  <form
    class="column"
    @submit.prevent="submit"
  >
    <label
      class="signup-label-layout"
      for="email"
    >
      Email
    </label>
    <input
      v-model="$v.email.$model"
      class="signup-input-layout"
      name="email"
      type="email"
    >
    <template v-if="$v.email.$error">
      <div
        v-if="!$v.email.required"
        class="validation-error signup-error-layout"
      >
        This field is required.
      </div>
      <div
        v-if="!$v.email.email"
        class="validation-error signup-error-layout"
      >
        Please enter a valid email.
      </div>
    </template>
    <label
      class="signup-label-layout"
      for="username"
    >
      Username
    </label>
    <input
      v-model="$v.username.$model"
      class="signup-input-layout"
      name="username"
      type="text"
    >
    <template v-if="$v.username.$error">
      <div
        v-if="!$v.username.required"
        class="validation-error signup-error-layout"
      >
        This field is required.
      </div>
      <div
        v-if="!$v.username.alphaNum"
        class="validation-error signup-error-layout"
      >
        Please enter a valid username.
      </div>
    </template>
    <label
      class="signup-label-layout"
      for="password"
    >
      Password
    </label>
    <input
      v-model="$v.password.$model"
      class="signup-input-layout"
      name="password"
      type="password"
    >
    <template v-if="$v.password.$error">
      <div
        v-if="!$v.password.required"
        class="validation-error signup-error-layout"
      >
        This field is required.
      </div>
      <div
        v-if="!$v.password.minLength"
        class="validation-error signup-error-layout"
      >
        At least 8 characters are required.
      </div>
    </template>
    <input
      class="signup-submit-layout"
      type="submit"
      value="Sign Up"
    >
    <div
      v-if="error !== null"
      class="submition-error signup-error-layout"
    >
      {{ error.message }}
    </div>
  </form>
</template>

<script>
import {
  alphaNum, email, minLength, required,
} from 'vuelidate/lib/validators';

export default {
  name: 'Signup',
  data() {
    return {
      email: '',
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
        // eslint-disable-next-line no-shadow
        const { email, username, password } = this.$data;
        await this.$store.dispatch('signUp', { email, username, password });
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
    email: {
      required,
      email,
    },
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
.signup-label-layout {
  width: 256px;
  margin: 16px 0 4px 0;
}

.signup-input-layout {
  width: 256px;
  margin: 0 0 4px 0;
}

.signup-error-layout {
  width: 256px;
  margin: 4px 0 0 0;
}

.signup-submit-layout {
  width: 128px;
  margin: 32px 0 8px 0;
}
</style>
