<script setup>
import DefaultNavbar from "@/examples/navbars/NavbarDefault.vue";
import CenteredFooter from "@/examples/footers/FooterCentered.vue";
import Breadcrumbs from "@/examples/Breadcrumbs.vue";

defineProps({
  breadcrumb: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <DefaultNavbar light />
  <div class="container mt-5 py-2 bg-light border-radius-lg">
    <div class="row">
      <div class="col-lg-12 mx-auto">
        <div class="mb-4 w-100 w-md-50 w-lg-25">
          <Breadcrumbs :routes="breadcrumb" />
        </div>
      </div>
    </div>
    <slot />
  </div>
  <CenteredFooter />
</template>
