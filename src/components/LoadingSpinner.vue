<template>
  <div class="loading-container">
    <img src="@/assets/icon/Spin@1x-1.0s-200px-200px.gif" alt="Loading..." />
  </div>
</template>

<style>
.loading-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>
