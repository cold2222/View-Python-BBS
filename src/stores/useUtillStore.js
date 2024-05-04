import { defineStore } from "pinia";
import { useRoute, useRouter } from "vue-router";

export const useUtillStore = defineStore("utill", () => {
  const router = useRouter();
  const route = useRoute();

  const move_home = () => {
    if (route.path === "/") {
      router.go(0);
    } else {
      router.push({ path: "/" });
    }
  };
  return { move_home };
});
