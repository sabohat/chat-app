// Scroll bottom of the chat
const messages = document.getElementById('scroll-box');

function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
  }
  
  scrollToBottom();