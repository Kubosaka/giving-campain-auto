const LAST_NAME = "山田";
const FIRST_NAME = "太郎";
const KANA_LAST_NAME = "やまだ";
const KANA_FIRST_NAME = "たろう";
const GENDER = "男性";
const BIRTH_YEAR = 2000;
const BIRTH_MONTH = 1;
const BIRTH_DAY = 1;
const EMAIL = "test@exmaple.com";
const TEL = "00000000000";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function delayedFunction() {
  await delay(1000);
}

function getYearIndex(year) {
  return 2024 - year;
}

function getMonthOrDayIndex(number) {
  return number - 1;
}

const arrowDownEvent = new KeyboardEvent("keydown", {
  key: "ArrowDown",
  keyCode: 40,
  bubbles: true,
  cancelable: true,
});

function setInputValue(element, value) {
  const inputEvent = new Event("input", { bubbles: true });
  element.value = value; // ここで値を設定
  element.dispatchEvent(inputEvent); // input イベントを発火させる
}

function setRadioValue(element) {
  element.checked = true;
  element.dispatchEvent(new Event("click", { bubbles: true }));
}

async function autoInput() {
  await delayedFunction();

  const reactSelectInputs = document.querySelectorAll("#react-select-rs-input");

  if (reactSelectInputs) {
    reactSelectInputs[0].dispatchEvent(arrowDownEvent);

    setTimeout(() => {
      const options = document.querySelectorAll(".rs__option");
      if (options.length !== 0) {
        options[getYearIndex(BIRTH_YEAR)].click();
      }
    }, 500);

    reactSelectInputs[1].dispatchEvent(arrowDownEvent);
    setTimeout(() => {
      const options = document.querySelectorAll(".rs__option");
      if (options.length !== 0) {
        options[getMonthOrDayIndex(BIRTH_MONTH)].click();
      }
    }, 500);

    reactSelectInputs[2].dispatchEvent(arrowDownEvent);
    setTimeout(() => {
      const options = document.querySelectorAll(".rs__option");
      if (options.length !== 0) {
        options[getMonthOrDayIndex(BIRTH_DAY)].click();
      }
    }, 500);

    reactSelectInputs[3].dispatchEvent(arrowDownEvent);
    setTimeout(() => {
      const options = document.querySelectorAll(".rs__option");
      if (options.length !== 0) {
        options[5].click();
      }
    }, 500);
  }

  await delayedFunction();

  // その他入力
  const lastNameInput = document.querySelector('input[name="lastName"]');
  const firstNameInput = document.querySelector('input[name="firstName"]');
  const kanaLastNameInput = document.querySelector(
    'input[name="kanaLastName"]'
  );
  const kanaFirstNameInput = document.querySelector(
    'input[name="kanaFirstName"]'
  );
  const emailInput = document.querySelector('input[name="email"]');
  const phoneNumberInput = document.querySelector('input[name="phoneNumber"]');
  setInputValue(lastNameInput, LAST_NAME);
  setInputValue(firstNameInput, FIRST_NAME);
  setInputValue(kanaLastNameInput, KANA_LAST_NAME);
  setInputValue(kanaFirstNameInput, KANA_FIRST_NAME);
  setInputValue(emailInput, EMAIL);
  setInputValue(phoneNumberInput, TEL);

  if (GENDER === "男性") {
    document.querySelector('input[name="gender"][value="male"]').click();
  } else if (GENDER === "女性") {
    document.querySelector('input[name="gender"][value="female"]').click();
  }

  // どのようにしてGIVING CAMPAIGNを知りましたか？でその他を選択
  document
    .querySelector('input[name="otherRelationship"][value="other"]')
    .click();

  setRadioValue(
    document.querySelector('input[name="gc2024Sources"][value="other"]')
  );

  // 同意する
  setRadioValue(document.querySelector('input[name="policyApproval"]'));
}

async function confirmAutoInput() {
  await autoInput();
}

confirmAutoInput();
