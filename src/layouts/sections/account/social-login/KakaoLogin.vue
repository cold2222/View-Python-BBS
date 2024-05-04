<script setup>
import DefaultInfoCard from "@/examples/cards/infoCards/DefaultInfoCard.vue";
import { useUserStore } from "@/stores/useUserStore";
import { useRoute } from "vue-router";
const userStore = useUserStore();

const route = useRoute();
const code = route.query.code;

userStore.kakaoSignInApi(code);
</script>

<template>
  <div class="loading">
    <DefaultInfoCard
      color="success"
      icon="public"
      title="Now Loading..."
      description="Sign in with Google account. Please wait a moment."
      col="col-md-3"
    />
  </div>
</template>

<style>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
