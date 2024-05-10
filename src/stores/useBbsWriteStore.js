import { defineStore } from "pinia";
import { bbsApi } from "@/api/bbsApi";
import { useRouter } from "vue-router";
import { ref } from "vue";
export const useBbsWriteStore = defineStore("bbsWrite", () => {
  const router = useRouter();
  const bbsWriteLoading = ref(false);

  // api
  const bbsWrite = (data) => {
    bbsWriteLoading.value = true;
    bbsApi
      .writeBbs(data)
      .then(() => {
        console.log("bbsWrite ok");
        bbsWriteLoading.value = false;
        router.replace("/community/board/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return {
    bbsWriteLoading,
    bbsWrite,
  };
});
