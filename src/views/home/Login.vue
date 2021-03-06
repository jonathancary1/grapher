<template>
  <form id="login" @submit.prevent="submit">
    <label class="label" for="username">
      Username
    </label>
    <input
      class="field"
      name="username"
      type="text"
      v-model="$v.username.$model"
    >
    <div class="error">
      {{ message('username') }}
    </div>
    <label class="label" for="password">
      Password
    </label>
    <input
      class="field"
      name="password"
      type="password"
      v-model="$v.password.$model"
    >
    <div class="error">
      {{ message('password') }}
    </div>
    <input class="button" type="submit" value="Log In">
    <div v-if="error !== null" class="message">
      {{ error.message }}
    </div>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate';
import * as validators from 'vuelidate/lib/validators';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      error: null,
    };
  },
  mixins: [
    validationMixin,
  ],
  methods: {
    message(field) {
      const messages = {
        username: {
          required: 'This field is required.',
          alphaNum: 'Please enter a valid username.',
        },
        password: {
          required: 'This field is required.',
          minLength: 'At least 8 characters are required.',
        },
      };
      if (this.$v[field].$error) {
        for (const key of Object.keys(this.$v[field].$params)) {
          if (this.$v[field][key] === false) {
            return messages[field][key];
          }
        }
      }
      return '';
    },
    async submit() {
      this.error = null;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      try {
        await this.$store.dispatch('logIn', {
          username: this.username,
          password: this.password,
        });
        this.$emit('submit');
      } catch (error) {
        this.error = error;
      } finally {
        this.password = '';
        this.$v.password.$reset();
      }
    },
  },
  validations: {
    username: {
      required: validators.required,
      alphaNum: validators.alphaNum,
    },
    password: {
      required: validators.required,
      minLength: validators.minLength(8),
    },
  },
};
</script>

<style lang="scss" scoped>
#login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.label {
  width: 256px;
  margin: 0 0 4px 0;
}

.field {
  width: 262px;
  margin: 0 0 4px 0;
}

.error {
  width: 256px;
  margin: 0 0 16px 0;
}

.button {
  width: 128px;
  margin: 22px 0 0 0;
}

.message {
  margin: 56px 0 0 0;
}
</style>
