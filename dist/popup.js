// fetch current tabs selected text, then send message to background
chrome.tabs.executeScript({ code: "window.getSelection().toString()" }, function (selection) {
    const textareaElement = document.getElementById("row-text")
    textareaElement.value = selection
})