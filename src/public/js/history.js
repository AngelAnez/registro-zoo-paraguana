/* const table = document.getElementById("history-table");
const cards = document.getElementById("history-cards");
if (window.screen.width <= 450) {
  table.classList.replace("d-flex", "d-none");
  cards.classList.replace("d-none", "d-flex");
} else {
  table.classList.replace("d-flex", "d-none");
  cards.classList.replace("d-none", "d-flex");
} */

const viewVisitModal = document.getElementById("viewVisitModal");
const editVisitModal = document.getElementById("editVisitModal");
const deleteVisitModal = document.getElementById("deleteVisitModal");

const idKeys = ["_id", "kids_id", "adults_id", "elders_id"];
const people = ["boys", "girls", "men", "women", "elderMen", "elderWomen"];
const totals = ["totalKids", "totalAdults", "totalElders"];

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
    let idInput;
    if (element === "paymentData") {
      dynamicPaymentMethod();
      let method = button.getAttribute(`data-bs-method`);
      let paymentData = button.getAttribute(`data-bs-paymentdata`);
      if (method === "Efectivo") {
        idInput = document.getElementById("paymentDataSelectEditing");
      } else {
        idInput = document.getElementById("paymentDataInputEditing");
      }
      idInput.value = paymentData;
    } else {
      idInput = editVisitModal.querySelector(`[name="${element}"]`);
      element = element.toLowerCase();
      let value = button.getAttribute(`data-bs-${element}`);
      idInput.value = value;
    }
  });

  const boysInput = editVisitModal.querySelector("#boysEditing");
  const girlsInput = editVisitModal.querySelector("#girlsEditing");
  const menInput = editVisitModal.querySelector("#menEditing");
  const womenInput = editVisitModal.querySelector("#womenEditing");
  const elderMenInput = editVisitModal.querySelector("#elderMenEditing");
  const elderWomenInput = editVisitModal.querySelector("#elderWomenEditing");

  const kidsInput = [boysInput, girlsInput];
  const adultsInput = [menInput, womenInput];
  const eldersInput = [elderMenInput, elderWomenInput];

  kidsInput.forEach((element) => {
    element.addEventListener("input", () => {
      const boysValue =
        typeof +boysInput.value != "number" ? 0 : +boysInput.value;
      const girlsValue =
        typeof +girlsInput.value != "number" ? 0 : +girlsInput.value;
      const totalKids = editVisitModal.querySelector("#totalKidsEditing");
      totalKids.value = boysValue + girlsValue;
    });
  });

  adultsInput.forEach((element) => {
    element.addEventListener("input", () => {
      const menValue = typeof +menInput.value != "number" ? 0 : +menInput.value;
      const womenValue =
        typeof +womenInput.value != "number" ? 0 : +womenInput.value;
      const totalAdults = editVisitModal.querySelector("#totalAdultsEditing");
      totalAdults.value = menValue + womenValue;
    });
  });

  eldersInput.forEach((element) => {
    element.addEventListener("input", () => {
      const elderMenValue =
        typeof +elderMenInput.value != "number" ? 0 : +elderMenInput.value;
      const elderWomenValue =
        typeof +elderWomenInput.value != "number" ? 0 : +elderWomenInput.value;
      const totalElders = editVisitModal.querySelector("#totalEldersEditing");
      totalElders.value = elderMenValue + elderWomenValue;
    });
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
  const paymentDataSelect = document.getElementById("paymentDataSelectEditing");
  const paymentDataInput = document.getElementById("paymentDataInputEditing");

  let subtitleText = "";
  switch (methodSelected) {
    case "Efectivo":
      subtitleText = "Moneda";
      paymentDataInput.classList.replace("d-flex", "d-none");
      paymentDataSelect.classList.replace("d-none", "d-flex");
      paymentDataSelect.value = "Dolar";
      break;
    case "Otro":
      subtitleText = "Información del Pago";
      paymentDataInput.classList.replace("d-none", "d-flex");
      paymentDataSelect.classList.replace("d-flex", "d-none");
      paymentDataInput.type = "text";
      paymentDataInput.value = "";
      break;
    default:
      subtitleText = `Número de Referencia`;
      paymentDataInput.classList.replace("d-none", "d-flex");
      paymentDataSelect.classList.replace("d-flex", "d-none");
      paymentDataInput.type = "number";
      paymentDataInput.value = "";
      break;
  }
  methodValidationTitle.value = subtitleText;
};
