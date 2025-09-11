const infoNewModal = document.getElementById("infoNewModal");
infoNewModal.addEventListener("show.bs.modal", (event) => {
  const newCompleteInfo = event.relatedTarget;
  const action = newCompleteInfo.getAttribute(`data-bs-action`);
  const date = newCompleteInfo.getAttribute(`data-bs-date`);
  const time = newCompleteInfo.getAttribute(`data-bs-time`);
  const footer = document.getElementById("footerNewModal");
  const actionSection = document.getElementById("actionConfirm");
  const modalTitle = document.getElementById("modalTitle");
  const authorNewValue = document.getElementById("authorNewValue");
  const subjectNewValue = document.getElementById("subjectNewValue");
  const bodyNewValue = document.getElementById("bodyNewValue");
  if (action == "view") {
    footer.classList.add("visually-hidden");
    actionSection.innerHTML = "";
    modalTitle.innerHTML = `Novedad del ${date} a las ${time}`;
    subjectNewValue.readOnly = true;
    bodyNewValue.readOnly = true;
    authorNewValue.value = newCompleteInfo.getAttribute(`data-bs-author`);
    subjectNewValue.value = newCompleteInfo.getAttribute(`data-bs-subject`);
    bodyNewValue.value = newCompleteInfo.getAttribute(`data-bs-body`);
  }
  if (action == "create") {
    footer.classList.remove("visually-hidden");
    actionSection.innerHTML =
      '<input type="text" name="createNew" class="visually-hidden" value=true>';
    modalTitle.innerHTML = "Agregar Novedad";
    subjectNewValue.readOnly = false;
    bodyNewValue.readOnly = false;
    authorNewValue.value = newCompleteInfo.getAttribute(`data-bs-user`);
    subjectNewValue.value = "";
    bodyNewValue.value = "";
  }
  if (action == "modify") {
    footer.classList.remove("visually-hidden");
    actionSection.innerHTML =
      '<input type="text" name="modifyNew" class="visually-hidden" value=true>';
    modalTitle.innerHTML = `Novedad del ${date} a las ${time}`;
    subjectNewValue.readOnly = false;
    bodyNewValue.readOnly = false;
    authorNewValue.value = newCompleteInfo.getAttribute(`data-bs-author`);
    subjectNewValue.value = newCompleteInfo.getAttribute(`data-bs-subject`);
    bodyNewValue.value = newCompleteInfo.getAttribute(`data-bs-body`);
    document.getElementById("_idNewValue").value =
      newCompleteInfo.getAttribute(`data-bs-_id`);
  }

  const form = document.getElementById("newsModalForm");

  form.addEventListener("submit", () => {
    const datetimeInput = document.getElementById("datetimeInput");
    datetimeInput.value = new Date().getTime();
  });
});

const deleteNewModal = document.getElementById("deleteNewModal");
deleteNewModal.addEventListener("show.bs.modal", (event) => {
  const newCompleteInfo = event.relatedTarget;
  document.getElementById("_idNewValueDelete").value =
    newCompleteInfo.getAttribute(`data-bs-_id`);
});
