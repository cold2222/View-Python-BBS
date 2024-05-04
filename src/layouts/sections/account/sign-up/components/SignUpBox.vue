<script setup>
import { ref, onMounted } from "vue";
import { validateImageFile } from "@/utill/validationCheck";
import { useUserStore } from "@/stores/useUserStore";

const userStore = useUserStore();

const user_id = ref("");
const user_password = ref("");
const user_confirm_password = ref("");
const user_e_mail = ref("");
const user_nickname = ref("");
const user_profile_img = ref("only jpg or png / required");
const user_profile_img_input = ref(null);
const duplicateCheckButton = ref(false);
const id_input = ref(null);

const duplicateButtonChange = () => {
  const idInput = id_input.value;

  if (duplicateCheckButton.value == false) {
    idInput.disabled = true;
    idInput.style = "background-color: #f2f2f2;";

    duplicateCheckButton.value = true;
  } else if (duplicateCheckButton.value == true) {
    idInput.disabled = false;
    idInput.style = "background-color: white;";
    user_id.value = "";

    duplicateCheckButton.value = false;
  }
};

const insertFileName = () => {
  if (!validateImageFile(user_profile_img_input.value)) {
    user_profile_img.value = "only jpg or png / required";
    return;
  }
  const img_file = user_profile_img_input.value.files[0];
  user_profile_img.value = img_file.name;
};

const duplicateCheckApi = () => {
  userStore.userDuplicateCheckApi(user_id.value, duplicateButtonChange);
};

const signUpApi = () => {
  if (duplicateCheckButton.value === false) {
    alert("重複検査をしてください。");
    return;
  }
  userStore.signUpApi(
    user_id.value,
    user_password.value,
    user_confirm_password.value,
    user_e_mail.value,
    user_nickname.value,
    user_profile_img_input.value
  );
};

onMounted(() => {
  if (id_input.value) {
    id_input.value.focus();
  }
});
</script>

<template>
  <div class="sign-up-container">
    <div class="sign-up-header">sign up</div>
    <div class="sign-up-box">
      <div>
        <label for="user_id">Id<span>*</span></label>
        <input
          v-model="user_id"
          ref="id_input"
          type="text"
          name="user_id"
          id="user_id"
          autocomplete="off"
          placeholder="excluding the email, between 6 and 20 characters / required "
        />
        <button
          v-if="duplicateCheckButton === false"
          @click="duplicateCheckApi"
        >
          Duplicate Check
        </button>
        <button
          @click="duplicateButtonChange"
          v-else-if="duplicateCheckButton === true"
        >
          reenter
        </button>
      </div>
      <div>
        <label for="user_password">PassWord<span>*</span></label>
        <input
          v-model="user_password"
          ref="password"
          type="password"
          name="user_password"
          placeholder="Between 8 and 20 characters with at least one special character / required"
        />
      </div>
      <div>
        <label for="user_password">Confirm Password<span>*</span></label>
        <input
          v-model="user_confirm_password"
          ref="confirm_password"
          type="password"
          name="user_confirm_password"
          placeholder="same value as the password / required"
        />
      </div>
      <div>
        <label for="user_e_mail">Email<span>*</span></label>
        <input
          v-model="user_e_mail"
          ref="e_mail"
          type="email"
          name="user_e_mail"
          placeholder="valid email address / required"
          autocomplete="off"
        />
      </div>
      <div>
        <label for="user_e_mail">Nickname<span>*</span></label>
        <input
          v-model="user_nickname"
          ref="nickname"
          type="text"
          name="user_nickname"
          placeholder="between 3 and 10 characters / required"
          autocomplete="off"
        />
      </div>
      <div class="profile_img_box">
        <div class="profile_img_box_header">Profile Img<span>*</span></div>
        <div class="profile_img_box_content">
          <input
            v-model="user_profile_img"
            class="profile_img_name"
            placeholder="only jpg or png / required"
            readonly
          />
          <label for="user_profile_image">Upload</label>
          <input
            type="file"
            @change="insertFileName"
            ref="user_profile_img_input"
            name="user_profile_image"
            id="user_profile_image"
            accept=".jpg,.png"
          />
        </div>
      </div>
    </div>
    <div class="sign-up-button"><button @click="signUpApi">clear</button></div>
  </div>
</template>

<style scoped>
@import "./SignUpBox.css";
</style>
