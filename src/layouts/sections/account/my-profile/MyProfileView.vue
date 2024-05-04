<script setup>
import { onMounted } from "vue";

// Sections components
import BaseLayout from "../../components/BaseLayout.vue";

// myProfileBox components
import MyProfileBox from "./components/MyProfileBox.vue";

// AccountDeletion components
import AccountDeletion from "./components/AccountDeletion.vue";

//nav-pills
import setNavPills from "@/assets/js/nav-pills";

//hook
onMounted(() => {
  setNavPills();
});
</script>
<template>
  <BaseLayout
    title="my profile"
    :breadcrumb="[
      { label: 'Account', route: '/community/board/home' },
      { label: 'my profile' },
    ]"
  >
    <MyProfileBox></MyProfileBox>
    <AccountDeletion></AccountDeletion>
  </BaseLayout>
</template>
