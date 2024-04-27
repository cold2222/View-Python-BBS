<template>
  <div class="login-form">
    <div class="login-header">
      <h2>Sign In</h2>
    </div>
    <form>
      <div>
        <div class="form-group">
          <label for="username">Account</label>
          <input
            type="email"
            id="user_id"
            v-model="user_id"
            autocomplete="off"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">password</label>
          <input
            type="password"
            id="user_password"
            v-model="user_password"
            autocomplete="off"
            required
          />
        </div>
      </div>
      <button type="button" @click="login">login</button>
    </form>
    <div class="sign-up">
      <p>if u want create account?</p>
      <router-link class="sign-up-link" :to="{ name: 'account-sign-up' }"
        >sign up</router-link
      >
    </div>
    <div class="login-options">
      <p>social login</p>
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

<script>
import axios from "axios";
import { signInCheck } from "../../utill/validationCheck.js";
export default {
  data() {
    return {
      user_id: "",
      user_password: "",
    };
  },
  methods: {
    async login() {
      try {
        if (signInCheck(this.user_id, this.user_password)) {
          return;
        }
        const response = await axios.get(
          `http://127.0.0.1:5000/user/sign-in/${this.user_id}/${this.user_password}`,
          {
            validateStatus: function (status) {
              return (status >= 200 && status < 300) || status === 400;
            },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          this.$router.push({ path: "/" });
        } else if (response.status === 400) {
          alert(
            "ログインに失敗しました。アカウント及びパスワードを確認してください。"
          );
        }
      } catch (error) {
        alert("ログインに失敗しました。ネットワーク状況を確認してください。");
      }
    },
    loginWithGoogle() {
      console.log("구글 로그인을 시도합니다.");
    },
    loginWithKakao() {
      console.log("카카오톡 로그인을 시도합니다.");
    },
  },
};
</script>

<style scoped>
@import "./SignInBox.css";
</style>
