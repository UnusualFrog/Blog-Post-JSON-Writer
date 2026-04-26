const emojiPicker = document.querySelector('emoji-picker');

function emojiToggleHandler() {
    emojiPicker.classList.toggle("emoji");
    // formActionButton.classList.toggle("active");
}

function toggle() {
  if (emojiPicker.style.display === "none") {
    emojiPicker.style.display = "block";
  } else {
    emojiPicker.style.display = "none";
  }
}

document.querySelector('emoji-picker')
    .addEventListener('emoji-click', event => console.log(event.detail));

console.log("Hello World")