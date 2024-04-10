/* Constantes */
const alertInfo = document.getElementById("alertInfo");
const alertInfoToast = bootstrap.Toast.getOrCreateInstance(alertInfo);

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

const kidsTicket = parseFloat(document.querySelector("#kidsTicket").getAttribute("value"));
const adultsTicket = parseFloat(document.querySelector("#adultsTicket").getAttribute("value"));

const step2Container = document.querySelector("#addNewVisitStep2");
const totalDolars = document.getElementById("totalDolars");
const totalBolivars = document.getElementById("totalBolivars");
const paymentMethod = document.getElementById("paymentMethod");
const methodSelected = document.getElementById("methodSelected");

const step3Container = document.querySelector("#addNewVisitStep3");
let representativeName = document.getElementById("representativeName");
let representativePhone = document.getElementById("representativePhone");

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
  console.log(hoy)
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
  document.getElementById("timeInput").value = `${hoy.getHours()}:${hoy.getMinutes()}`
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

  let kidsTotalValue = (+boysNumber.value) + (+girlsNumber.value);
  let adultsTotalValue = (+menNumber.value) + (+womenNumber.value);
  let eldersTotalValue = (+elderMenNumber.value) + (+elderWomenNumber.value);

  family.value = kidsTotalValue + adultsTotalValue + eldersTotalValue;

  let courtesyKidsValue = +courtesyKidsNumber.value
  let courtesyAdultsValue = +courtesyAdultsNumber.value

  let kidsFinalValue = kidsTotalValue - courtesyKidsValue
  let adultsFinalValue = adultsTotalValue - courtesyAdultsValue

  totalDolars.value =
    kidsFinalValue * kidsTicket +
    adultsFinalValue * adultsTicket
  totalBolivars.value = totalDolars.value * dolarToday.value;

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
  let kidsTotalValue = (+boysNumber.value) + (+girlsNumber.value);
  let courtesyKidsValue = +courtesyKidsNumber.value

  if (kidsTotalValue < courtesyKidsValue){
    formValidator("error", step1Container.querySelectorAll("#" + courtesyKidsNumber.id), "El número de entradas de cortesía no puede ser mayor al total de niños")
    invalid = true
  }

  let adultsTotalValue = (+menNumber.value) + (+womenNumber.value);
  let courtesyAdultsValue = +courtesyAdultsNumber.value

  if (adultsTotalValue < courtesyAdultsValue){
    formValidator("error", step1Container.querySelectorAll("#" + courtesyAdultsNumber.id), "El número de entradas de cortesía no puede ser mayor al total de adultos")
    invalid = true
  }

  let visits = [boysNumber, girlsNumber, menNumber, womenNumber, elderMenNumber, elderWomenNumber]
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
    case "Otro":
      methodHTML= `<label for="alternativeMethodInfo" class="col-12 text-start d-flex flex-column gap-2"><span class="fw-bold user-select-none">Información del Pago</span><textarea rows="2" id="alternativeMethodInfo" class="form-control px-1 py-0 text-start" style="resize: none;" autocomplete="off" name="extraInfoPayment" oninput="cleanInputs(step2Container)"></textarea></label>`;
      break;
    default:
      methodHTML= `<label for="referenceNumberOption" class="col-9 text-start d-flex flex-column gap-2"><span class="fw-bold user-select-none">Número de Referencia</span><input type="text" id="referenceNumberOption" class="form-control px-1 py-0 test-start" autocomplete="off" name="extraInfoPayment" oninput="cleanInputs(step2Container)" /></label>`;
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
  if (textMethodSelected == "Otro"){
    let alternativeMethodInfo = document.querySelector("#alternativeMethodInfo")
    if (alternativeMethodInfo.value != "" && alternativeMethodInfo.value.match("^[0-9A-ZÑa-zñáéíóúÁÉÍÓÚ.,$ ]+$")){
      invalid = false
    } else {
      return formValidator("error", step2Container.querySelectorAll("#alternativeMethodInfo"), "Explique el método de pago utilizado")
    }
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
  if (!representativeName.value.match("^[0-9A-ZÑa-zñáéíóúÁÉÍÓÚ ]+$") && representativeName.value != "") {
    formValidator("error", step3Container.querySelectorAll("#" + representativeName.id), "Introduzca un nombre válido")
  } else if (representativePhone.value.match("^[0-9,+ ]+$") == null && representativePhone.value != "") {
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

  document.querySelector("#kidsInvoice").innerHTML = (+boysNumber.value) + (+girlsNumber.value)
  document.querySelector("#adultsInvoice").innerHTML = (+menNumber.value) + (+womenNumber.value)
  document.querySelector("#eldersInvoice").innerHTML = (+elderMenNumber.value) + (+elderWomenNumber.value)
  document.querySelector("#representativeInvoice").innerHTML = representativeName.value == "" ? "Sin Asignar" : representativeName.value
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
  } else if (paymentMethod.value == "Otro"){
    let alternativeMethodInfo = document.querySelector("#alternativeMethodInfo")
    extraInfoTitle.innerHTML = "Información del Pago:";
    extraInfoInvoice.innerHTML = alternativeMethodInfo.value;
  } else {
    let referenceNumberOption = document.querySelector("#referenceNumberOption")
    extraInfoTitle.innerHTML = "Número de Referencia:";
    extraInfoInvoice.innerHTML = referenceNumberOption.value;
  }
}
