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
      class="signup-input-layout"
      name="email"
      type="email"
      v-model="$v.email.$model"
    >
    <template v-if="$v.email.$error">
      <div
        class="validation-error signup-error-layout"
        v-if='!$v.email.required'
      >
        This field is required.
      </div>
      <div
        class="validation-error signup-error-layout"
        v-if='!$v.email.email'
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
      class="signup-input-layout"
      name="username"
      type="text"
      v-model="$v.username.$model"
    >
    <template v-if="$v.username.$error">
      <div
        class="validation-error signup-error-layout"
        v-if='!$v.username.required'
      >
        This field is required.
      </div>
      <div
        class="validation-error signup-error-layout"
        v-if='!$v.username.alphaNum'
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
      class="signup-input-layout"
      name="password"
      type="password"
      v-model="$v.password.$model"
    >
    <template v-if="$v.password.$error">
      <div
        class="validation-error signup-error-layout"
        v-if='!$v.password.required'
      >
        This field is required.
      </div>
      <div
        class="validation-error signup-error-layout"
        v-if='!$v.password.minLength'
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
      class="submition-error signup-error-layout"
      v-if="error !== null"
    >
      {{ error.message }}
    </div>
  </form>
</template>

<script>
import {
  alphaNum,
  email,
  minLength,
  required
} from 'vuelidate/lib/validators';

import {
  CognitoUserAttribute,
  CognitoUserPool
} from 'amazon-cognito-identity-js';

export default {
  name: 'Signup',
  data() {
    return { email: '', username: '', password: '', error: null };
  },
  methods: {
    submit() {
      this.$data.error = null;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      const userPool = new CognitoUserPool({
        UserPoolId: 'ap-northeast-1_cCS5gSeUQ',
        ClientId: '6uepkp04av1if5mrjhndsh59aa'
      });
      const attributes = [
        new CognitoUserAttribute({ Name: 'email', Value: this.$data.email })
      ];
      userPool.signUp(this.$data.username, this.$data.password, attributes, null, (error, result) => {
        this.$data.password = '';
        this.$v.password.$reset();
        if (error) {
          this.$data.error = error;
        } else {
          this.$emit('submit', result);
        }
      });
    }
  },
  validations: {
    email: {
      required,
      email
    },
    username: {
      required,
      alphaNum
    },
    password: {
      required,
      minLength: minLength(8)
    }
  }
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
