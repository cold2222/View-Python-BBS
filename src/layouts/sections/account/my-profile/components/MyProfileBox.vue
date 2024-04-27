<script setup>
import { ref, onBeforeMount, getCurrentInstance } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import {
  profileUpdateCheck,
  validateImageFile,
  isSocialSignIn,
  isLocalImg,
} from "../../utill/validationCheck.js";

const { proxy } = getCurrentInstance();

const router = useRouter();
const user_id = ref("");
const user_password = ref("");
const user_e_mail = ref("");
const user_profile_img = ref("");
const file = ref(null);
const isLoading = ref(true);
const changeProfile = ref(false);
const profile_img_name = ref("only jpg or png");

const editProfile = () => {
  changeProfile.value = !changeProfile.value;
};
const insertFileName = (event) => {
  if (validateImageFile(event.target)) {
    profile_img_name.value = event.target.files[0].name;
  }
};

const saveProfile = async () => {
  if (!confirm("修正しますか？")) {
    return;
  }
  if (
    !profileUpdateCheck(
      user_id.value,
      user_password.value,
      user_e_mail.value,
      file.value
    )
  ) {
    return;
  }
  try {
    const cookie = proxy.$cookies.get("jwt");
    const axiosConfig = {
      headers: {
        Authorization: `Bearer ${cookie}`,
      },
      validateStatus: function (status) {
        return (
          (status >= 200 && status < 300) || status === 401 || status === 400
        );
      },
    };
    const formData = new FormData();
    formData.append("user_id", user_id.value);
    formData.append("user_password", user_password.value);
    formData.append("user_e_mail", user_e_mail.value);
    formData.append("user_profile_img", file.value.files[0]);
    const response = await axios.put(
      `http://127.0.0.1:5000/auth/user`,
      formData,
      axiosConfig
    );
    if (response.status === 200) {
      router.go(0);
    } else if (response.status === 400) {
      alert("エラーが発生しました。以前のページに戻ります。");
      router.go(-1);
    }
  } catch (error) {
    alert("会員情報修正に失敗しました。ネットワーク状況を確認してください。");
    router.go(-1);
  }
  changeProfile.value = !changeProfile.value;
};
const getUserProfile = async () => {
  const cookie = proxy.$cookies.get("jwt");
  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${cookie}`,
    },
    validateStatus: function (status) {
      return (status >= 200 && status < 300) || status === 401;
    },
  };

  try {
    const response = await axios.get(
      `http://127.0.0.1:5000/auth/user`,
      axiosConfig
    );
    if (response.status >= 200 && response.status < 300) {
      const body = response.data;
      console.log(body);
      user_id.value = body.user_id;
      user_password.value = body.user_password;
      user_e_mail.value = body.user_e_mail;
      user_profile_img.value = body.user_profile_img;
      isLoading.value = false;
    } else if (response.status === 401) {
      alert("MyProfileに入るためにはログインする必要があります。");
      router.push({ path: "/sections/account/sign-in" });
    }
  } catch (error) {
    console.log(error);
    router.go(-1);
    alert("会員情報習得に失敗しました。ネットワーク状況を確認してください。");
  }
};
onBeforeMount(getUserProfile);
</script>

<template>
  <div v-if="!isLoading" class="my-profile-container">
    <div class="my-profile-content">
      <div class="profile-img-content">
        <img
          v-if="isLocalImg(user_profile_img)"
          :src="`/src/assets/img/profile-img/${user_id}.jpg`"
        />
        <img v-else :src="`${user_profile_img}`" />
        <div class="profile-img-box">
          <div class="profile-img-box-header">Profile Img</div>
          <div class="profile-img-box-content">
            <input
              v-model="profile_img_name"
              class="profile-img-name"
              readonly
            />
            <label v-if="changeProfile" for="user-profile-image">Upload</label>
            <input
              type="file"
              @change="insertFileName"
              ref="file"
              name="user-profile-image"
              id="user-profile-image"
              accept=".jpg,.png"
            />
          </div>
        </div>
      </div>
      <div class="form-box">
        <div class="form-group">
          <label for="user_id">Id:</label>
          <input
            class="input-disabled"
            type="text"
            name="user_id"
            id="user_id"
            v-model="user_id"
          />
        </div>
        <div class="form-group" v-if="!isSocialSignIn(user_id)">
          <label for="user_password">Password:</label>
          <input
            :class="{
              'input-disabled': !changeProfile,
              'input-enabled': changeProfile,
            }"
            type="text"
            name="user_password"
            id="user_password"
            v-model="user_password"
          />
        </div>
        <div class="form-group">
          <label for="user_e_mail">Email:</label>
          <input
            :class="{
              'input-disabled': !changeProfile,
              'input-enabled': changeProfile,
            }"
            type="email"
            name="user_e_mail"
            id="user_e_mail"
            v-model="user_e_mail"
          />
        </div>
      </div>
    </div>
    <div class="btn-group">
      <button v-if="!changeProfile" @click="editProfile">profile edit</button>
      <button v-else @click="saveProfile">profile save</button>
    </div>
  </div>
</template>

<style scoped>
@import "./myProfileBox.css";
</style>
