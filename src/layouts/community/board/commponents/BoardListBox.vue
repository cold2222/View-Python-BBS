<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import BoardListCard from "./BoardListCard.vue";
import MaterialPagination from "@/components/MaterialPagination.vue";
import MaterialPaginationItem from "@/components/MaterialPaginationItem.vue";
import { useBbsStore } from "@/stores/useBbsStore";
import { storeToRefs } from "pinia";

const bbsStore = useBbsStore();
const route = useRoute();

const { bbs_list, category_list, current_category, current_page, page_list } =
  storeToRefs(bbsStore);
const { bbsListUp, getpagePosts } = bbsStore;
const categoryChange = (category) => {
  current_category.value = category;
  bbsListUp(category);
};

const pageChange = (page) => {
  current_page.value = page;
  getpagePosts();
};

// paging
const total_pages = ref(7);

const isMenuActive = (item) => {
  return route.params.category === item;
};

const onPageBtnChange = (btn_type) => {
  if (btn_type === "prev") {
    if (page_list.value[0] > 1) {
      for (let i = 0; i < page_list.value.length; i++) {
        page_list.value[i] -= 5;
      }
    }
  } else if (btn_type === "next") {
    if (page_list.value[4] < total_pages.value) {
      for (let i = 0; i < page_list.value.length; i++) {
        page_list.value[i] += 5;
      }
    }
  }
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="column col-2 text-center border-radius-lg py-4 mb-4">
        <h4 class="mb-4 text-start">Category</h4>
        <h5
          v-for="(category, index) in category_list"
          :key="index"
          class="menu py-2 mb-2 fw-bold"
        >
          <router-link
            :to="`/community/board/${category}/1`"
            :class="{ test: isMenuActive(category) }"
            @click="categoryChange(category)"
          >
            {{ category }}
          </router-link>
        </h5>
      </div>
      <div class="col-1"></div>
      <div class="col-9 bg-light border-radius-lg bg-white">
        <div class="row" v-for="(item, index) in bbs_list" :key="index">
          <RouterLink :to="`/community/detail/${item.bbs_pk}`">
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
    </div>
    <div class="row center mt-3 py-4 justify-content-center">
      <div class="col-md-auto">
        <MaterialPagination>
          <router-link to="#">
            <MaterialPaginationItem prev @click="onPageBtnChange('prev')" />
          </router-link>
          <div v-for="page in page_list" :key="page">
            <router-link
              class="row"
              :to="`/community/board/${current_category}/${page}`"
            >
              <MaterialPaginationItem
                :label="String(page)"
                :disabled="parseInt(total_pages) < page"
                :active="
                  parseInt(current_page) === page &&
                  parseInt(current_page) >= page
                "
                @click="pageChange(String(page))"
              />
            </router-link>
          </div>
          <MaterialPaginationItem next @click="onPageBtnChange('next')" />
        </MaterialPagination>
      </div>
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
