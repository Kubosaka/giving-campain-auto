function loadUserInfo() {
  chrome.storage.local.get("userInfo", (result) => {
    if (result.userInfo) {
      const userInfo = result.userInfo;
      for (const key in userInfo) {
        const element = document.getElementById(key);
        if (element) {
          element.value = userInfo[key];
        }
      }
    }
  });
}

function saveUserInfo() {
  const userInfo = {
    lastName: document.getElementById("lastName").value,
    firstName: document.getElementById("firstName").value,
    kanaLastName: document.getElementById("kanaLastName").value,
    kanaFirstName: document.getElementById("kanaFirstName").value,
    gender: document.getElementById("gender").value,
    email: document.getElementById("email").value,
    tel: document.getElementById("tel").value,
    birthYear: Number(document.getElementById("birthYear").value),
    birthMonth: Number(document.getElementById("birthMonth").value),
    birthDay: Number(document.getElementById("birthDay").value),
    prefecture: document.getElementById("prefecture").value,
    city: document.getElementById("city").value,
    groupRelationship: Number(
      document.getElementById("groupRelationship").value
    ),
    universityName: document.getElementById("universityName").value,
    graduationYear: Number(document.getElementById("graduationYear").value),
    graduationMonth: Number(document.getElementById("graduationMonth").value),
    majorCategory: document.getElementById("majorCategory").value,
    faculty: document.getElementById("faculty").value,
    department: document.getElementById("department").value,
    message: document.getElementById("message").value,
  };

  chrome.storage.local.set({ userInfo }, () => {
    window.alert("ユーザ情報を保存しました");
  });
}

document.addEventListener("DOMContentLoaded", loadUserInfo);
document.getElementById("submitBtn").addEventListener("click", saveUserInfo);
/*
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

  chrome.storage.local.set({ userInfo }, () => {
    window.alert("ユーザ情報を保存しました");
  });
});
*/
