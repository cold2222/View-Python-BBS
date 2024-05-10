<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { useBbsStore } from "@/stores/useBbsStore";
import { storeToRefs } from "pinia";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const bbsStore = useBbsStore();
const route = useRoute();
const router = useRouter();
const { bbs_data, bbs_loading } = storeToRefs(bbsStore);

const { getBbs } = bbsStore;

const ScrollMoveTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
const moveBack = () => {
  router.go(-1);
};

const moveCategory = (category) => {
  router.push("/community/board/" + category);
};

const convertText = (text) => {
  if (typeof text === "string") {
    return text.replace(/(?:\r\n|\r|\n)/g, "<br />");
  }
};

// eslint-disable-next-line no-unused-vars
onBeforeRouteUpdate(async (to, from) => {
  if (to.params.categry == "detail") {
    console.log("디테일페이지 update");
    ScrollMoveTop();
    getBbs(to.query.number);
    console.log("-------------");
  }
});

onMounted(() => {
  console.log("디테일페이지 온마운트");
  ScrollMoveTop();
  getBbs(route.query.number);
});
</script>

<template>
  <LoadingSpinner v-if="bbs_loading"></LoadingSpinner>
  <div class="col-8 bg-light border-radius-lg bg-white detail-container">
    <div class="detail-header">
      <div class="header-1">
        <div class="back-btn" @click="moveBack()">← Go back</div>
      </div>
      <div class="header-2">
        <div class="header-2-left">
          <div class="header-2-left-top">
            {{ bbs_data.bbs_title }}
          </div>
          <div class="header-2-left-bottom">
            <div>
              by
              <span v-if="bbs_data.user != undefined" class="id-span">{{
                bbs_data.user.user_nickname
              }}</span>
            </div>
            <span class="distinguish-span">•</span>
            <div
              class="category-div"
              @click="moveCategory(bbs_data.bbs_category)"
            >
              #{{ bbs_data.bbs_category }}
            </div>
            <span class="distinguish-span">•</span>
            <div class="date-div">{{ bbs_data.bbs_date }}</div>
            <span class="distinguish-span">•</span>
            <div class="bbs-auxiliary-information">
              <img
                class="bbs-auxiliary-information-icon"
                src="/src/assets/icon/thumb_up_24dp_FILL0_wght400_GRAD0_opsz24.png"
              />
              {{ bbs_data.bbs_is_good }}
            </div>
            <span class="distinguish-span">•</span>
            <div class="bbs-auxiliary-information">
              <img
                class="bbs-auxiliary-information-icon"
                src="/src/assets/icon/visibility_24dp_FILL0_wght400_GRAD0_opsz24.png"
              />
              {{ bbs_data.bbs_view_count }}
            </div>
            <span class="distinguish-span">•</span>
            <div class="bbs-auxiliary-information">
              <img
                class="bbs-auxiliary-information-icon"
                src="/src/assets/icon/comment_24dp_FILL0_wght400_GRAD0_opsz24.png"
              />
              {{ bbs_data.bbs_comments_count }}
            </div>
          </div>
        </div>
        <div class="header-2-right">
          <div class="user-profile-img-box">
            <img
              class="user-profile-img"
              v-if="bbs_data.user != undefined"
              :src="`/src/assets/img/profile-img/${bbs_data.user.user_profile_img}`"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="detail-content"
      v-html="convertText(bbs_data.bbs_content)"
    ></div>
  </div>
</template>

<style>
@import "./BoardDetailBox.css";
</style>
