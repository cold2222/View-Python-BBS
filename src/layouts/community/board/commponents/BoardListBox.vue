<script setup>
import { useBbsStore } from "@/stores/useBbsStore";
import { storeToRefs } from "pinia";
import BoardListTop from "./BoardListTop.vue";
import BoardListCard from "./BoardListCard.vue";

const bbsStore = useBbsStore();
const { bbs_list, current_page } = storeToRefs(bbsStore);
</script>
<template>
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
  </div>
</template>
