const MESSAGE = "技大祭実行委員会です。\n一緒に頑張りましょう!!";

function setInputValue(element, value) {
  const inputEvent = new Event("input", { bubbles: true });
  element.value = value;
  element.dispatchEvent(inputEvent);
}

function autoInput() {
  const messageInput = document.querySelector('textarea[name="message"]');
  setInputValue(messageInput, MESSAGE);
}

autoInput();
