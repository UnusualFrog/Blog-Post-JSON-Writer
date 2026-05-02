const JSON_PATH = "./blog_posts.json";

const emojiPicker = document.querySelector('emoji-picker');
const emojiButton = document.getElementById("emojiButton");
const bodyText = document.getElementById("message");
const tagTextElem = document.getElementById("tagText");
const tagList = document.getElementById("tagList");
const tagError = document.getElementById("tagError");
const postCount = document.getElementById("postCount");
const createError = document.getElementById("createError");

let existingTagList = [];
let existingPostsJSON;
let postCounter = 0;



// Add new tag to current new post
function addTag() {
  let tagText = ""
  let tagEmoji = ""

  // Trim whitespace, add emoji
  tagText += tagTextElem.value.trim();
  tagEmoji += emojiButton.textContent;
  tagFull = tagText + tagEmoji;
  // console.log(tag);

  // Check if tag exists
  if (existingTagList.indexOf(tagFull) > -1){
    console.log("ERROR: Tag already added");
    tagError.textContent = "ERROR: Tag already added";
  }
  else if (tagText ==  ""){
    console.log("ERROR: Tag text cannot be empty");
    tagError.textContent = "ERROR: Tag text cannot be empty";
  } else {
    // Track current existing tags
    existingTagList.push(tagFull);

    // Hide error text
    tagError.textContent = "";

    // Generate new list item
    var listItem = document.createElement('li');
    listItem.className="list-item"
    listItem.appendChild(document.createTextNode(tagFull));
    tagList.appendChild(listItem);

    // Clear fields
    tagTextElem.value = "";
  }
}

// Add new post to existing post data
function addPost() {
  if (bodyText.value == "") {
    createError.textContent = "ERROR: new post must contain body content";
  }
  else if(existingTagList.length == 0) {
    createError.textContent = "ERROR: new post must contain at least 1 tag";
  }
  else {
    let existingPosts = existingPostsJSON;

    // Get most recent post
    let mostRecentPost = existingPosts[Object.keys(existingPosts)[Object.keys(existingPosts).length - 1]];

    // Increment ID
    let id = mostRecentPost.ID + 1;
    // Get current Date
    let datePosted = new Date();

    // Build new post
    let newPost = {
      "ID": id,
      "main_content": bodyText.value,
      "date_posted": datePosted.toUTCString(),
      "tags": existingTagList
    }

    // Add new post to existing post data
    console.log("Added new post")
    existingPostsJSON[newPost.ID] = newPost;
    console.log(existingPostsJSON);

    // Update post counter
    postCounter++;
    postCount.textContent = postCounter;

    // Clear fields
    bodyText.value = ""
    tagTextElem.value = "";
    tagList.textContent = ""
    tagError.textContent = "";
    createError.textContent = ""
    existingTagList = [];
  }

  
}

function initialiseData() {
  console.log("Initialising data...")
  fetch(JSON_PATH)
    .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    return response.json();  
                })
    .then(data => {
                  //  Update existing post data
                  console.log(data)
                  existingPostsJSON = data;
                })
                
}

function updateData() {
             // Show download prompt
            let filename = "blog_posts.json";
            download(filename, existingPostsJSON);

            // Clear fields
            bodyText.value = ""
            tagList.textContent = ""
            tagError.textContent = "";
            existingTagList = [];
        }

// Prompt user download 
function download(file, text) {
            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(existingPostsJSON, null, 2));
            //creating an invisible element

            let element = document.createElement('a');
            element.setAttribute('href', dataStr);
            element.setAttribute('download', file);
            document.body.appendChild(element);
            element.click();

            document.body.removeChild(element);
        }

// emoji picker helper class
function emojiToggleHandler() {
    emojiPicker.classList.toggle("emoji");
}

// Toggle visibility of emoji picker
function toggle() {
  if (emojiPicker.style.display === "none") {
    emojiPicker.style.display = "block";
  } else {
    emojiPicker.style.display = "none";
  }
}

// Update emoji button value and toggle picker visibility
document.querySelector('emoji-picker')
    .addEventListener('emoji-click', event => {
      let emoji = event.detail

      // Update emoji button to match the picked emoji
      emojiButton.textContent = emoji.unicode;
      // Hide the emoji picker
      emojiPicker.classList.toggle("emoji");
    });


// ========== MAIN ==========

function main() {
  console.log("Hello World")
  initialiseData()
}

main();
