function loadFromLocalStorage() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get("userInfo", (result) => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      resolve(result.userInfo || null);
    });
  });
}

function getGcParticipationCategoryIndex() {
  // 技大生の他大学への投票を想定しているため固定値
  // 0: 大学生 1: 卒業生  2: 教職員  3: ご家族・ご親戚  4: 他大学の学生 5: その他
  return 4;
}

function getBirthYearIndex(year) {
  return 2025 - year;
}

function getGraduationYearIndex(year) {
  return 2033 - year;
}

function getIndexFromNumber(number) {
  return number - 1;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function delayedFunction() {
  await delay(1000);
}

const arrowDownEvent = new KeyboardEvent("keydown", {
  key: "ArrowDown",
  keyCode: 40,
  bubbles: true,
  cancelable: true,
});

function setInputValue(element, value) {
  if (!element) return;
  const inputEvent = new Event("input", { bubbles: true });
  element.value = value; // ここで値を設定
  element.dispatchEvent(inputEvent); // input イベントを発火させる
}

function setRadioValue(element) {
  if (element) {
    element.checked = true;
    element.dispatchEvent(new Event("click", { bubbles: true }));
  }
}

function setSelectValue(element, value) {
  if (!element) return;
  element.value = value;
  element.dispatchEvent(new Event("change", { bubbles: true }));
}

async function selectReactSelectOption(inputElement, index) {
  if (!inputElement || index === undefined) return;

  // ドロップダウンを開く
  inputElement.dispatchEvent(arrowDownEvent);
  await delay(300); // オプションがレンダリングされるのを待つ

  const options = document.querySelectorAll(".rs__option");
  if (options.length !== 0) {
    options[index].click();
  }
}

async function autoInput(userInfo) {
  console.log("Auto inputting user info:", userInfo);
  await delayedFunction();

  // react-selectの各要素を個別に取得
  const gcParticipationCategoryInput = document.getElementById(
    "gcParticipationCategory"
  );
  const birthYearInput = document.getElementById("birthdayYear");
  const birthMonthInput = document.getElementById("birthdayMonth");
  const birthDayInput = document.getElementById("birthdayDay");
  // 関係性と都道府県はname属性でinputを特定
  const relationshipInput = document.querySelector(
    'div[class*="-control"] input[id^="react-select-"]'
  ); // ページ上の最初の汎用react-select
  const prefectureInput = document.getElementById("hometownPrefectureId");

  // 各react-selectの値を設定
  // 応援団体の参加区分
  await selectReactSelectOption(
    gcParticipationCategoryInput,
    getGcParticipationCategoryIndex()
  );
  await delay(200);
  // 生年月日
  await selectReactSelectOption(
    birthYearInput,
    getBirthYearIndex(userInfo.birthYear)
  );
  await delay(200);
  await selectReactSelectOption(
    birthMonthInput,
    getIndexFromNumber(userInfo.birthMonth)
  );
  await delay(200);
  await selectReactSelectOption(
    birthDayInput,
    getIndexFromNumber(userInfo.birthDay)
  );
  await delay(200);
  await selectReactSelectOption(relationshipInput, userInfo.groupRelationship);
  await delay(200);
  await selectReactSelectOption(prefectureInput, userInfo.prefecture);
  await delay(200);

  const universityInput = document.getElementById("universityId");
  const graduationYearInput = document.getElementById("graduationYear");
  const graduationMonthInput = document.getElementById("graduationMonth");
  // 大学情報
  setInputValue(universityInput, userInfo.universityName);
  await selectReactSelectOption(universityInput, 0);
  await delay(200);
  await selectReactSelectOption(
    graduationYearInput,
    getGraduationYearIndex(userInfo.graduationYear)
  );
  await delay(200);
  await selectReactSelectOption(
    graduationMonthInput,
    getIndexFromNumber(userInfo.graduationMonth)
  );
  await delay(200);

  await delayedFunction();

  // その他入力
  const lastNameInput = document.querySelector('input[name="lastName"]');
  if (lastNameInput) setInputValue(lastNameInput, userInfo.lastName);

  const firstNameInput = document.querySelector('input[name="firstName"]');
  if (firstNameInput) setInputValue(firstNameInput, userInfo.firstName);

  const kanaLastNameInput = document.querySelector(
    'input[name="kanaLastName"]'
  );
  if (kanaLastNameInput)
    setInputValue(kanaLastNameInput, userInfo.kanaLastName);

  const kanaFirstNameInput = document.querySelector(
    'input[name="kanaFirstName"]'
  );
  if (kanaFirstNameInput)
    setInputValue(kanaFirstNameInput, userInfo.kanaFirstName);

  const emailInput = document.querySelector('input[name="email"]');
  if (emailInput) setInputValue(emailInput, userInfo.email);

  const phoneNumberInput = document.querySelector('input[name="phoneNumber"]');
  if (phoneNumberInput) setInputValue(phoneNumberInput, userInfo.tel);

  if (userInfo.gender === "男性") {
    document.querySelector('input[name="gender"][value="male"]')?.click();
  } else if (userInfo.gender === "女性") {
    document.querySelector('input[name="gender"][value="female"]')?.click();
  } else if (userInfo.gender === "回答しない") {
    document.querySelector('input[name="gender"][value="unanswered"]')?.click();
  }

  const cityInput = document.querySelector('input[name="hometownCity"]');
  if (cityInput) setInputValue(cityInput, userInfo.city);

  // 文理区分
  if (userInfo.majorCategory) {
    setRadioValue(
      document.querySelector(
        `input[name="majorCategory"][value="${userInfo.majorCategory}"]`
      )
    );
  }

  // 学部・学科
  const facultyInput = document.querySelector('input[name="faculty"]');
  if (facultyInput) setInputValue(facultyInput, userInfo.faculty);

  const departmentInput = document.querySelector('input[name="department"]');
  if (departmentInput) setInputValue(departmentInput, userInfo.department);

  // 投票理由 (固定値)
  setRadioValue(
    document.querySelector(
      'input[name="reasonForVoting"][value="project_i_want_to_support"]'
    )
  );

  // 団体所属 (固定値)
  setRadioValue(
    document.querySelector('input[name="isMemberOfTargetGroup"][value="false"]')
  );

  // どのようにしてGIVING CAMPAIGNを知りましたか？でその他を選択
  setRadioValue(
    document.querySelector('input[name="gc2025Sources"][value="other"]')
  );

  // 同意する
  setRadioValue(document.querySelector('input[name="policyApproval"]'));
}

loadFromLocalStorage()
  .then((userInfo) => {
    if (userInfo) {
      console.log("User info found:", userInfo);
      autoInput(userInfo);
    } else {
      console.log("No user info found.");
      return null;
    }
  })
  .catch((error) => {
    console.error("Error loading from storage:", error);
  });
