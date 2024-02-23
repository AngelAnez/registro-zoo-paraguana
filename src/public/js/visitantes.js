/* Constantes */
const alertInfo = document.getElementById("alertInfo");
const alertInfoToast = bootstrap.Toast.getOrCreateInstance(alertInfo);

const step1Container = document.querySelector("#addNewVisitStep1");
const childrenNumber = document.querySelector("#childrenNumber");
const adultsNumber = document.querySelector("#adultsNumber");
const seniorsNumber = document.querySelector("#seniorsNumber");
const family = document.querySelector("#totalFamily");

const childrenTicket = parseFloat(document.querySelector("#childrenTicket").getAttribute("value"));
const adultsTicket = parseFloat(document.querySelector("#adultsTicket").getAttribute("value"));
const seniorsTicket = parseFloat(document.querySelector("#seniorsTicket").getAttribute("value"));

const step2Container = document.querySelector("#addNewVisitStep2");
const totalDolars = document.getElementById("totalDolars");
const totalBolivars = document.getElementById("totalBolivars");
const paymentMethod = document.getElementById("paymentMethod");
const methodSelected = document.getElementById("methodSelected");

const step3Container = document.querySelector("#addNewVisitStep3");
const representativeName = document.getElementById("representativeName");
const representativePhone = document.getElementById("representativePhone");

/* Cambio de Pasos y Estilos de Validaciones */

const alertCall = (type, message) => {
  const alertHeader = document.getElementById("alertHeader")
  alertHeader.classList.add("text-bg-" + type)
  const alertMessage = document.getElementById("alertMessage")
  alertMessage.innerHTML = message
  alertInfoToast.show();
}

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
    period = "pm"
    if (hour > 12){
      hour = hour - 12
    }
  } else{
    period = "am"
    if (hour == 0) {
      hour = 12
    } 
  }

  minutes = addZero(minutes);
  day = addZero(day);
  month = addZero(month);

  document.getElementById("dateInput").value = `${day}/${month}/${year}`
  document.getElementById("timeInput").value = `${hour}:${minutes} ${period}`
  return {date: `${day}/${month}/${year}`, time: `${hour}:${minutes} ${period}`}
}

function changeStep(step) {
  for (let i = 1; i < 5; i++) {
    if (i == step) {
      document.getElementById("step" + i + "Circle").classList.replace("text-bg-success", "text-bg-light")
      document.getElementById("addNewVisitStep" + i).classList.replace("d-none", "d-flex");
    } else {
      document.getElementById("step" + i + "Circle").classList.replace("text-bg-light", "text-bg-success")
      document.getElementById("addNewVisitStep" + i).classList.replace("d-flex", "d-none");
    }
  }
}

const formValidator = (type, tagList, message) => {
  tagList.forEach(tag => {
    if (type == "error"){
      tag.classList.add("is-invalid")
      alertCall("danger", message)
    } else {
      tag.classList.remove("is-invalid")
      alertInfoToast.hide();
    }
  })
}

/* Step 1*/

function changeFamilyNumber() {
  formValidator("clean", step1Container.querySelectorAll("input"))

  let childrenTotalValue = +childrenNumber.value;
  let adultsTotalValue = +adultsNumber.value;
  let seniorsTotalValue = +seniorsNumber.value;

  family.value = childrenTotalValue + adultsTotalValue + seniorsTotalValue;
  totalDolars.value =
    childrenTotalValue * childrenTicket +
    adultsTotalValue * adultsTicket +
    seniorsTotalValue * seniorsTicket;
  totalBolivars.value = totalDolars.value * dolar_today.value;

  totalBolivars.value = parseFloat(totalBolivars.value).toFixed(2)

  totalDolars.value += "$";
  totalBolivars.value += " Bs.";
}

function validateStep1() {
  let invalid = false

  if (family.value <= 0){
    formValidator("error", step1Container.querySelectorAll("#" + family.id), "El número de visitantes no puede ser menor a 1")
    invalid = true
  } 

  let visits = [childrenNumber, adultsNumber, seniorsNumber]
  for (let i = 0; i < visits.length; i++) {
    if (visits[i].value < 0){
      formValidator("error", step1Container.querySelectorAll("#" + visits[i].id), "No puede registrar visitas en negativo")
      invalid = true
    }
  }

  if (!invalid){
    formValidator("clean", step1Container.querySelectorAll("input"))
    changeStep(2);
  }
 
}

/* Paso 2 */
const cleanInputs = (container) => {
  formValidator('clean', container.querySelectorAll('.is-invalid'))
}


function dinamicPaymentMethod() {
  formValidator("clean", step2Container.querySelectorAll("#" + paymentMethod.id))

  let indexMethodSelected = paymentMethod.selectedIndex;
  let textMethodSelected = paymentMethod.options[indexMethodSelected].text;
  let methodHTML = "";
  switch (textMethodSelected) {
    case "Efectivo":
      methodHTML= `<section class="col-9 d-flex flex-column gap-2"><span class="fw-bold user-select-none text-center" style="width: 100%;">Moneda</span><section class="d-flex align-items-center justify-content-around"><label for="dolarOption" class="d-flex gap-2"><span class="user-select-none">Dólar</span><input type="radio" id="dolarOption" value="Dolar" class="form-check-input" name="extraInfoPayment" required oninput="cleanInputs(step2Container)"/></label><label for="bolivarOption" class="d-flex gap-2"><span for="bolivarOption" class="user-select-none">Bolívar</span><input type="radio" id="bolivarOption" value="Bolivar" class="form-check-input" name="extraInfoPayment" required oninput="cleanInputs(step2Container)"/></label></section></section>`;
      break;
    default:
      methodHTML= `<label for="referenceNumberOption" class="col-9 text-start d-flex flex-column gap-2"><span class="fw-bold user-select-none">Número de Referencia</span><input type="text" id="referenceNumberOption" class="form-control p-0 text-center" autocomplete="off" name="extraInfoPayment" oninput="cleanInputs(step2Container)" /></label>`;
      break;
  }
  methodSelected.innerHTML = methodHTML;
}

function validateStep2() {
  let invalid = true
  let inputsStep2 = step2Container.querySelectorAll('input[name="extraInfoPayment"]')

  let indexMethodSelected = paymentMethod.selectedIndex;
  let textMethodSelected = paymentMethod.options[indexMethodSelected].text;

  if (textMethodSelected == ""){
    return formValidator("error", step2Container.querySelectorAll("#" + paymentMethod.id), "Seleccione el método de pago")
  }
  if (textMethodSelected == "Efectivo"){
    let dolarOption = document.querySelector("#dolarOption")
    let bolivarOption = document.querySelector("#bolivarOption")
    if (!dolarOption.checked && !bolivarOption.checked){
      return formValidator("error", inputsStep2, "Seleccione el tipo de moneda para pagar")
    }
    invalid = false
  }
  if (textMethodSelected == "Transferencia" || textMethodSelected == "Pago Móvil"){
    let referenceNumberOption = document.querySelector("#referenceNumberOption")
    if (referenceNumberOption.value <= 0 ){
      return formValidator("error", inputsStep2, "Introduzca un número de referencia válido")
    }
    invalid = false
  }
  if (!invalid){
    formValidator("clean", inputsStep2)
    changeStep(3);
  }
}

/* Paso 3 */

function validateStep3() {
  if (!representativeName.value.match("^[0-9A-ZÑa-zñáéíóúÁÉÍÓÚ ]+$")) {
    formValidator("error", step3Container.querySelectorAll("#" + representativeName.id), "Introduzca un nombre válido")
  } else if (representativePhone.value.match("^[0-9,+ ]+$") == null) {
    formValidator("error", step3Container.querySelectorAll("#" + representativePhone.id), "Introduzca un número de teléfono válido")
  } else {
    formValidator("clean", step3Container.querySelectorAll("input"))
    changeStep(4);
    all_values();
  }
}

/* Paso 4 */

function all_values() {
  const {date, time} = getDateandTime()
  document.querySelector("#dateInvoice").innerHTML = date;
  document.querySelector("#timeInvoice").innerHTML = time;

  document.querySelector("#childrenInvoice").innerHTML = +childrenNumber.value
  document.querySelector("#adultsInvoice").innerHTML = +adultsNumber.value
  document.querySelector("#seniorsInvoice").innerHTML = +seniorsNumber.value
  document.querySelector("#representativeInvoice").innerHTML = representativeName.value
  document.querySelector("#methodInvoice").innerHTML = paymentMethod.value
  document.querySelector("#totalInvoice").innerHTML = totalBolivars.value

  let extraInfoTitle = document.querySelector("#extraInfoTitle");
  let extraInfoInvoice = document.querySelector("#extraInfoInvoice");

  if (paymentMethod.value == "Efectivo") {
    let dolarOption = document.querySelector("#dolarOption")
    let bolivarOption = document.querySelector("#bolivarOption")
    extraInfoTitle.innerHTML = "Moneda:";
    if (dolarOption.checked) {
      extraInfoInvoice.innerHTML = dolarOption.value;
      document.querySelector("#totalInvoice").innerHTML = totalDolars.value
    } else {
      extraInfoInvoice.innerHTML = bolivarOption.value;
    }
  } else {
    let referenceNumberOption = document.querySelector("#referenceNumberOption")
    extraInfoTitle.innerHTML = "Número de Referencia:";
    extraInfoInvoice.innerHTML = referenceNumberOption.value;
  }
}
