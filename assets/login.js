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
  const btn = document.querySelector(".btn-name");
  const btnTotal = document.querySelector(".btn-submit");
  spinner.classList.remove("hidden");
  btn.classList.add("hidden");
  btnTotal.disabled = true;

  setTimeout(() => {
    spinner.classList.add("hidden");
    btn.classList.remove("hidden");
    btnTotal.disabled = false;
  }, 1000);
}
