<script setup>
import { onMounted } from "vue";
// Sections components
import BaseLayout from "@/layouts/community/commponents/BaseLayout.vue";

// boardWriteBox components
import BoardWriteBox from "./commponents/BoardWriteBox.vue";

//nav-pills
import setNavPills from "@/assets/js/nav-pills";

onMounted(() => {
  console.log("작성페이지");
  setNavPills();
});
</script>

<template>
  <BaseLayout :breadcrumb="[{ label: 'Community' }, { label: 'write' }]">
    <BoardWriteBox></BoardWriteBox>
  </BaseLayout>
</template>
