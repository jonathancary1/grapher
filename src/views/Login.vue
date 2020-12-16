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
      class="login-input-layout"
      name="username"
      type="text"
      v-model="$v.username.$model"
    >
    <template v-if="$v.username.$error">
      <div
        class="validation-error login-error-layout"
        v-if='!$v.username.required'
      >
        This field is required.
      </div>
      <div
        class="validation-error login-error-layout"
        v-if='!$v.username.alphaNum'
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
      class="login-input-layout"
      name="password"
      type="password"
      v-model="$v.password.$model"
    >
    <template v-if="$v.password.$error">
      <div
        class="validation-error login-error-layout"
        v-if='!$v.password.required'
      >
        This field is required.
      </div>
      <div
        class="validation-error login-error-layout"
        v-if='!$v.password.minLength'
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
      class="submition-error login-error-layout"
      v-if="error !== null"
    >
      {{ error.message }}
    </div>
  </form>
</template>

<script>
import {
  alphaNum,
  minLength,
  required
} from 'vuelidate/lib/validators';

import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool
} from 'amazon-cognito-identity-js';

export default {
  name: 'Login',
  data() {
    return { username: '', password: '', error: null };
  },
  methods: {
    submit() {
      this.$data.error = null;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return
      }
      const authenticationDetails = new AuthenticationDetails({
        Username: this.$data.username,
        Password: this.$data.password
      });
      const userPool = new CognitoUserPool({
        UserPoolId: 'ap-northeast-1_cCS5gSeUQ',
        ClientId: '6uepkp04av1if5mrjhndsh59aa'
      });
      const cognitoUser = new CognitoUser({
        Username: this.$data.username,
        Pool: userPool
      });
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          this.$data.password = '';
          this.$v.password.$reset();
          this.$emit('submit', result.getAccessToken().getJwtToken());
        },
        onFailure: (error) => {
          this.$data.password = '';
          this.$v.password.$reset();
          this.$data.error = error;
        }
      });
    }
  },
  validations: {
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
