<script setup>
import MaterialButton from "@/components/MaterialButton.vue";
import BackgroundBlogCard from "@/examples/cards/blogCards/BackgroundBlogCard.vue";
</script>

<template>
  <div class="col-2 right-menu-container">
    <div class="">
      <router-link to="/community/board/write">
        <MaterialButton size="sm" class="btn-icon" color="success" fullWidth>
          <div class="flex align-items-center">
            Write a post
            <img
              class="write-icon"
              src="@/assets/icon/edit_24dp_FILL0_wght400_GRAD0_opsz24.png"
            />
          </div>
        </MaterialButton>
      </router-link>
    </div>
    <div class="sticky-box">
      <div class="text-center bg-white border-radius-lg mt-4">
        <div class="fw-bold py-2 border-bottom">Notice⭐️</div>
        <div class="">
          <div class="p-2 notice-text font-weight-bold">
            <router-link to="/community/board/detail?number=1">
              Purpose of this page
            </router-link>
          </div>
          <div class="p-2 notice-text font-weight-bold">
            <router-link to="/community/board/detail?number=2">
              Suggestions for improvement are always welcome📚
            </router-link>
          </div>
        </div>
      </div>
      <div class="py-6">
        <router-link :to="'/community/board/detail?number=3'">
          <BackgroundBlogCard
            image="https://bit.ly/31BuIti"
            title="Flexible work hours"
            description="Rather than worrying about switching offices every couple years, you stay in the same place."
            :action="{
              route: '#',
              label: 'More about us',
              color: 'success',
            }"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<style>
@import "./BoardBoxRightMenu.css";
</style>
