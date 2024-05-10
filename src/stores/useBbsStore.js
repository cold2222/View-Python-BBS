import { defineStore } from "pinia";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { bbsApi } from "@/api/bbsApi";
import bbs from "@/layouts/community/board/commponents/data.js";

export const useBbsStore = defineStore("bbs", () => {
  const route = useRoute();

  // BoardBox ref
  const category_list = ref(bbs.menu);
  const current_category = ref(route.params.category);
  const current_page = ref(route.query.page ? parseInt(route.query.page) : 1);
  const bbs_list = ref([]);
  const total_posts = ref(0);
  const total_pages = ref(0);
  const sort_option = ref(route.query.sort ? route.query.sort : "new");
  const extracted_page_lists = ref(0);
  const page_list = ref([]);
  const prev_data = ref({});
  const search_keyword = ref(route.query.keyword ? route.query.keyword : "");

  //BoardDetail ref
  const bbs_data = ref([]);

  const savePrevData = (category, sort, keyword) => {
    if (sort === undefined) {
      sort = "new";
    }
    if (keyword === undefined) {
      keyword = "";
    }
    console.log(bbs_list.value, bbs_list.value == null, "확인용");
    prev_data.value[category + sort + keyword] = bbs_list.value;
    prev_data.value[category + sort + keyword + "extracted_page_lists"] =
      extracted_page_lists.value;
    prev_data.value[category + sort + keyword + "total_pages"] =
      total_pages.value;
    prev_data.value[category + sort + keyword + "total_posts"] =
      total_posts.value;
  };

  const loadPrevData = (category, page, sort, keyword) => {
    if (sort === undefined) {
      sort = "new";
    }
    if (keyword === undefined) {
      keyword = "";
    }
    sort_option.value = sort;
    search_keyword.value = keyword;

    if (
      prev_data.value[category + sort + keyword] !== undefined &&
      prev_data.value[category + sort + keyword + "extracted_page_lists"] >=
        page
    ) {
      console.log(prev_data.value[category + sort + keyword]);
      bbs_list.value = prev_data.value[category + sort + keyword];
      extracted_page_lists.value =
        prev_data.value[category + sort + keyword + "extracted_page_lists"];
      total_pages.value =
        prev_data.value[category + sort + keyword + "total_pages"];
      total_posts.value =
        prev_data.value[category + sort + keyword + "total_posts"];
      return true;
    }
    return false;
  };

  const bbsStoreReset = () => {
    total_posts.value = 0;
    current_category.value = route.params.category;
    current_page.value = route.query.page ? parseInt(route.query.page) : 1;
    bbs_list.value = [];
    total_pages.value = 0;
    sort_option.value = "new";
    extracted_page_lists.value = 0;
    page_list.value = [];
  };

  const handleCurrentPage = (movePage) => {
    if (movePage === undefined) {
      current_page.value = 1;
    } else {
      current_page.value = movePage;
    }
  };

  const handlePageList = () => {
    let page = Math.floor((current_page.value - 1) / 5) * 5 + 1;
    let custom_page_list = [];
    for (let i = page; i < page + 5; i++) {
      custom_page_list.push(i);
    }
    page_list.value = custom_page_list;
  };

  const bbsListUp = (category, page, sort, starting_point) => {
    bbsApi
      .getBbsList(category, page, sort, starting_point)
      .then((res) => {
        // console.log("bbsList ok");
        extracted_page_lists.value += res.data.extracted_page_lists;
        bbs_list.value = [...bbs_list.value, ...res.data.bbs_list];
        total_pages.value = res.data.total_pages;
        total_posts.value = res.data.total_posts;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getBbs = (bbs_pk) => {
    bbsApi
      .getBbs(bbs_pk)
      .then((res) => {
        console.log("bbs ok");
        console.log(res.data);
        bbs_data.value = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    bbs_list,
    category_list,
    current_category,
    current_page,
    page_list,
    total_pages,
    sort_option,
    extracted_page_lists,
    total_posts,
    bbs_data,
    bbsListUp,
    handleCurrentPage,
    handlePageList,
    bbsStoreReset,
    savePrevData,
    loadPrevData,
    getBbs,
  };
});
