/* Constantes */

const ninos_in_dolars = 1;
const adults_in_dolars = 2;
const elders_in_dolars = 1;

const bolivars_per_dolar = 34.5;

/* const { getMonitor} = require("consulta-dolar-venezuela");

getMonitor("bcv","price")
  .then((result) => {
    console.log(result);
})
  .catch((error) => {
    console.log(error)
  }) */



/* Variables */

let ninos = document.getElementById("cant_nino");
let adults = document.getElementById("cant_adult");
let elders = document.getElementById("cant_mayores");
let family = document.getElementById("total_family");
let validation_1 = document.getElementById("total_visit_validation");

let dolars = document.getElementById("monto_dolares");
let bolivars = document.getElementById("monto_bolivares");
let method = document.getElementById("metodo_pago");
let extra_info_method = document.getElementById("info_payment_method");
let validation_2 = document.getElementById("payment_validation");

let represent_name = document.getElementById("nombre_representante");
let represent_phone = document.getElementById("telefono_representante");

/* Funciones */

let dolar_today = document.getElementById("dolar_today");
dolar_today.innerHTML = bolivars_per_dolar + " Bs.";

/* Cambio de Pasos y Estilos de Validaciones */

function addZero(number) {
  if (number < 10) {
    number = "0" + number;
  }
  return number;
}

function change_step(step) {
  for (let i = 1; i < 5; i++) {
    if (i == step) {
      document.getElementById("step_" + i + "_circle").className =
        "circle_steps_on";
      document.getElementById("registrar_visitantes_paso_" + i).style.display =
        "flex";
    } else {
      document.getElementById("step_" + i + "_circle").className =
        "circle_steps";
      document.getElementById("registrar_visitantes_paso_" + i).style.display =
        "none";
    }
  }
}

function clean_validation(step, hidden, tag, info_text) {
  if (hidden) {
    if (tag) {
      tag.className = "form-control p-0";
    }
    document.getElementById("validacion_paso_" + step).className = "validando";
  } else {
    if (tag) {
      tag.className = "form-control p-0 is-invalid";
    }
    if (info_text) {
      document.getElementById("validacion_paso_" + step).innerHTML = info_text;
    } else {
      document.getElementById("validacion_paso_" + step).innerHTML =
        "Complete los campos requeridos.";
    }
    document.getElementById("validacion_paso_" + step).className =
      "validacion-erronea";
  }
}

/* Paso 1 */

/* Input total dinámico */
function totalFamily() {
  clean_validation(1, true, ninos);
  clean_validation(1, true, adults);
  clean_validation(1, true, elders);
  clean_validation(1, true, family);

  let valor_de_ninos = +ninos.value;
  let valor_de_adults = +adults.value;
  let valor_de_elders = +elders.value;

  family.value = valor_de_ninos + valor_de_adults + valor_de_elders;
  dolars.value =
    valor_de_ninos * ninos_in_dolars +
    valor_de_adults * adults_in_dolars +
    valor_de_elders * elders_in_dolars;
  bolivars.value = dolars.value * bolivars_per_dolar;

  dolars.value += "$";
  bolivars.value += " Bs.";
}

function validacion_paso_1() {
  let alert_msj = "No puede registrar visitas en negativo.";
  if (+ninos.value < 0) {
    clean_validation(1, false, ninos, alert_msj);
  } else if (+adults.value < 0) {
    clean_validation(1, false, adults, alert_msj);
  } else if (+elders.value < 0) {
    clean_validation(1, false, elders, alert_msj);
  } else if (family.value == 0) {
    let alert_msj = "El número de visitantes no puede ser 0.";
    clean_validation(1, false, family, alert_msj);
  } else {
    clean_validation(1, true, family);
    change_step(2);
  }
}

/* Paso 2 */

function payment_method() {
  let index_method = method.selectedIndex;
  let text_method = method.options[index_method].text;
  let input_info = "";
  clean_validation(2, true);
  switch (text_method) {
    case "Efectivo":
      input_info = `<section class="col-9"><span class="visit_text text-center" style="width: 100%;">Moneda</span><section class="d-flex align-items-center justify-content-around mt-1"><div class="radio"><label for="dolar_option" style="margin-right:0.4rem; user-select:none;">Dólar</label><input type="radio" id="dolar_option" value="Dolar" class="form-check-input" style="margin-top: 0.4rem;" name="info_payment_method" required/></div><div class="radio"><label for="bolivar_option" style="margin-right:0.4rem; user-select:none;">Bolívar</label><input type="radio" id="bolivar_option" value="Bolivar" class="form-check-input" style="margin-top: 0.4rem;" name="info_payment_method" required/></div></section></section>`;
      break;
    default:
      input_info = `<div class="col-9 text-start"><span class="visit_text">Número de Referencia</span><input type="text" id="info_payment_value" class="form-control p-0" style="text-align: center; margin-top: 0.4rem;" autocomplete="off" name="info_payment_method" oninput="clean_validation(2,true,info_payment_value)" /></div>`;
      break;
  }
  let add_html = input_info;
  extra_info_method.innerHTML = add_html;
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
        change_step(3);
      } else {
        let alert_msj = "Seleccione el tipo de moneda para pagar.";
        clean_validation(2, false, false, alert_msj);
      }
      break;
    default:
      let info_payment_value = document.getElementById("info_payment_value");
      if (info_payment_value.value > 0) {
        clean_validation(2, true, info_payment_value);
        change_step(3);
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
    change_step(4);
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
  factura_nino.innerHTML = +ninos.value;
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
