<script setup>
import { onMounted } from "vue";
// Sections components
import BaseLayout from "@/layouts/community/commponents/BaseLayout.vue";

// boardbox components
import BoardListBox from "./commponents/BoardListBox.vue";

//nav-pills
import setNavPills from "@/assets/js/nav-pills";

import { useRoute } from "vue-router";

const route = useRoute();

onMounted(() => {
  setNavPills();
});
</script>

<template>
  <BaseLayout
    :breadcrumb="[
      { label: 'Community', route: route.params.category },
      { label: route.params.category },
    ]"
  >
    <BoardListBox></BoardListBox>
  </BaseLayout>
</template>
