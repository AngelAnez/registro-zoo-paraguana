/* Constantes */
const alertInfo = document.getElementById("alertInfo");
const alertInfoToast = bootstrap.Toast.getOrCreateInstance(alertInfo);

const childrenNumber = document.getElementById("childrenNumber");
const adultsNumber = document.getElementById("adultsNumber");
const seniorsNumber = document.getElementById("seniorsNumber");
const family = document.getElementById("totalFamily");

const ninos_in_dolars = 1;
const adults_in_dolars = 2;
const elders_in_dolars = 1;

let totalDolars = document.getElementById("totalDolars");
let totalBolivars = document.getElementById("totalBolivars");
let selectPaymentMethod= document.getElementById("selectPaymentMethod");
let methodSelected = document.getElementById("methodSelected");
let validation_2 = document.getElementById("payment_validation");

let represent_name = document.getElementById("nombre_representante");
let represent_phone = document.getElementById("telefono_representante");

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

function changeStep(step) {
  for (let i = 1; i < 5; i++) {
    if (i == step) {
      document.getElementById("step" + i + "Circle").classList.add("text-bg-light")
      document.getElementById("step" + i + "Circle").classList.remove("text-bg-success")
      document.getElementById("addNewVisitStep" + i).classList.replace("d-none", "d-flex");
    } else {
      document.getElementById("step" + i + "Circle").classList.remove("text-bg-light")
      document.getElementById("step" + i + "Circle").classList.add("text-bg-success")
      document.getElementById("addNewVisitStep" + i).classList.replace("d-flex", "d-none");
    }
  }
}

const formValidator = (type, tag, message) => {
  if (type == "error"){
    tag.classList.add("is-invalid")
    alertCall("danger", message)
  } else {
    tag.classList.remove("is-invalid")
    alertInfoToast.hide();
  }
}

/* Step 1*/

function changeFamilyNumber() {
  formValidator("clean", childrenNumber)
  formValidator("clean", adultsNumber)
  formValidator("clean", seniorsNumber)
  formValidator("clean", family)

  let childrenTotalValue = +childrenNumber.value;
  let adultsTotalValue = +adultsNumber.value;
  let seniorsTotalValue = +seniorsNumber.value;

  family.value = childrenTotalValue + adultsTotalValue + seniorsTotalValue;
  totalDolars.value =
    childrenTotalValue * ninos_in_dolars +
    adultsTotalValue * adults_in_dolars +
    seniorsTotalValue * elders_in_dolars;
  totalBolivars.value = totalDolars.value * dolar_today.value;

  totalBolivars.value = parseFloat(totalBolivars.value).toFixed(2)

  totalDolars.value += "$";
  totalBolivars.value += " Bs.";
}

function validateStep1() {
  let invalid = false

  if (family.value == 0){
    formValidator("error", family, "El número de visitantes no puede ser 0")
    invalid = true
  } 

  let visits = [childrenNumber, adultsNumber, seniorsNumber]
  for (let i = 0; i < visits.length; i++) {
    if (visits[i].value < 0){
      formValidator("error", visits[i], "No puede registrar visitas en negativo")
      invalid = true
    }
  }

  if (!invalid){
    formValidator("clean", family)
    changeStep(2);
  }
 
}

/* Paso 2 */

function dinamicPaymentMethod() {
  let indexMethodSelected = selectPaymentMethod.selectedIndex;
  let textMethodSelected = selectPaymentMethod.options[indexMethodSelected].text;
  let methodHTML = "";
  switch (textMethodSelected) {
    case "Efectivo":
      methodHTML= `<section class="col-9 d-flex flex-column gap-2"><span class="fw-bold user-select-none text-center" style="width: 100%;">Moneda</span><section class="d-flex align-items-center justify-content-around"><label for="dolarOption" class="d-flex gap-2"><span class="user-select-none">Dólar</span><input type="radio" id="dolarOption" value="Dolar" class="form-check-input" name="extraInfoPayment" required/></label><label for="bolivarOption" class="d-flex gap-2"><span for="bolivarOption" class="user-select-none">Bolívar</span><input type="radio" id="bolivarOption" value="Bolivar" class="form-check-input" name="extraInfoPayment" required/></label></section></section>`;
      break;
    default:
      methodHTML= `<label for="referenceNumberOption" class="col-9 text-start d-flex flex-column gap-2"><span class="fw-bold user-select-none">Número de Referencia</span><input type="text" id="referenceNumberOption" class="form-control p-0 text-center" autocomplete="off" name="extraInfoPayment" oninput="clean_validation(2,true,extraInfoPayment)" /></label>`;
      break;
  }
  methodSelected.innerHTML = methodHTML;
}

function validacion_paso_2() {
  let index_method = method.selectedIndex;
  let text_method = method.options[index_method].text;
  switch (text_method) {
    case "":
      let alert_msj = "Seleccione el método de pago.";
      clean_validation(2, false, false, alert_msj);
    case "Efectivo":
      let dolar_option = document.getElementById("dolar_option").checked;
      let bolivar_option = document.getElementById("bolivar_option").checked;
      if (dolar_option || bolivar_option) {
        clean_validation(2, true);
        changeStep(3);
      } else {
        let alert_msj = "Seleccione el tipo de moneda para pagar.";
        clean_validation(2, false, false, alert_msj);
      }
      break;
    default:
      let info_payment_value = document.getElementById("info_payment_value");
      if (info_payment_value.value > 0) {
        clean_validation(2, true, info_payment_value);
        changeStep(3);
      } else {
        let alert_msj = "Introduzca un número de referencia válido.";
        clean_validation(2, false, info_payment_value, alert_msj);
      }
      break;
  }
}

/* Paso 3 */

function validacion_paso_3() {
  if (represent_name.value.match("^[0-9A-ZÑa-zñáéíóúÁÉÍÓÚ ]+$") == null) {
    let alert_msj = "Introduzca un nombre válido.";
    clean_validation(3, false, represent_name, alert_msj);
  } else if (represent_phone.value.match("^[0-9,+ ]+$") == null) {
    let alert_msj = "Introduzca un número de teléfono válido.";
    clean_validation(3, false, represent_phone, alert_msj);
  } else {
    clean_validation(3, true);
    changeStep(4);
    all_values();
  }
}

/* Paso 4 */

function all_values() {
  let hoy = new Date();
  let hour = hoy.getHours();
  let minutes = hoy.getMinutes();
  let period = "";
  let day = hoy.getDate();
  let month = hoy.getMonth() + 1;
  let year = hoy.getFullYear();

  if (hour > 12) {
    hour = hour - 12;
    period = "pm";
  } else if (hour == 0) {
    hour = 12;
    period = "am";
  } else if (hour == 12) {
    period = "pm";
  } else {
    period = "am";
  }

  minutes = addZero(minutes);
  day = addZero(day);
  month = addZero(month);

  document.getElementById("dateInput").value = `${day}/${month}/${year}`
  document.getElementById("timeInput").value = `${hour}:${minutes} ${period}`
  
  let factura_fecha = document.getElementById("factura_fecha");
  let factura_hora = document.getElementById("factura_hora");
  let factura_nino = document.getElementById("factura_nino");
  let factura_adult = document.getElementById("factura_adult");
  let factura_elder = document.getElementById("factura_elder");
  let factura_metodo = document.getElementById("factura_metodo");
  let factura_info_extra = document.getElementById("factura_info_extra");
  let factura_extra = document.getElementById("factura_extra");
  let factura_represent = document.getElementById("factura_represent");
  let factura_monto = document.getElementById("factura_monto");

  factura_fecha.innerHTML = `${day}/${month}/${year}`;
  factura_hora.innerHTML = `${hour}:${minutes} ${period}`;
  factura_nino.innerHTML = +childrenNumber.value;
  factura_adult.innerHTML = +adults.value;
  factura_elder.innerHTML = +elders.value;
  factura_represent.innerHTML = represent_name.value;
  factura_monto.innerHTML = bolivars.value;
  factura_metodo.innerHTML = method.value;
  if (method.value == "Efectivo") {
    factura_extra.innerHTML = "Moneda:";
    if (dolar_option.checked) {
      factura_info_extra.innerHTML = dolar_option.value;
      factura_monto.innerHTML = dolars.value;
    } else {
      factura_info_extra.innerHTML = bolivar_option.value;
    }
  } else {
    factura_extra.innerHTML = "Número de Referencia:";
    factura_info_extra.innerHTML = info_payment_value.value;
  }
}
