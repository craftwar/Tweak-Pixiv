"use strict";
browser.tabs.onUpdated.addListener(
  (tabId, changeInfo, tab) => {
    browser.tabs.sendMessage(tabId, { url: changeInfo.url }).catch(() => { });
  },
  { properties: ["url"] }
);
