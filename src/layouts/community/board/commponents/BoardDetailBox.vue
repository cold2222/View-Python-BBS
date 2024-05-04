<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useBbsStore } from "@/stores/useBbsStore";
import { storeToRefs } from "pinia";

const bbsStore = useBbsStore();
const route = useRoute();

const { bbs_list, category_list, current_category, current_page, page_list } =
  storeToRefs(bbsStore);

const bbs = ref({});

const getBbs = () => {
  for (let i = 0; i < bbs_list.value.length; i++) {
    if (bbs_list.value[i].bbs_pk == route.params.bbs_pk) {
      bbs.value = bbs_list.value[i];
      break;
    }
  }
};

getBbs();
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-auto bg-white text-center">{{ bbs.bbs_pk }}</div>
      <div class="col-auto bg-white text-center">{{ bbs.bbs_user_id }}</div>
      <div class="col-auto bg-white text-center">{{ bbs.bbs_title }}</div>
      <div class="col-auto bg-white text-center">{{ bbs.bbs_content }}</div>
      <div class="col-auto bg-white text-center">{{ bbs.bbs_date }}</div>
    </div>
  </div>
</template>

<style>
.menu:hover {
  color: red;
}
.test {
  color: red !important;
}
</style>
