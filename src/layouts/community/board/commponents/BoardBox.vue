<script setup>
import { onMounted } from "vue";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import MaterialPagination from "@/components/MaterialPagination.vue";
import MaterialPaginationItem from "@/components/MaterialPaginationItem.vue";
import { useBbsStore } from "@/stores/useBbsStore";
import { storeToRefs } from "pinia";
import MaterialButton from "@/components/MaterialButton.vue";
import BoardListBox from "./BoardListBox.vue";
import BoardDetailBox from "./BoardDetailBox.vue";

const bbsStore = useBbsStore();
const route = useRoute();

const {
  category_list,
  current_category,
  current_page,
  page_list,
  total_pages,
  extracted_page_lists,
  sort_option,
} = storeToRefs(bbsStore);
const {
  bbsListUp,
  handleCurrentPage,
  handlePageList,
  bbsStoreReset,
  savePrevData,
  loadPrevData,
} = bbsStore;

const isMenuActive = (item) => {
  return route.params.category === item;
};

const categoryChange = (category) => {
  if (route.params.category === category) {
    return;
  }
};

const getLink = (page) => {
  const hasSortQuery = route.query.sort ? route.query.sort : "";
  const hasKeywordQuery = route.query.keyword ? route.query.keyword : "";

  // eslint-disable-next-line no-unused-vars
  const { page: pageFromQuery, ...restQuery } = route.query;
  let query = {};
  if (hasSortQuery || hasKeywordQuery) {
    query = { page: page, ...restQuery };
  } else {
    query = { page: page };
  }
  return { path: route.path, query };
};
onBeforeRouteUpdate(async (to, from) => {
  // 디테일 페이지 이동시 정지
  if (to.params.category === "detail") {
    console.log("디테일페이지 이동");
  }

  // 페이지이동
  if (
    to.params.category === from.params.category &&
    to.query.sort === from.query.sort &&
    to.query.keyword === from.query.keyword &&
    to.query.page != from.query.page
  ) {
    console.log("페이지이동");
    current_category.value = to.params.category;
    handleCurrentPage(to.query.page);
    handlePageList();
    window.scrollTo(0, 0);

    if (extracted_page_lists >= to.query.page) {
      return;
    }
  }

  // 다른카테고리,상세페이지 이동시 과거 데이터 저장
  if (
    to.params.category !== from.params.category ||
    to.query.sort !== from.query.sort ||
    to.query.keyword !== from.query.keyword
  ) {
    console.log("과거데이터 저장");
    savePrevData(from.params.category, from.query.sort, from.query.keyword);
    bbsStoreReset();
  }

  // 과거 데이터 업로드
  if (
    loadPrevData(
      to.params.category,
      to.query.page,
      to.query.sort,
      to.query.keyword
    ) &&
    to.params.category != "detail"
  ) {
    current_category.value = to.params.category;
    handleCurrentPage(to.query.page);
    handlePageList();
    window.scrollTo(0, 0);
    console.log("과거데이터 로드");
  }
  // 새로운 페이지 데이터 업로드
  else {
    console.log("리스트업 실행");
    await bbsListUp(
      to.params.category,
      to.query.page ? to.query.page : 1,
      to.query.sort ? to.query.sort : "new",
      "midway"
    );
    current_category.value = to.params.category;
    handleCurrentPage(to.query.page);
    handlePageList();
    sort_option.value = to.query.sort ? to.query.sort : "new";
    window.scrollTo(0, 0);
  }
  console.log("--------------------");
});

onMounted(() => {
  if (route.params.category != "detail") {
    console.log("onMount실행");
    handleCurrentPage(route.query.page);
    handlePageList();
    let page = Math.floor((route.query.page - 1) / 5) * 5 + 1;
    bbsListUp(route.params.category, page, route.query.sort, "scratch");
  }
});
</script>

<template>
  <div class="container bg-light">
    <div class="row">
      <div class="column col-2 text-center border-radius-lg py-4 mb-4">
        <h5
          v-for="(category, index) in category_list"
          :key="index"
          class="menu py-2 mb-2 fw-bold"
        >
          <router-link
            :to="`/community/board/${category}`"
            :class="{ active: isMenuActive(category) }"
            @click="categoryChange(category)"
          >
            #{{ category }}
          </router-link>
        </h5>
      </div>
      <BoardListBox v-if="route.params.category != 'detail'"></BoardListBox>
      <BoardDetailBox v-else></BoardDetailBox>
      <div class="col-2">
        <div>
          <MaterialButton
            size="sm"
            class="btn-icon mx-2"
            color="success"
            fullWidth
          >
            <div class="flex align-items-center">
              Write a post
              <img
                class="write-icon"
                src="@/assets/icon/edit_24dp_FILL0_wght400_GRAD0_opsz24.png"
              />
            </div>
          </MaterialButton>
        </div>
        <div>공지사항</div>
        <div>인기글</div>
      </div>
    </div>
    <div
      class="row mt-3 py-4 justify-content-center"
      v-if="route.params.category != 'detail'"
    >
      <div class="col-md-auto">
        <MaterialPagination>
          <router-link v-if="page_list[0] > 1" :to="getLink(page_list[0] - 1)">
            <MaterialPaginationItem prev />
          </router-link>
          <div v-for="page in page_list" :key="page">
            <router-link class="row" :to="getLink(page)">
              <MaterialPaginationItem
                v-if="page <= total_pages"
                :label="String(page)"
                :active="current_page == page"
                :disabled="page < total_pages"
              />
            </router-link>
          </div>
          <router-link
            v-if="page_list[4] < total_pages"
            :to="getLink(page_list[4] + 1)"
          >
            <MaterialPaginationItem next />
          </router-link>
        </MaterialPagination>
      </div>
    </div>
  </div>
</template>

<style>
.menu:hover {
  color: red;
}
.active {
  color: #03a9f4 !important;
}
.write-icon {
  width: 20px;
}
</style>
