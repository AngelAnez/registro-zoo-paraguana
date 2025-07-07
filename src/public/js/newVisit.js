/* Constantes */
const step1Container = document.querySelector("#addNewVisitStep1");
const boysNumber = document.querySelector("#boysNumber");
const girlsNumber = document.querySelector("#girlsNumber");
const menNumber = document.querySelector("#menNumber");
const womenNumber = document.querySelector("#womenNumber");
const elderMenNumber = document.querySelector("#elderMenNumber");
const elderWomenNumber = document.querySelector("#elderWomenNumber");
const courtesyKidsNumber = document.querySelector("#courtesyKidsNumber");
const courtesyAdultsNumber = document.querySelector("#courtesyAdultsNumber");
const family = document.querySelector("#totalFamily");

const kidsTicket = parseFloat(
  document.querySelector("#kidsTicket").getAttribute("data-ticket-value")
);
const adultsTicket = parseFloat(
  document.querySelector("#adultsTicket").getAttribute("data-ticket-value")
);

const step2Container = document.querySelector("#addNewVisitStep2");
const totalDolars = document.getElementById("totalDolars");
const totalBolivars = document.getElementById("totalBolivars");
const paymentMethod = document.getElementById("paymentMethod");
const methodSelected = document.getElementById("methodSelected");

const step3Container = document.querySelector("#addNewVisitStep3");
let representativeName = document.getElementById("representativeName");
let representativePhone = document.getElementById("representativePhone");

/* Cambio de Pasos y Estilos de Validaciones */

const alertInfoVisit = document.getElementById("alertInfo");
const alertInfoToastVisit = bootstrap.Toast.getOrCreateInstance(alertInfoVisit);

const alertCall = (type, message) => {
  const alertHeader = document.getElementById("alertHeader");
  alertHeader.classList.add("text-bg-" + type);
  const alertMessage = document.getElementById("alertMessage");
  alertMessage.innerHTML = message;
  alertInfoToastVisit.show();
};

function addZero(number) {
  if (number < 10) {
    number = "0" + number;
  }
  return number;
}

const getDateandTime = () => {
  let hoy = new Date();
  let hour = hoy.getHours();
  let minutes = hoy.getMinutes();
  let period = "";
  let day = hoy.getDate();
  let month = hoy.getMonth() + 1;
  let year = hoy.getFullYear();

  if (hour >= 12) {
    period = "pm";
    if (hour > 12) {
      hour = hour - 12;
    }
  } else {
    period = "am";
    if (hour == 0) {
      hour = 12;
    }
  }

  minutes = addZero(minutes);
  day = addZero(day);
  month = addZero(month);

  document.getElementById("dateInput").value = `${day}/${month}/${year}`;
  document.getElementById(
    "timeInput"
  ).value = `${hoy.getHours()}:${hoy.getMinutes()}`;
  return {
    date: `${day}/${month}/${year}`,
    time: `${hour}:${minutes} ${period}`,
  };
};

function changeStep(step) {
  for (let i = 1; i < 5; i++) {
    if (i == step) {
      document
        .getElementById("step" + i + "Circle")
        .classList.replace(
          "new-visit-steps-circle-off",
          "new-visit-steps-circle-on"
        );
      document
        .getElementById("addNewVisitStep" + i)
        .classList.replace("d-none", "d-flex");
    } else {
      document
        .getElementById("step" + i + "Circle")
        .classList.replace(
          "new-visit-steps-circle-on",
          "new-visit-steps-circle-off"
        );
      document
        .getElementById("addNewVisitStep" + i)
        .classList.replace("d-flex", "d-none");
    }
  }
}

const formValidator = (type, tagList, message) => {
  tagList.forEach((tag) => {
    if (type == "error") {
      tag.classList.add("is-invalid");
      alertCall("danger", message);
    } else {
      tag.classList.remove("is-invalid");
      alertInfoToastVisit.hide();
    }
  });
};

/* Step 1*/

function changeFamilyNumber() {
  formValidator("clean", step1Container.querySelectorAll("input"));

  let kidsTotalValue = +boysNumber.value + +girlsNumber.value;
  let adultsTotalValue = +menNumber.value + +womenNumber.value;
  let eldersTotalValue = +elderMenNumber.value + +elderWomenNumber.value;

  family.value = kidsTotalValue + adultsTotalValue + eldersTotalValue;

  let courtesyKidsValue = +courtesyKidsNumber.value;
  let courtesyAdultsValue = +courtesyAdultsNumber.value;

  let kidsFinalValue = kidsTotalValue - courtesyKidsValue;
  let adultsFinalValue = adultsTotalValue - courtesyAdultsValue;

  totalDolars.innerText =
    kidsFinalValue * kidsTicket + adultsFinalValue * adultsTicket;
  totalBolivars.innerText = totalDolars.innerText * dolarToday.value;

  totalDolars.innerText = parseFloat(totalDolars.innerText).toFixed(2);
  totalBolivars.innerText = parseFloat(totalBolivars.innerText).toFixed(2);
}

function validateStep1() {
  let invalid = false;

  if (family.value <= 0) {
    formValidator(
      "error",
      step1Container.querySelectorAll("#" + family.id),
      "El número de visitantes no puede ser menor a 1"
    );
    invalid = true;
  }
  let kidsTotalValue = +boysNumber.value + +girlsNumber.value;
  let courtesyKidsValue = +courtesyKidsNumber.value;

  if (kidsTotalValue < courtesyKidsValue) {
    formValidator(
      "error",
      step1Container.querySelectorAll("#" + courtesyKidsNumber.id),
      "El número de entradas de cortesía no puede ser mayor al total de niños"
    );
    invalid = true;
  }

  let adultsTotalValue = +menNumber.value + +womenNumber.value;
  let courtesyAdultsValue = +courtesyAdultsNumber.value;

  if (adultsTotalValue < courtesyAdultsValue) {
    formValidator(
      "error",
      step1Container.querySelectorAll("#" + courtesyAdultsNumber.id),
      "El número de entradas de cortesía no puede ser mayor al total de adultos"
    );
    invalid = true;
  }

  let visits = [
    boysNumber,
    girlsNumber,
    menNumber,
    womenNumber,
    elderMenNumber,
    elderWomenNumber,
  ];
  for (let i = 0; i < visits.length; i++) {
    if (visits[i].value < 0) {
      formValidator(
        "error",
        step1Container.querySelectorAll("#" + visits[i].id),
        "No puede registrar visitas en negativo"
      );
      invalid = true;
    }
  }

  if (!invalid) {
    formValidator("clean", step1Container.querySelectorAll("input"));
    changeStep(2);
  }
}

/* Paso 2 */
const cleanInputs = (container) => {
  formValidator("clean", container.querySelectorAll(".is-invalid"));
};

function dinamicPaymentMethod() {
  formValidator(
    "clean",
    step2Container.querySelectorAll("#" + paymentMethod.id)
  );

  const methodsId = {
    "Pago Móvil": "referenceMethod",
    Transferencia: "referenceMethod",
    Efectivo: "currencyMethod",
    Otro: "anotherMethod",
  };

  const methods = ["currencyMethod", "anotherMethod", "referenceMethod"];
  methods.forEach((method) => {
    const methodElement = document.getElementById(method);
    if (method === methodsId[paymentMethod.value]) {
      methodElement.classList.replace("d-none", "d-flex");
    } else {
      methodElement.classList.replace("d-flex", "d-none");
    }
  });
}

function validateStep2() {
  let invalid = true;
  let inputsStep2 = step2Container.querySelectorAll(
    'input[name="paymentData"]'
  );

  let indexMethodSelected = paymentMethod.selectedIndex;
  let textMethodSelected = paymentMethod.options[indexMethodSelected].text;

  if (textMethodSelected == "") {
    return formValidator(
      "error",
      step2Container.querySelectorAll("#" + paymentMethod.id),
      "Seleccione el método de pago"
    );
  }
  if (textMethodSelected == "Efectivo") {
    const currencyOption = document.querySelector("#currencyOption");
    const currencies = ["Dolar", "Bolivar"];
    if (!currencies.includes(currencyOption.value)) {
      return formValidator(
        "error",
        inputsStep2,
        "Seleccione el tipo de moneda para pagar"
      );
    }
    invalid = false;
  }
  if (textMethodSelected == "Otro") {
    let alternativeMethodInfo = document.querySelector(
      "#alternativeMethodInfo"
    );
    if (
      alternativeMethodInfo.value != "" &&
      alternativeMethodInfo.value.match("^[0-9A-ZÑa-zñáéíóúÁÉÍÓÚ.,$ ]+$")
    ) {
      invalid = false;
    } else {
      return formValidator(
        "error",
        step2Container.querySelectorAll("#alternativeMethodInfo"),
        "Explique el método de pago utilizado"
      );
    }
  }
  if (
    textMethodSelected == "Transferencia" ||
    textMethodSelected == "Pago Móvil"
  ) {
    let referenceNumberOption = document.querySelector(
      "#referenceNumberOption"
    );
    if (referenceNumberOption.value <= 0) {
      return formValidator(
        "error",
        inputsStep2,
        "Introduzca un número de referencia válido"
      );
    }
    invalid = false;
  }
  if (!invalid) {
    formValidator("clean", inputsStep2);
    changeStep(3);
  }
}

/* Paso 3 */

function validateStep3() {
  if (
    !representativeName.value.match("^[0-9A-ZÑa-zñáéíóúÁÉÍÓÚ ]+$") &&
    representativeName.value != ""
  ) {
    formValidator(
      "error",
      step3Container.querySelectorAll("#" + representativeName.id),
      "Introduzca un nombre válido"
    );
  } else if (
    representativePhone.value.match("^[0-9,+ ]+$") == null &&
    representativePhone.value != ""
  ) {
    formValidator(
      "error",
      step3Container.querySelectorAll("#" + representativePhone.id),
      "Introduzca un número de teléfono válido"
    );
  } else {
    formValidator("clean", step3Container.querySelectorAll("input"));
    changeStep(4);
    all_values();
  }
}

/* Paso 4 */

function all_values() {
  const { date, time } = getDateandTime();
  document.querySelector("#datetimeInvoice").innerHTML = `${date} - ${time}`;

  document.querySelector("#kidsInvoice").innerHTML =
    +boysNumber.value + +girlsNumber.value;
  document.querySelector("#adultsInvoice").innerHTML =
    +menNumber.value + +womenNumber.value;
  document.querySelector("#eldersInvoice").innerHTML =
    +elderMenNumber.value + +elderWomenNumber.value;
  document.querySelector("#representativeInvoice").innerHTML =
    representativeName.value == "" ? "Sin Asignar" : representativeName.value;
  document.querySelector("#methodInvoice").innerHTML = paymentMethod.value;
  document.querySelector("#dollarsInput").value = totalDolars.innerText;
  document.querySelector("#bolivarsInput").value = totalBolivars.innerText;
  document.querySelector("#totalInvoice").innerHTML =
    totalBolivars.innerText + " Bs.";

  let extraInfoTitle = document.querySelector("#extraInfoTitle");
  let extraInfoInvoice = document.querySelector("#extraInfoInvoice");

  if (paymentMethod.value == "Efectivo") {
    extraInfoTitle.innerHTML = "Moneda";
    let currencySelected = document.querySelector("#currencyOption").value;
    extraInfoInvoice.innerHTML = currencySelected;
    if (currencySelected === "Dolar") {
      document.querySelector("#totalInvoice").innerHTML = totalDolars.innerText + " $"; 
    }
  } else if (paymentMethod.value == "Otro") {
    let alternativeMethodInfo = document.querySelector(
      "#alternativeMethodInfo"
    );
    extraInfoTitle.innerHTML = "Información del Pago";
    extraInfoInvoice.innerHTML = alternativeMethodInfo.value;
  } else {
    let referenceNumberOption = document.querySelector(
      "#referenceNumberOption"
    );
    extraInfoTitle.innerHTML = "Número de Referencia";
    extraInfoInvoice.innerHTML = referenceNumberOption.value;
  }
}
