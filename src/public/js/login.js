

const hidePassword = (id) => {
    const passwordLogin = document.getElementById(id)
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

const resetValidators = (page) => {
    document.getElementById("invalidUserText").classList.remove("is-invalid")
    document.getElementById("passwordHideIcon").classList.remove("visually-hidden")
    if (page == "Login"){
        document.getElementById("usernameLogin").classList.remove("is-invalid")
        document.getElementById("passwordLogin").classList.remove("is-invalid")
    } else {
        document.getElementById("usernameRegistro").classList.remove("is-invalid")
        document.getElementById("passwordRegistro").classList.remove("is-invalid")
        document.getElementById("emailRegistro").classList.remove("is-invalid")
    }
}