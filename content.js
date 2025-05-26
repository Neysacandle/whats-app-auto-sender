let currentIndex = 0;

function getRandomDelay(min = 20000, max = 45000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sendNext(contacts, index) {
  if (index >= contacts.length) {
    alert("All messages sent!");
    return;
  }

  const contact = contacts[index];
  const number = contact.Number || contact.number;
  const message = encodeURIComponent(contact.Message || "Hello from Chrome Extension!");
  const url = `https://web.whatsapp.com/send?phone=${number}&text=${message}`;

  window.location.href = url;

  setTimeout(() => {
    const sendButton = document.querySelector('span[data-icon="send"]');
    if (sendButton) sendButton.click();

    const nextDelay = getRandomDelay();
    setTimeout(() => sendNext(contacts, index + 1), nextDelay);
  }, 7000); // initial delay to load chat
}

chrome.storage.local.get('contacts', ({ contacts }) => {
  if (!contacts || contacts.length === 0) return;
  sendNext(contacts, 0);
});
