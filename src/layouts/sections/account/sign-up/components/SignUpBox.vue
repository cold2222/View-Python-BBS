<template>
  <div class="sign-up-container">
    <div class="sign-up-header">sign up</div>
    <div class="sign-up-box">
      <div>
        <label for="user_id">ID</label>
        <input
          @change="handleId"
          v-model="user_id"
          ref="id"
          type="text"
          name="user_id"
          id="user_id"
          autocomplete="off"
        />
        <button
          ref="duplicateCheckButton"
          v-if="duplicateCheckButton === false"
          @click="duplicateCheck"
        >
          Duplicate Check
        </button>
        <button
          @click="handleDuplicateCheckButton"
          ref="reenterButton"
          v-else-if="duplicateCheckButton === true"
        >
          reenter
        </button>
      </div>
      <div>
        <label for="user_password">PassWord</label>
        <input
          @change="handlePassword"
          v-model="user_password"
          ref="password"
          type="password"
          name="user_password"
        />
      </div>
      <div>
        <label for="user_password">Confirm Password</label>
        <input
          @change="handleConfirmPassword"
          v-model="user_confirm_password"
          ref="confirm_password"
          type="password"
          name="user_confirm_password"
        />
      </div>
      <div>
        <label for="user_e_mail">Email</label>
        <input
          @change="handleEmail"
          v-model="user_e_mail"
          ref="e_mail"
          type="email"
          name="user_e_mail"
        />
      </div>
      <div class="profile_img_box">
        <div class="profile_img_box_header">Profile Img</div>
        <div class="profile_img_box_content">
          <input
            v-model="user_profile_image"
            class="profile_img_name"
            placeholder="only jpg or png"
            readonly
          />
          <label for="user_profile_image">Upload</label>
          <input
            type="file"
            @change="insertFileName"
            ref="file"
            name="user_profile_image"
            id="user_profile_image"
            accept=".jpg,.png"
          />
        </div>
      </div>
    </div>
    <div class="sign-up-button"><button @click="signUp">clear</button></div>
  </div>
</template>

<script>
import axios from "axios";
import {
  idCheckSignIn,
  validateImageFile,
  signUpCheck,
  isSocialSignIn,
} from "../../utill/validationCheck.js";

export default {
  data() {
    return {
      user_id: "",
      user_password: "",
      user_confirm_password: "",
      user_e_mail: "",
      user_profile_image: "only jpg or png",
      duplicateCheckButton: false,
    };
  },
  methods: {
    handleId() {
      this.$refs.id.value = this.user_id;
    },
    handlePassword() {
      this.$refs.password.value = this.user_password;
    },
    handleConfirmPassword() {
      this.$refs.confirm_password.value = this.user_confirm_password;
    },
    handleEmail() {
      this.$refs.e_mail.value = this.user_e_mail;
    },
    handleDuplicateCheckButton() {
      const idInput = this.$refs.id;

      if (this.duplicateCheckButton == false) {
        idInput.disabled = true;
        idInput.style = "background-color: #f2f2f2;";

        this.duplicateCheckButton = true;
      } else if (this.duplicateCheckButton == true) {
        idInput.disabled = false;
        idInput.style = "background-color: white;";
        this.user_id = "";

        this.duplicateCheckButton = false;
      }
    },
    async duplicateCheck() {
      if (isSocialSignIn(this.user_id)) {
        alert("kakao及びgoogleは一般登録できません。");
        return;
      }
      if (!idCheckSignIn(this.user_id)) {
        return;
      }
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/user/duplicate-check/${this.user_id}`,
          {
            validateStatus: function (status) {
              return (status >= 200 && status < 300) || status === 409;
            },
          }
        );
        if (response.status === 200) {
          if (
            confirm(
              "使用可能なアカウント名です。このアカウント名を使用しますか？"
            )
          ) {
            this.handleDuplicateCheckButton();
          }
        } else if (response.status === 409) {
          alert("既に存在するアカウント名です。");
        }
      } catch (error) {
        alert(
          "アカウント重複チェックに失敗しました。ネットワーク状況を確認してください。"
        );
        this.$router.go(-1);
      }
    },
    async signUp() {
      if (this.duplicateCheckButton == false) {
        alert("重複チェックをしてください。");
        return;
      }
      if (
        !signUpCheck(
          this.user_id,
          this.user_password,
          this.user_confirm_password,
          this.user_e_mail,
          this.$refs.file
        )
      ) {
        return;
      }
      try {
        const formData = new FormData();
        formData.append("user_id", this.user_id);
        formData.append("user_password", this.user_password);
        formData.append("user_e_mail", this.user_e_mail);

        const file = this.$refs.file.files[0];
        formData.append("user_profile_img", file);
        const response = await axios.post(
          `http://127.0.0.1:5000/user`,
          formData,
          {
            validateStatus: function (status) {
              return (status >= 200 && status < 300) || status === 409;
            },
          }
        );
        if (response.status === 200) {
          alert("会員登録に成功しました。");
          this.$router.push({ path: "/sections/account/sign-in" });
        } else if (response.status === 409) {
          alert("会員登録に登録に失敗しました。");
          this.$router.go(0);
        }
      } catch (error) {
        alert("会員登録に失敗しました。ネットワーク状況を確認してください。");
        this.$router.go(0);
      }
    },
    insertFileName(event) {
      if (!validateImageFile(event.target)) {
        this.user_profile_image = "only jpg or png";
        return;
      }
      const img_file = event.target.files[0];
      console.log("선택한 파일 이름:", img_file.name);
      this.user_profile_image = img_file.name;
      document.querySelector(".profile_img_name").value = img_file.name;
    },
  },
  mounted() {
    this.$refs.id.focus();
  },
};
</script>

<style scoped>
@import "./SignUpBox.css";
</style>
