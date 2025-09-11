const hidePassword = (id) => {
  const passwordLogin = document.getElementById(id);
  let passwordHideIcon = document.getElementById("passwordHideIcon");

  if (passwordHideIcon.getAttribute("data-lucide") === "eye") {
    passwordHideIcon.setAttribute("data-lucide", "eye-off");
    passwordLogin.setAttribute("type", "text");
  } else {
    passwordHideIcon.setAttribute("data-lucide", "eye");
    passwordLogin.setAttribute("type", "password");
  }
  lucide.createIcons();
};

const resetValidators = (page) => {
  document.getElementById("invalidUserText").classList.remove("is-invalid");
  document
    .getElementById("passwordHideIcon")
    .classList.remove("visually-hidden");
  if (page == "Login") {
    document.getElementById("usernameLogin").classList.remove("is-invalid");
    document.getElementById("passwordLogin").classList.remove("is-invalid");
  } else {
    document.getElementById("usernameRegistro").classList.remove("is-invalid");
    document.getElementById("passwordRegistro").classList.remove("is-invalid");
    document.getElementById("emailRegistro").classList.remove("is-invalid");
  }
};

const timezone = new Date().getTimezoneOffset();
const difference = timezone / 60;
console.log(difference);
const minutes = !Number.isInteger(difference)
  ? String((difference % 1) * 60)
  : "00";
const GMT = `${difference < 0 ? "+" : "-"}${
  Math.abs(difference) < 10 ? "0" + Math.abs(difference) : Math.abs(difference)
}:${minutes}`;

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", () => {
  document.cookie = `timezone=${GMT}`;
});
