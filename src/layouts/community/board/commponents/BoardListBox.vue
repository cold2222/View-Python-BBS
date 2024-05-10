<script setup>
import { useBbsStore } from "@/stores/useBbsStore";
import { storeToRefs } from "pinia";
import BoardListTop from "./BoardListTop.vue";
import BoardListCard from "./BoardListCard.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const bbsStore = useBbsStore();
const { bbs_list, current_page, bbs_loading } = storeToRefs(bbsStore);
</script>
<template>
  <LoadingSpinner v-if="bbs_loading"></LoadingSpinner>
  <div class="col-8 bg-light border-radius-lg bg-white">
    <BoardListTop></BoardListTop>
    <div
      class="row"
      v-for="(item, index) in bbs_list[current_page - 1]"
      :key="index"
    >
      <RouterLink :to="`/community/board/detail?number=${item.bbs_pk}`">
        <BoardListCard
          color=""
          :name="`${item.bbs_title}`"
          :date="`${item.bbs_date}`"
          :writer="`${item.bbs_user_id}`"
          :review="`${item.bbs_content}`"
        />
      </RouterLink>
    </div>
    <div class="text-center py-4 font-weight-bolder" v-if="bbs_list == 0">
      No posts here yet, create one! 😬
    </div>
  </div>
</template>
