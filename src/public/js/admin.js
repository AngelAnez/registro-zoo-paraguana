const hidePassword = (id) => {
  const password = document.getElementById(id)
  let passwordHideIcon = document.getElementById("passwordHideIcon")

  if (passwordHideIcon.getAttribute("data-lucide") === "eye"){
      passwordHideIcon.setAttribute("data-lucide", "eye-off")
      password.setAttribute("type", "text")
  } else {
      passwordHideIcon.setAttribute("data-lucide", "eye")
      password.setAttribute("type", "password")
  }
  lucide.createIcons() 
}

const modalActions = (modalElement, title, type) => {
  modalElement.addEventListener('show.bs.modal', event => {
    const button = event.relatedTarget
    const user = button.getAttribute('data-bs-user')

    const modalTitle = modalElement.querySelector('.modal-title')
    modalTitle.textContent = title

    let readable = "readonly"
    if (modalElement.id == "modifyUserModal"){
      readable = ""
    }

    const userSection = modalElement.querySelector("#" + modalElement.id + "User")
    if (type == "form"){
      userSection.value = user
    } else {
      userSection.textContent = user
      const userInput = modalElement.querySelector('input[name="username"]')
      userInput.value = user
    }
  })
}

const changePasswordModal = document.getElementById('changePasswordModal')
const modifyUserModal = document.getElementById('modifyUserModal')
const promoteAdminModal = document.getElementById('promoteAdminModal')
const returnModeratorModal = document.getElementById('returnModeratorModal')
const aceptRequestModal = document.getElementById('aceptRequestModal')
const deleteUserModal = document.getElementById('deleteUserModal')

if (changePasswordModal) modalActions(changePasswordModal, "Cambiar Contraseña", "form")

if (modifyUserModal) modalActions(modifyUserModal, "Modificar Usuario", "form")

if (promoteAdminModal) modalActions(promoteAdminModal, "Promover a Administrador", "alert")

if (returnModeratorModal) modalActions(returnModeratorModal, "Retornar a Moderador", "alert")

if (aceptRequestModal) modalActions(aceptRequestModal, "Aprobar Solicitud", "alert")

if (deleteUserModal) modalActions(deleteUserModal, "Eliminar Usuario", "alert")