const infoVisitModal = document.getElementById("infoVisitModal");
infoVisitModal.addEventListener("show.bs.modal", (event) => {
  const visitCompleteInfo = event.relatedTarget;
  const action = visitCompleteInfo.getAttribute(`data-bs-action`);
  if (action == "modify") {
    document
      .getElementById("checkButtonVisit")
      .classList.remove("visually-hidden");
  }
  if (action == "view") {
    document
      .getElementById("checkButtonVisit")
      .classList.add("visually-hidden");
  }
  document.getElementById("_idVisitValue").value =
    visitCompleteInfo.getAttribute(`data-bs-_id`);
  document.getElementById("kids_idVisitValue").value =
    visitCompleteInfo.getAttribute(`data-bs-kids_id`);
  document.getElementById("adults_idVisitValue").value =
    visitCompleteInfo.getAttribute(`data-bs-adults_id`);
  document.getElementById("elders_idVisitValue").value =
    visitCompleteInfo.getAttribute(`data-bs-elders_id`);
  const visitData = [
    "date",
    "time",
    "boys",
    "girls",
    "courtesyKids",
    ,
    "men",
    "women",
    "courtesyAdults",
    "elderMen",
    "elderWomen",
    "method",
    "methodValidation",
    "totalBolivars",
    "totalDollars",
    "paymentData",
    "representativeName",
    "representativePhone",
  ];
  visitData.forEach((data) => {
    let value = visitCompleteInfo.getAttribute(`data-bs-${data.toLowerCase()}`);
    if (document.getElementById(`${data}VisitValue`)) {
      if (action == "view") {
        if (data == "representativeName" || data == "representativePhone") {
          document.getElementById(
            `${data}VisitValue`
          ).innerHTML = `<h6 class=" fw-semibold ps-0 py-0 mb-0" >${value}</h6>`;
        } else if (data == "date" || data == "time") {
          document.getElementById(`${data}VisitValue`).innerHTML = value;
        } else if (data == "method") {
          document.getElementById(
            `${data}VisitValue`
          ).innerHTML = `<p class="m-0 fw-bold">Método de Pago: </p> <span>${value}</span>`;
        } else if (data == "methodValidation") {
          document.getElementById(
            `${data}VisitValue`
          ).innerHTML = `<p class="m-0 fw-bold">${value}:</p>
                    <p class="m-0" id="paymentDataVisitValue"></p>`;
        } else if (data == "paymentData") {
          document.getElementById(`${data}VisitValue`).innerHTML = value;
        } else if (data == "totalBolivars" || data == "totalDollars") {
          document.getElementById(
            `${data}VisitValue`
          ).innerHTML = `<p type="number" class="p-0 text-end fw-semibold fs-5 w-75 m-0">${value}</p> <span>${
            data == "totalDolars" ? "$" : "Bs."
          }</span>`;
        } else {
          document.getElementById(
            `${data}VisitValue`
          ).innerHTML = `<h5 class="text-center">${value}</h5>`;
        }
      }
    }
  });
});

const editVisitModal = document.getElementById("editVisitModal");

editVisitModal.addEventListener("show.bs.modal", (event) => {
  const button = event.relatedTarget;
  const ids = [
    "_id",
    "kids_id",
    "adults_id",
    "elders_id",
    "date",
    "time",
    "boys",
    "girls",
    "men",
    "women",
    "elderMen",
    "elderWomen",
    "courtesyKids",
    "courtesyAdults",
    "totalKids",
    "totalAdults",
    "totalElders",
    "method",
    "methodValidation",
    "totalBolivars",
    "totalDollars",
    "paymentData",
    "representativeName",
    "representativePhone",
  ];
  ids.forEach((element) => {
    let idInput = editVisitModal.querySelector(`[name="${element}"]`);
    element = element.toLowerCase();
    let value = button.getAttribute(`data-bs-${element}`);
    idInput.value = value;
  });
});

const deleteVisitModal = document.getElementById("deleteVisitModal");

deleteVisitModal.addEventListener("show.bs.modal", (event) => {
  const button = event.relatedTarget;
  const ids = ["_id", "kids_id", "adults_id", "elders_id"];
  ids.forEach((element) => {
    let value = button.getAttribute(`data-bs-${element}`);
    let idInput = deleteVisitModal.querySelector(`input[name="${element}"]`);
    idInput.value = value;
  });
});

const dynamicPaymentMethod = () => {
  const methodSelected = document.getElementById("methodEditing").value;
  const methodValidationTitle = document.getElementById("methodValidationEditing");
  const paymentDataElement = document.getElementById("paymentDataEditing");
  console.log(methodSelected.value)
  console.log(methodValidationTitle.value)
  console.log(paymentDataElement.value)
  let subtitleText = "";
  switch (methodSelected) {
    case "Efectivo":
      subtitleText = "Moneda";
      paymentDataElement.value = "";
      break;
    case "Otro":
      subtitleText = "Información del Pago";
      paymentDataElement.value = "";
      break;
    default:
      subtitleText = `Número de Referencia`;
      paymentDataElement.value = "";
      break;
  }
  methodValidationTitle.value = subtitleText;
};
