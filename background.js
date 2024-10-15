chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "inputInfo",
    title: "[GIVING CAMPAIGN] 情報入力",
    contexts: ["all"],
  });

  chrome.contextMenus.create({
    id: "inputMessage",
    title: "[GIVING CAMPAIGN] メッセージ入力",
    contexts: ["all"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "inputInfo") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["inputInfo.js"],
    });
  }

  if (info.menuItemId === "inputMessage") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["message.js"],
    });
  }
});
