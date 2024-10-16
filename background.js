chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "autoInputInfo",
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
  if (info.menuItemId === "autoInputInfo") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["autoInputInfo.js"],
    });
  }

  if (info.menuItemId === "inputMessage") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["message.js"],
    });
  }
});
