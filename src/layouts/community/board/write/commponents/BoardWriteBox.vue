<script setup>
import { ref } from "vue";
import { useBbsWriteStore } from "@/stores/useBbsWriteStore";
import { storeToRefs } from "pinia";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const bbsWriteStore = useBbsWriteStore();

const { bbsWriteLoading } = storeToRefs(bbsWriteStore);
const { bbsWrite } = bbsWriteStore;

const bbs_category = ref("");
const bbs_title = ref("");
const bbs_content = ref("");
const content_textarea = ref(null);

const submitPost = () => {
  const data = {
    bbs_category: bbs_category.value,
    bbs_title: bbs_title.value,
    bbs_content: bbs_content.value,
  };
  console.log(data);

  bbsWrite(data);
};

const textareaResize = () => {
  content_textarea.value.style.height = "1px";
  content_textarea.value.style.height =
    content_textarea.value.scrollHeight + "px";
};
</script>

<template>
  <LoadingSpinner v-if="bbsWriteLoading"></LoadingSpinner>
  <div class="container bg-light">
    <div class="write-page">
      <h2 class="text-center">Write Page</h2>
      <form @submit.prevent="submitPost" class="write-form">
        <div class="form-group">
          <label for="category">Category:</label>
          <select id="category" required v-model="bbs_category">
            <option value="">Select a category</option>
            <option value="about">about</option>
            <option value="services">services</option>
            <option value="blog">blog</option>
            <option value="contact">contact</option>
            <!-- 다른 카테고리 옵션을 추가할 수 있습니다 -->
          </select>
        </div>
        <div class="form-group">
          <label for="title">Title:</label>
          <input
            type="text"
            id="title"
            v-model="bbs_title"
            required
            minlength="10"
            maxlength="80"
          />
          <div class="p-2 font-weight-bold validity">Min. 10. Max. 80</div>
        </div>
        <div class="form-group">
          <label for="content">Content:</label>
          <textarea
            class="content-textarea"
            ref="content_textarea"
            @input="textareaResize"
            id="content"
            v-model="bbs_content"
            required
          ></textarea>
        </div>
        <button type="submit" class="submit-btn">Submit Post</button>
      </form>
    </div>
  </div>
</template>

<style>
@import "./BoardWriteBox.css";
</style>
