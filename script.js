const emojiPicker = document.querySelector('emoji-picker');
const emojiButton = document.getElementById("emojiButton");
const body_text = document.getElementById("message");
const tagText = document.getElementById("tagText");
const tagList = document.getElementById("tagList");
const tagError = document.getElementById("tagError");

let existingTagList = []

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

function addTag() {
  let tag = ""
  tag += tagText.value;
  tag += emojiButton.textContent;
  // console.log(tag);

  if (existingTagList.indexOf(tag) > -1){
    console.log("ERROR: Tag already added");
    tagError.textContent = "ERROR: Tag already added";
  } else {
    existingTagList += tag;
    tagError.textContent = "";

    var listItem = document.createElement('li');
    listItem.className="list-item"
    listItem.appendChild(document.createTextNode(tag));
    tagList.appendChild(listItem);
  }
}

document.querySelector('emoji-picker')
    .addEventListener('emoji-click', event => {
      let emoji = event.detail
      // console.log(event.detail);

      emojiButton.textContent = emoji.unicode;
      emojiPicker.classList.toggle("emoji");
    });

console.log("Hello World")