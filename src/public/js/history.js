const viewVisitModal = document.getElementById("viewVisitModal");
const editVisitModal = document.getElementById("editVisitModal");
const deleteVisitModal = document.getElementById("deleteVisitModal");

const idKeys = ["_id", "kids_id", "adults_id", "elders_id"];

const inputKeys = [
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

viewVisitModal.addEventListener("show.bs.modal", (event) => {
  const button = event.relatedTarget;

  inputKeys.forEach((id) => {
    let element = viewVisitModal.querySelector(`#${id}View`);
    id = id.toLowerCase();
    let value = button.getAttribute(`data-bs-${id}`);
    element.textContent = value;
  });
});

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
  const methodValidationTitle = document.getElementById(
    "methodValidationEditing"
  );
  const paymentDataElement = document.getElementById("paymentDataEditing");
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
