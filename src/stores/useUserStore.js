import { defineStore } from "pinia";
import { ref, getCurrentInstance } from "vue";
import { userApi } from "@/api/userApi";
import {
  profileUpdateCheck,
  isSocialSignIn,
  idCheckSignIn,
  signInCheck,
  signUpCheck,
} from "@/utill/validationCheck";
import { useUtillStore } from "@/stores/useUtillStore";
import { useRouter } from "vue-router";
export const useUserStore = defineStore(
  "user",
  () => {
    const { proxy } = getCurrentInstance();
    const router = useRouter();

    const utillStore = useUtillStore();
    const { move_home } = utillStore;

    // user profile state
    const user_id = ref("");
    const user_password = ref("");
    const user_e_mail = ref("");
    const user_nickname = ref("");
    const user_profile_img = ref("");
    const user_profile_img_input = ref(null);

    // user sign out
    const signOut = () => {
      if (confirm("ログアウトしますか？")) {
        proxy.$cookies.remove("user_jwt");
        user_id.value = "";
        user_password.value = "";
        user_e_mail.value = "";
        user_nickname.value = "";
        user_profile_img.value = "";

        move_home();
      }
    };
    // sign in api
    const signInApi = (user_input_id, user_input_password) => {
      if (signInCheck(user_input_id, user_input_password)) {
        return;
      }

      const data = {
        user_id: user_input_id,
        user_password: user_input_password,
      };

      userApi
        .signIn(data)
        .then((response) => {
          if (response.status === 200) {
            proxy.$cookies.set("user_jwt", response.data.user_jwt);

            user_id.value = response.data.user_id;
            user_password.value = response.data.user_password;
            user_e_mail.value = response.data.user_e_mail;
            user_nickname.value = response.data.user_nickname;
            user_profile_img.value = response.data.user_profile_img;
            router.push({ path: "/" }).then(() => {
              router.go(0);
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            alert("Login failed. Please check your account and password.");
          } else {
            alert("Login failed. Please check your network connection.");
          }
        });
    };

    // user profile save
    const saveUserProfileApi = (
      payload,
      user_profile_img_input,
      changeProfile
    ) => {
      if (!confirm("修正しますか？")) {
        return;
      }
      if (
        !profileUpdateCheck(
          payload.user_id,
          payload.user_password,
          payload.user_e_mail,
          payload.user_nickname,
          user_profile_img_input
        )
      ) {
        return;
      }
      const formData = new FormData();
      formData.append("user_id", payload.user_id);
      formData.append("user_password", payload.user_password);
      formData.append("user_e_mail", payload.user_e_mail);
      formData.append("user_nickname", payload.user_nickname);
      formData.append("user_profile_img", user_profile_img_input.files[0]);

      userApi
        .saveProfile(formData)
        .then((response) => {
          if (response.status === 200) {
            user_id.value = response.data.user_id;
            user_password.value = response.data.user_password;
            user_e_mail.value = response.data.user_e_mail;
            user_nickname.value = response.data.user_nickname;
            user_profile_img.value = response.data.user_profile_img;
          }
          changeProfile();
        })
        .catch((error) => {
          if (error.response.status === 400) {
            alert("会員情報修正に失敗しました。パラメータを確認してください。");
          } else {
            alert(
              "会員情報修正に失敗しました。ネットワーク状況を確認してください。"
            );
          }
        });
    };
    // kakao sign in api
    const kakaoSignInApi = (code) => {
      userApi
        .kakaoSignIn(code)
        .then((response) => {
          if (response.status === 200) {
            user_id.value = response.data.user_id;
            user_password.value = response.data.user_password;
            user_e_mail.value = response.data.user_e_mail;
            user_nickname.value = response.data.user_nickname;
            user_profile_img.value = response.data.user_profile_img;

            proxy.$cookies.set("user_jwt", response.data.user_jwt);
            move_home();
          }
        })
        .catch((error) => {
          console.log(error);
          alert("認証に失敗しました。");
          router.push({ name: "account-sign-in" });
        });
    };
    // google sign in api
    const googleSignInApi = (code) => {
      userApi
        .googleSignIn(code)
        .then((response) => {
          if (response.status === 200) {
            user_id.value = response.data.user_id;
            user_password.value = response.data.user_password;
            user_e_mail.value = response.data.user_e_mail;
            user_nickname.value = response.data.user_nickname;
            user_profile_img.value = response.data.user_profile_img;

            proxy.$cookies.set("user_jwt", response.data.user_jwt);
            move_home();
          }
        })
        .catch((error) => {
          console.log(error);
          alert("認証に失敗しました。");
          router.push({ name: "account-sign-in" });
        });
    };

    // delete Account Api
    const deleteAccountApi = (password) => {
      if (!confirm("本当に削除しますか？")) {
        return;
      }
      console.log(user_password.value, password);
      if (user_password.value != password) {
        alert("パスワードが間違えました。");
        return;
      }
      userApi
        .deleteAccount()
        .then((response) => {
          if (response.status === 200) {
            user_id.value = "";
            user_password.value = "";
            user_e_mail.value = "";
            user_nickname.value = "";
            user_profile_img.value = "";

            proxy.$cookies.remove("user_jwt");
            move_home();
          }
        })
        .catch((error) => {
          if (error.response.status === 403) {
            alert("パスワードが間違えました。");
          }
        });
    };
    // user duplicate check api
    const userDuplicateCheckApi = (user_id, callback) => {
      if (isSocialSignIn(user_id)) {
        alert("kakao及びgoogleは一般登録できません。");
        return;
      }
      if (!idCheckSignIn(user_id)) {
        return;
      }

      const data = {
        user_id: user_id,
      };
      userApi
        .userDuplicateCheck(data)
        .then((response) => {
          if (response.status === 200) {
            if (
              confirm(
                "使用可能なアカウント名です。このアカウント名を使用しますか？"
              )
            ) {
              callback();
            }
          }
        })
        .catch((error) => {
          if (error.response.status === 409) {
            alert("既に存在するアカウント名です。");
          } else {
            alert(
              "アカウント重複チェックに失敗しました。ネットワーク状況を確認してください。"
            );
          }
        });
    };
    // sign up api
    const signUpApi = (
      user_id,
      user_password,
      user_confirm_password,
      user_e_mail,
      user_nickname,
      user_profile_img_input
    ) => {
      if (
        !signUpCheck(
          user_id,
          user_password,
          user_confirm_password,
          user_e_mail,
          user_nickname,
          user_profile_img_input
        )
      ) {
        return;
      }

      const formData = new FormData();
      formData.append("user_id", user_id);
      formData.append("user_password", user_password);
      formData.append("user_e_mail", user_e_mail);
      formData.append("user_nickname", user_nickname);

      const file = user_profile_img_input.files[0];
      formData.append("user_profile_img", file);

      userApi
        .signUp(formData)
        .then((response) => {
          if (response.status === 200) {
            alert("会員登録に成功しました。");
            router.push({ path: "/sections/account/sign-in" });
          }
        })
        .catch((error) => {
          if (error.response.status === 409) {
            alert("会員登録に登録に失敗しました。");
          } else {
            alert(
              "会員登録に失敗しました。ネットワーク状況を確認してください。"
            );
          }
        });
    };

    return {
      user_id,
      user_password,
      user_e_mail,
      user_nickname,
      user_profile_img,
      user_profile_img_input,
      saveUserProfileApi,
      signOut,
      signInApi,
      signUpApi,
      deleteAccountApi,
      kakaoSignInApi,
      googleSignInApi,
      userDuplicateCheckApi,
    };
  },
  { persist: true, Storage: sessionStorage }
);
