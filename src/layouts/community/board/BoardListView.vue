<script setup>
import { onMounted } from "vue";
// Sections components
import BaseLayout from "@/layouts/community/commponents/BaseLayout.vue";

// boardbox components
import BoardBox from "./commponents/BoardBox.vue";

//nav-pills
import setNavPills from "@/assets/js/nav-pills";

onMounted(() => {
  setNavPills();
});
</script>

<template>
  <BaseLayout :breadcrumb="[{ label: 'Community' }, { label: 'board' }]">
    <BoardBox></BoardBox>
  </BaseLayout>
</template>
