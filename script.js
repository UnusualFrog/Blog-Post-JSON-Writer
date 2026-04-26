const formWrapper = document.querySelector(".formbold-form-wrapper");
const formActionButton = document.querySelector(".formbold-action-btn");

function chatboxToogleHandler() {
    formWrapper.classList.toggle("active");
    formActionButton.classList.toggle("active");
}

document.querySelector('emoji-picker')
    .addEventListener('emoji-click', event => console.log(event.detail));

console.log("Hello World")