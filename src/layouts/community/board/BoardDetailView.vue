<script setup>
import { onMounted } from "vue";
// Sections components
import BaseLayout from "@/layouts/community/commponents/BaseLayout.vue";

// boardbox components
import BoardDetailBox from "./commponents/BoardDetailBox.vue";

//nav-pills
import setNavPills from "@/assets/js/nav-pills";

import { useBbsStore } from "@/stores/useBbsStore";

const bbsStore = useBbsStore();
const { current_category, current_page } = bbsStore;

onMounted(() => {
  setNavPills();
});
</script>

<template>
  <BaseLayout
    :breadcrumb="[
      {
        label: 'Community',
        route: '/community/board/' + current_category + '/' + current_page,
      },
      { label: current_category },
    ]"
  >
    <BoardDetailBox></BoardDetailBox>
  </BaseLayout>
</template>
