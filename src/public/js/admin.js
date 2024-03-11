const changePasswordModal = document.getElementById('changePasswordModal')
if (changePasswordModal) {
  changePasswordModal.addEventListener('show.bs.modal', event => {
    // Button that triggered the modal
    const button = event.relatedTarget
    // Extract info from data-bs-* attributes
    const user = button.getAttribute('data-bs-user')
    // If necessary, you could initiate an Ajax request here
    // and then do the updating in a callback.

    // Update the modal's content.
    const modalTitle = changePasswordModal.querySelector('.modal-title')

    const userInput = changePasswordModal.querySelector('.d-none')

    modalTitle.textContent = `Cambio de Contraseña: ${user}`
    userInput.value = user
  })
}