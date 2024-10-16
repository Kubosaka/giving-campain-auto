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

async function autoInput(userInfo) {
  console.log("Auto inputting user info:", userInfo);
  await delayedFunction();

  const reactSelectInputs = document.querySelectorAll("#react-select-rs-input");

  if (reactSelectInputs) {
    reactSelectInputs[0].dispatchEvent(arrowDownEvent);

    setTimeout(() => {
      const options = document.querySelectorAll(".rs__option");
      if (options.length !== 0) {
        options[getYearIndex(userInfo.birthYear)].click();
      }
    }, 500);

    reactSelectInputs[1].dispatchEvent(arrowDownEvent);
    setTimeout(() => {
      const options = document.querySelectorAll(".rs__option");
      if (options.length !== 0) {
        options[getMonthOrDayIndex(userInfo.birthMonth)].click();
      }
    }, 500);

    reactSelectInputs[2].dispatchEvent(arrowDownEvent);
    setTimeout(() => {
      const options = document.querySelectorAll(".rs__option");
      if (options.length !== 0) {
        options[getMonthOrDayIndex(userInfo.birthDay)].click();
      }
    }, 500);

    reactSelectInputs[4].dispatchEvent(arrowDownEvent);
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
  setInputValue(lastNameInput, userInfo.lastName);
  setInputValue(firstNameInput, userInfo.firstName);
  setInputValue(kanaLastNameInput, userInfo.kanaLastName);
  setInputValue(kanaFirstNameInput, userInfo.kanaFirstName);
  setInputValue(emailInput, userInfo.email);
  setInputValue(phoneNumberInput, userInfo.tel);

  if (userInfo.gender === "男性") {
    document.querySelector('input[name="gender"][value="male"]').click();
  } else if (userInfo.gender === "女性") {
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
