const forgetPassword = document.querySelector(".forget__password");
const signInContainer = document.querySelector(".form__sign--in");
const recoverForm = document.querySelector(".form__recover--container");
const loginPassword = document.querySelector(".login-password");
recoverForm.style.display = "none";

forgetPassword.addEventListener("click", function () {
  recoverForm.style.display = "flex";
  signInContainer.style.display = "none";
});
loginPassword.addEventListener("click", function () {
  recoverForm.style.display = "none";
  signInContainer.style.display = "flex";
});

function showSpinner() {
  const spinner = document.getElementById("spinner");
  const btnText = document.querySelector(".btn-text"); // Target only text, not the whole span
  const btnTotal = document.querySelector(".btn-submit");

  // Show spinner & hide text
  spinner.classList.remove("hidden");
  btnText.style.display = "none";
  btnTotal.disabled = true;

  setTimeout(() => {
    // Hide spinner & show text again
    spinner.classList.add("hidden");
    btnText.style.display = "inline";
    btnTotal.disabled = false;
  }, 1000);
}
