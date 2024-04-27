<script setup>
import { getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";

const { proxy } = getCurrentInstance();
const axios = proxy.$axios;

const handleOAuthKakao = async () => {
  const route = useRoute();
  const router = useRouter();
  const code = route.query.code;
  try {
    console.log(code);
    const crossOriginIsolated = { withCredentials: true };
    const response = await axios.post(
      "http://127.0.0.1:5000/user/social-login/kakao",
      { code },
      crossOriginIsolated
    );
    if (response.status === 200) {
      router.push({ path: "/" });
    }
  } catch (error) {
    alert("ログインに失敗しました。");
    router.push({ path: "/sections/account/sign-in" });
  }
};

handleOAuthKakao();
</script>
