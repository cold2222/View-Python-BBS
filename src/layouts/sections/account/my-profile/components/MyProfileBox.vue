<script setup>
import { ref, watch } from "vue";
import {
  validateImageFile,
  isLocalImg,
  isSocialSignIn,
} from "@/utill/validationCheck";
import { useUserStore } from "@/stores/useUserStore";

const userStore = useUserStore();

const user_id = ref(userStore.user_id);
const user_password = ref(userStore.user_password);
const user_e_mail = ref(userStore.user_e_mail);
const user_nickname = ref(userStore.user_nickname);
const user_profile_img = ref(userStore.user_profile_img);
const changeProfile = ref(false);

const profile_img_name = ref("only jpg or png");
const user_profile_img_input = ref(null);
watch(
  () => userStore.user_id,
  (newValue) => {
    user_id.value = newValue;
  }
);
watch(
  () => userStore.user_password,
  (newValue) => {
    user_password.value = newValue;
  }
);
watch(
  () => userStore.user_e_mail,
  (newValue) => {
    user_e_mail.value = newValue;
  }
);
watch(
  () => userStore.user_nickname,
  (newValue) => {
    user_nickname.value = newValue;
  }
);
watch(
  () => userStore.user_profile_img,
  (newValue) => {
    user_profile_img.value = newValue;
  }
);

const saveProfile = () => {
  const payload = {
    user_id: user_id.value,
    user_password: user_password.value,
    user_e_mail: user_e_mail.value,
    user_nickname: user_nickname.value,
  };

  userStore.saveUserProfileApi(
    payload,
    user_profile_img_input.value,
    editProfile
  );
};
const editProfile = () => {
  changeProfile.value = !changeProfile.value;
};
const insertFileName = (event) => {
  if (validateImageFile(event.target)) {
    profile_img_name.value = event.target.files[0].name;
  }
};
</script>

<template>
  <div class="my-profile-container">
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
              ref="user_profile_img_input"
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
            type="email"
            name="user_id"
            id="user_id"
            v-model="user_id"
          />
        </div>
        <div class="form-group">
          <label for="user_id">NickName:</label>
          <input
            :class="{
              'input-disabled': !changeProfile,
              'input-enabled': changeProfile,
            }"
            type="text"
            name="user_nickname"
            id="user_nickname"
            v-model="user_nickname"
          />
        </div>
        <div class="form-group" v-if="!isSocialSignIn(user_id)">
          <label for="user_password">Password:</label>
          <input
            :class="{
              'input-disabled': !changeProfile,
              'input-enabled': changeProfile,
            }"
            type="password"
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
