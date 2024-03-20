const hidePassword = (id) => {
    const password = document.getElementById(id)
    let passwordHideIcon = document.getElementById(id + "HideIcon")
  
    if (passwordHideIcon.getAttribute("data-lucide") === "eye"){
        passwordHideIcon.setAttribute("data-lucide", "eye-off")
        password.setAttribute("type", "text")
    } else {
        passwordHideIcon.setAttribute("data-lucide", "eye")
        password.setAttribute("type", "password")
    }
    lucide.createIcons() 
}

const toggleProfileInput = (id) => {
    let elementInput = document.querySelector("#" + id)
    elementInput.toggleAttribute("disabled")
    elementInput.classList.toggle("border-white")
    elementInput.classList.toggle("bg-transparent")
    let modifyBtn = document.querySelector("#" + id + "Modify")
    let checkBtn = document.querySelector("#" + id + "Check")
    modifyBtn.classList.toggle("d-none")
    checkBtn.classList.toggle("d-none")
    if (id === "passwordInput"){
        modifyBtn.classList.contains("d-none") 
        ? elementInput.setAttribute("type", "text") 
        : elementInput.setAttribute("type", "password")
    }
}

const validateUserData = () => {
    const usernameValue = document.querySelector("#usernameInput")
    const emailValue = document.querySelector("#emailInput")
    const passwordValue = document.querySelector("#passwordInput")
    
    const formData = [usernameValue, emailValue]

    formData.forEach(value => {
        value.removeAttribute("disabled")
        value.classList.remove("border-white")
        value.classList.remove("bg-transparent")
        let modifyBtn = document.querySelector("#" + value.id + "Modify")
        let checkBtn = document.querySelector("#" + value.id + "Check")
        modifyBtn.classList.add("d-none")
        checkBtn.classList.remove("d-none")
    })
    document.getElementsByTagName("form").submit()
}