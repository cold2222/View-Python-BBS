<script setup>
import { useUserStore } from "@/stores/useUserStore";
import { ref } from "vue";

const userStore = useUserStore();

const user_password = ref("");

const deleteAccount = () => {
  userStore.deleteAccountApi(user_password.value);
};
</script>

<template>
  <div class="delete-id-container">
    <h2 class="delete-id-title">Delete Account</h2>
    <div class="delete-id-form">
      <input
        type="text"
        placeholder="entar Password"
        class="delete-id-input"
        v-model="user_password"
      />
      <button class="delete-id-button" @click="deleteAccount">
        Delete Account
      </button>
    </div>
  </div>
</template>

<style scoped>
@import "./AccountDeletion.css";
</style>
