chrome.storage.local.get("userInfo", (result) => {
  if (result.userInfo) {
    let userInfo = result.userInfo;
    document.getElementById("lastName").value = userInfo.lastName;
    document.getElementById("firstName").value = userInfo.firstName;
    document.getElementById("kanaLastName").value = userInfo.kanaLastName;
    document.getElementById("kanaFirstName").value = userInfo.kanaFirstName;
    document.getElementById("gender").value = userInfo.gender;
    document.getElementById("email").value = userInfo.email;
    document.getElementById("tel").value = userInfo.tel;
    document.getElementById("birthYear").value = userInfo.birthYear;
    document.getElementById("birthMonth").value = userInfo.birthMonth;
    document.getElementById("birthDay").value = userInfo.birthDay;
    document.getElementById("prefecture").value = userInfo.prefecture;
    document.getElementById("city").value = userInfo.city;
    document.getElementById("message").value = userInfo.message;
  }
});

document.getElementById("submitBtn").addEventListener("click", () => {
  const lastName = document.getElementById("lastName").value;
  const firstName = document.getElementById("firstName").value;
  const kanaLastName = document.getElementById("kanaLastName").value;
  const kanaFirstName = document.getElementById("kanaFirstName").value;
  const gender = document.getElementById("gender").value;
  const email = document.getElementById("email").value;
  const tel = document.getElementById("tel").value;
  const birthYear = Number(document.getElementById("birthYear").value);
  const birthMonth = Number(document.getElementById("birthMonth").value);
  const birthDay = Number(document.getElementById("birthDay").value);
  const prefecture = document.getElementById("prefecture").value;
  const city = document.getElementById("city").value;
  const message = document.getElementById("message").value;

  const userInfo = {
    lastName,
    firstName,
    kanaLastName,
    kanaFirstName,
    gender,
    birthYear,
    birthMonth,
    birthDay,
    email,
    tel,
    prefecture,
    city,
    message,
  };

  console.log(userInfo);

  chrome.storage.local.set({ userInfo }, () => {
    window.alert("ユーザ情報を保存しました");
  });
});
