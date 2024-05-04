function isEmpty(str) {
  return str.length === 0;
}

function containsSpecialCharacter(str) {
  const regex = /[!@#$%^&*(),.?":{}|<>]/;
  return regex.test(str);
}

function isOver20Characters(str) {
  const regex = /^.{20,}$/;
  return regex.test(str);
}

function isUnder5Characters(str) {
  return str.length <= 5;
}

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function isOver8AndUnder21(password) {
  if (password.length >= 8 && password.length <= 20) {
    return false;
  }
  return true;
}

function isBetween3And15Characters(str) {
  return str.length < 3 || str.length > 15;
}

function passwordCheckSignIn(password) {
  if (!containsSpecialCharacter(password) || isOver8AndUnder21(password)) {
    alert(
      "パスワードは８文字から２０文字以内及び特集文字を１つ以上含む必要があります。"
    );
    return false;
  }
  return true;
}

function isSame(password, confirmPassword) {
  if (password === confirmPassword) {
    return false;
  }
  return true;
}
export function validateImageFile(fileInput) {
  const allowedExtensions = ["jpg", "jpeg", "png"];
  const fileName = fileInput.value.toLowerCase();
  const fileSize = fileInput.files[0].size;

  const fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1);
  if (!allowedExtensions.includes(fileExtension)) {
    alert("이미지 파일은 jpg 또는 png 형식이어야 합니다.");
    fileInput.value = "";
    return false;
  }

  const maxSize = 5 * 1024 * 1024;
  if (fileSize > maxSize) {
    alert("이미지 파일의 크기는 5MB를 넘을 수 없습니다.");
    fileInput.value = "";
    return false;
  }

  return true; // 유효성 검사 통과
}
export function idCheckSignIn(id) {
  const user_id = id.split("@");
  if (!validateEmail(id)) {
    alert("アカウント名に特集文字は入れません。");
    return false;
  }
  if (isOver20Characters(user_id[0]) || isUnder5Characters(user_id[0])) {
    alert("アカウント名はE-Mailを除いて6~20文字を入力してください。");
    return false;
  }
  return true;
}

export function signInCheck(id, password) {
  if (!idCheckSignIn(id)) {
    return true;
  }
  if (!passwordCheckSignIn(password)) {
    return true;
  }
  return false;
}

export function signUpCheck(
  user_id,
  user_password,
  user_confirmPassword,
  user_email,
  user_nickname,
  user_profileImgInput
) {
  if (
    isEmpty(user_id) ||
    isEmpty(user_password) ||
    isEmpty(user_confirmPassword) ||
    isEmpty(user_email) ||
    isEmpty(user_profileImgInput.value)
  ) {
    alert("全ての項目を入力してください。");
    return;
  }
  if (isSocialSignIn(user_id)) {
    alert("kakao及びgoogleは一般登録できません。");
    return;
  }
  if (isSame(user_password, user_confirmPassword)) {
    alert("同じパスワードを入力してください。");
    return;
  }
  if (!passwordCheckSignIn(user_password)) {
    return;
  }
  if (!validateEmail(user_email)) {
    alert("メールアドレスを正しく入力してください。");
    return;
  }
  if (isBetween3And15Characters(user_nickname)) {
    alert("ニックネームは3~15文字を入力してください。");
    return;
  }
  if (!user_profileImgInput.value) {
    alert("プロフィール画像を選択してください。");
    return;
  }
  if (!validateImageFile(user_profileImgInput)) {
    return;
  }
  return true;
}

export function profileUpdateCheck(
  user_id,
  user_password,
  user_email,
  user_nickname,
  user_profileImgInput
) {
  console.log(user_id);
  console.log(user_password);
  console.log(user_email);
  console.log(user_nickname);
  console.log(user_profileImgInput);
  if (
    isEmpty(user_id) ||
    isEmpty(user_password) ||
    isEmpty(user_email) ||
    isEmpty(user_nickname)
  ) {
    alert("全ての項目を入力してください。");
    return;
  }
  if (!isSocialSignIn(user_id)) {
    if (!passwordCheckSignIn(user_password)) {
      return;
    }
  }
  if (!validateEmail(user_email)) {
    alert("メールアドレスを正しく入力してください。");
    return;
  }
  if (isBetween3And15Characters(user_nickname)) {
    alert("ニックネームは3~10文字を入力してください。");
    return;
  }
  if (user_profileImgInput.files[0] != undefined) {
    if (!validateImageFile(user_profileImgInput)) {
      return;
    }
  }
  return true;
}

export function isSocialSignIn(user_id) {
  if (
    user_id.indexOf("@kakao.com") === -1 &&
    user_id.indexOf("@gmail.com") === -1
  ) {
    return false;
  }
  return true;
}

export function isLocalImg(user_profile_img) {
  if (
    user_profile_img.indexOf("http://") === -1 &&
    user_profile_img.indexOf("https://") === -1
  ) {
    return true;
  }
  return false;
}
