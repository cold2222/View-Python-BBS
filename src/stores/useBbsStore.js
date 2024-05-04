import { defineStore } from "pinia";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { bbsApi } from "@/api/bbsApi";
import bbs from "@/layouts/community/board/commponents/data.js";

export const useBbsStore = defineStore("bbs", () => {
  const route = useRoute();

  const category_list = ref(bbs.menu);
  const current_category = ref(route.params.category);
  const current_page = ref(route.params.current_page);
  const bbs_all_list = ref([]);
  const bbs_list = ref([]);

  const page_size = 6;
  const start_num = ref((current_page.value - 1) * page_size);
  const end_num = ref(current_page.value * page_size);

  const pageList = () => {
    const page_btn_num = 5;
    const start_page_array_num = Math.floor(current_page.value / page_btn_num);
    const page_num_list = [];

    for (let i = 1; i < 6; i++) {
      page_num_list.push(start_page_array_num * 5 + i);
    }
    return page_num_list;
  };
  const page_list = ref(pageList());

  const bbsListUp = (category) => {
    bbsApi
      .getBbsList(category)
      .then((res) => {
        console.log(res.data.bbs_list);
        bbs_all_list.value = res.data.bbs_list;
        getpagePosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getpagePosts = () => {
    const bbs = [];
    start_num.value = (current_page.value - 1) * page_size;
    end_num.value = current_page.value * page_size;
    for (let i = start_num.value; i < end_num.value; i++) {
      if (i >= 0 && i < bbs_all_list.value.length) {
        bbs.push(bbs_all_list.value[i]);
      }
    }
    bbs_list.value = bbs;
    console.log(bbs_list, "페이지리스트");
  };

  bbsListUp(current_category.value);
  return {
    bbs_all_list,
    bbs_list,
    category_list,
    current_category,
    current_page,
    page_list,
    bbsListUp,
    getpagePosts,
  };
});
