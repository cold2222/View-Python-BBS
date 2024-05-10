<script setup>
import { storeToRefs } from "pinia";
import { useBbsStore } from "@/stores/useBbsStore";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const bbsStore = useBbsStore();
const { current_category, sort_option, total_pages, total_posts } =
  storeToRefs(bbsStore);

const category_instruction = ref({});
const search_input = ref(null);
const search_input_active = ref(route.query.keyword ? true : false);
const search_input_text = ref(route.query.keyword ? route.query.keyword : "");

const insertCategoryInstruction = () => {
  category_instruction.value["home"] = "Show all posts from every category";
  category_instruction.value["about"] = "About category provides site info";
  category_instruction.value["services"] =
    "Explore our range of offered services";
  category_instruction.value["blog"] =
    "Discover our latest articles, news, and updates";
  category_instruction.value["contact"] =
    "Reach out to us for inquiries, support, or collaboration";
};

const sortHandler = (sort) => {
  sort_option.value = sort;
};

const searchFocus = () => {
  if (!search_input_active.value) {
    search_input_active.value = true;
    search_input.value.focus();
  } else {
    search_input_active.value = false;
  }
};
const getSearchLink = () => {
  let query = {};
  let search_keyword = search_input_text.value;
  query = { keyword: search_keyword };
  return { path: route.path, query };
};

const getSortLink = (sort) => {
  const hasKeywordQuery = route.query.keyword ? route.query.keyword : "";
  let query = {};
  if (hasKeywordQuery) {
    query = { sort: sort, ...route.query };
  } else {
    query = { sort: sort };
  }
  return { path: route.path, query };
};

const searchFromSubmit = (e) => {
  e.preventDefault();
  if (search_input_text.value === "") {
    return;
  }
  const link = getSearchLink();
  router.push({ path: link.path, query: link.query });
};

onMounted(() => {
  insertCategoryInstruction();
});
</script>
<template>
  <div class="board-list-top-container">
    <div class="board-list-top-content-1">
      <div class="list-top-title">
        #{{ current_category }}:
        <span>{{ category_instruction[current_category] }}</span>
      </div>
      <div class="list-sort-box">
        <div class="">sort by :</div>
        <div class="">
          <router-link
            :to="getSortLink('popular')"
            @click="sortHandler('popular')"
          >
            <div :class="{ 'selected-sort': sort_option === 'popular' }">
              Popular<img
                style="width: 18px; height: 18px"
                src="@/assets/icon/favorite_24dp_FILL0_wght400_GRAD0_opsz24.png"
                alt="popular"
              />
            </div>
          </router-link>
        </div>
        <div class="">
          <router-link :to="getSortLink('new')" @click="sortHandler('new')">
            <div :class="{ 'selected-sort': sort_option === 'new' }">
              New
              <img
                style="width: 18px; height: 18px"
                src="@/assets/icon/favorite_24dp_FILL0_wght400_GRAD0_opsz24.png"
                alt="popular"
              />
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="board-list-top-content-2">
      <div class="search-box-container">
        <div class="search-box" @click="searchFocus">
          <img
            class="search-icon"
            src="@/assets/icon/search_24dp_FILL0_wght400_GRAD0_opsz24.png"
          />
          Search
        </div>
        <div class="search-input-box">
          <form v-on:submit="searchFromSubmit">
            <input
              ref="search_input"
              v-model="search_input_text"
              class="search-input"
              :class="{ 'active-input': search_input_active }"
            />
            <button
              class="search-button"
              :class="{ 'active-input': search_input_active }"
            >
              <img
                src="@/assets/icon/search_24dp_FILL0_wght400_GRAD0_opsz24.png"
              />
            </button>
          </form>
        </div>
      </div>
      <div class="total-box-container">
        <div class="total-box-title">Category list info</div>
        <div>total pages : {{ total_pages }}</div>
        <div>total posts &nbsp;: {{ total_posts }}</div>
      </div>
    </div>
  </div>
</template>

<style>
@import "./BoardListTop.css";
</style>
