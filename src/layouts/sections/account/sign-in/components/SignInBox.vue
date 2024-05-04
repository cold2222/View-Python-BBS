<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/useUserStore";

const user_input_id = ref("");
const user_input_password = ref("");
const userStore = useUserStore();

const signIn = () => {
  userStore.signInApi(user_input_id.value, user_input_password.value);
};
</script>

<template>
  <div class="login-form">
    <div class="login-header">
      <h2>Sign In</h2>
    </div>
    <form @submit.prevent="signIn">
      <div>
        <div class="form-group">
          <label for="user_id">Account</label>
          <input
            type="email"
            id="user_id"
            v-model="user_input_id"
            autocomplete="off"
            required
          />
        </div>
        <div class="form-group">
          <label for="user_password">Password</label>
          <input
            type="password"
            id="user_password"
            v-model="user_input_password"
            autocomplete="off"
            required
          />
        </div>
      </div>
      <button type="submit">Login</button>
    </form>
    <div class="sign-up">
      <p>If you want to create an account?</p>
      <router-link class="sign-up-link" :to="{ name: 'account-sign-up' }">
        Sign Up
      </router-link>
    </div>
    <div class="login-options">
      <p>Social Login</p>
      <div>
        <a
          class="login-link"
          href="https://accounts.google.com/o/oauth2/v2/auth?client_id=842719643276-n2lgjj1m3v2nu1jmpf1m3e7hmm83hmmj.apps.googleusercontent.com&redirect_uri=http://127.0.0.1:3000/sections/account/auth/google-login&response_type=code&scope=email profile"
        >
          <img src="/src/assets/img/googleIcon.png" alt="" />
        </a>
        <a
          class="login-link"
          href="https://kauth.kakao.com/oauth/authorize?client_id=7c6a297d0356f72890513ff0732820b0&redirect_uri=http://127.0.0.1:3000/sections/account/auth/kakao-login&response_type=code"
        >
          <img src="/src/assets/img/kakaoIcon.png" alt="" />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "./SignInBox.css";
</style>
