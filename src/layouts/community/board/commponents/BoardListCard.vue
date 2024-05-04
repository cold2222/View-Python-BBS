<script setup>
const props = defineProps({
  color: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  writer: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="col-12 border-bottom py-2">
    <div :class="`card ${props.color ? props.color : 'card-plain'}`">
      <div class="card-body">
        <div class="author">
          <div class="name">
            <div class="mb-0 font-weight-bolder">
              {{ props.name }}
            </div>
            <div class="stats">
              <i class="far fa-clock"></i> {{ props.date }} {{ props.writer }}
            </div>
          </div>
        </div>
        <p class="mt-2 fw-normal">{{ props.review }}</p>
      </div>
    </div>
  </div>
</template>
