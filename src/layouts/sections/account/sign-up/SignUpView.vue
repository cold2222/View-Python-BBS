<script setup>
import { onMounted } from "vue";

// Sections components
import BaseLayout from "../../components/BaseLayout.vue";

// Account page signin basic view
import AccountBasicView from "../../components/AccountBasicView.vue";

// Account - SignUp box
import SignUpBox from "./components/SignUpBox.vue";

//nav-pills
import setNavPills from "@/assets/js/nav-pills";

//hook
onMounted(() => {
  setNavPills();
});
</script>
<template>
  <BaseLayout
    title="Sign Up"
    :breadcrumb="[{ label: 'Account', route: '#' }, { label: 'sign Up' }]"
  >
    <AccountBasicView></AccountBasicView>
    <SignUpBox></SignUpBox>
  </BaseLayout>
</template>
