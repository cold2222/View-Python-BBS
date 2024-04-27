<script setup>
import { onMounted } from "vue";

// Sections components
import BaseLayout from "../../components/BaseLayout.vue";

// Account page signin basic view
import AccountBasicView from "../../components/AccountBasicView.vue";

// Account - Signin box
import SignInBox from "./components/SignInBox.vue";

//nav-pills
import setNavPills from "@/assets/js/nav-pills";

//hook
onMounted(() => {
  setNavPills();
});
</script>
<template>
  <BaseLayout
    title="Sign In"
    :breadcrumb="[{ label: 'Account', route: '#' }, { label: 'sign in' }]"
  >
    <AccountBasicView></AccountBasicView>
    <SignInBox></SignInBox>
  </BaseLayout>
</template>
