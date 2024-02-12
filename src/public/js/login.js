const passwordLogin = document.getElementById("passwordLogin")

const hidePassword = () => {
    let passwordHideIcon = document.getElementById("passwordHideIcon")

    if (passwordHideIcon.getAttribute("data-lucide") === "eye"){
        passwordHideIcon.setAttribute("data-lucide", "eye-off")
        passwordLogin.setAttribute("type", "text")
    } else {
        passwordHideIcon.setAttribute("data-lucide", "eye")
        passwordLogin.setAttribute("type", "password")
    }
    lucide.createIcons()
    
}

const resetValidators = () => {
    document.getElementById("usernameLogin").classList.remove("is-invalid")
    document.getElementById("passwordLogin").classList.remove("is-invalid")
    document.getElementById("invalidUserText").classList.remove("is-invalid")
}