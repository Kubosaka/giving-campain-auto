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

function setInputValue(element, value) {
  if (!element || value === undefined) return;
  const inputEvent = new Event("input", { bubbles: true });
  element.value = value;
  element.dispatchEvent(inputEvent);
}

async function autoInput() {
  const userInfo = await loadFromLocalStorage();
  if (!userInfo || !userInfo.message) return;
  const messageInput = document.querySelector('textarea[name="message"]');
  setInputValue(messageInput, userInfo.message);
}

autoInput();
