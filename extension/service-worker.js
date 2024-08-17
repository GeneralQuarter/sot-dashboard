chrome.action.onClicked.addListener(function () {
  chrome.tabs.create({
    url: chrome.runtime.getURL('dist/index.html')
  });
});

chrome.runtime.onInstalled.addListener(async () => {
  const rules = [{
    id: 1,
    action: {
      type: 'modifyHeaders',
      requestHeaders: [{
        header: 'Referer',
        operation: 'set',
        value: 'https://www.seaofthieves.com/'
      }],
    },
    condition: {
      domains: [chrome.runtime.id],
      urlFilter: `|https://www.seaofthieves.com/api`,
      resourceTypes: ['xmlhttprequest'],
    }
  }];

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: rules.map(r => r.id),
    addRules: rules,
  });
});
