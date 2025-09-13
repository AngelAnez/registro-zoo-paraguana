const generalNewModal = document.getElementById("generalNewModal");
generalNewModal.addEventListener("show.bs.modal", (event) => {
  const newCompleteInfo = event.relatedTarget;
  const action = newCompleteInfo.getAttribute(`data-bs-action`);
  const datetimeSection = document.getElementById("datetimeModalSection");
  const footer = document.getElementById("footerNewModal");
  const actionSection = document.getElementById("actionConfirm");
  const modalTitle = document.getElementById("modalTitle");

  const authorNewValue = document.getElementById("authorNewValue");
  const subjectNewValue = document.getElementById("subjectNewValue");
  const bodyNewValue = document.getElementById("bodyNewValue");
  if (action == "create") {
    footer.classList.remove("visually-hidden");
    datetimeSection.classList.add("visually-hidden");
    actionSection.innerHTML =
      '<input type="text" name="createNew" class="visually-hidden" value=true>';
    modalTitle.innerHTML = "Agregar Novedad";
    subjectNewValue.readOnly = false;
    bodyNewValue.readOnly = false;
    authorNewValue.value = newCompleteInfo.getAttribute(`data-bs-user`);
    authorNewValue.readOnly = true;
    subjectNewValue.value = "";
    bodyNewValue.value = "";
  }
  if (action == "view") {
    datetimeSection.classList.remove("visually-hidden");
    footer.classList.add("visually-hidden");
    actionSection.innerHTML = "";
    modalTitle.innerHTML = "Detalles de la Novedad";
    const nameList = ["author", "subject", "body", "date", "time"];
    fillInputs(nameList, newCompleteInfo);
    subjectNewValue.readOnly = true;
    bodyNewValue.readOnly = true;
  }
  if (action == "modify") {
    datetimeSection.classList.remove("visually-hidden");
    footer.classList.remove("visually-hidden");
    actionSection.innerHTML =
      '<input type="text" name="modifyNew" class="visually-hidden" value=true>';
    modalTitle.innerHTML = "Editar Novedad";
    const nameList = ["author", "subject", "body", "date", "time", "_id"];
    fillInputs(nameList, newCompleteInfo);
    subjectNewValue.readOnly = false;
    bodyNewValue.readOnly = false;
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

const fillInputs = (nameList, selectedElement) => {
  nameList.forEach((element) => {
    const elementNewValue = document.getElementById(`${element}NewValue`);
    elementNewValue.value = selectedElement.getAttribute(`data-bs-${element}`);
    if (element === "date" || element === "time" || element === "author") {
      elementNewValue.readOnly = true;
    }
  });
};
