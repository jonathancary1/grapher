<template>
  <form id="signup" @submit.prevent="submit">
    <label class="label" for="email">
      Email
    </label>
    <input
      class="field"
      name="email"
      type="email"
      v-model="$v.email.$model"
    >
    <div class="error">
      {{ message('email') }}
    </div>
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
    <input class="button" type="submit" value="Sign Up">
    <div v-if="error !== null" class="message">
      {{ error.message }}
    </div>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate';
import * as validators from 'vuelidate/lib/validators';

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
  mixins: [
    validationMixin,
  ],
  methods: {
    message(field) {
      const messages = {
        email: {
          required: 'This field is required.',
          email: 'Please enter a valid email.',
        },
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
      this.$data.error = null;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      try {
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
      required: validators.required,
      email: validators.email,
    },
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
#signup {
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
