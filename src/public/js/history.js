const infoVisitModal = document.getElementById('infoVisitModal')
infoVisitModal.addEventListener('show.bs.modal', event => {
    const visitCompleteInfo = event.relatedTarget
    const action = visitCompleteInfo.getAttribute(`data-bs-action`)
    if (action == "modify"){
        document.getElementById('checkButtonVisit').classList.remove("visually-hidden")
    }
    if (action == "view"){
        document.getElementById('checkButtonVisit').classList.add("visually-hidden")
    }    
    document.getElementById('_idVisitValue').value = visitCompleteInfo.getAttribute(`data-bs-_id`)
    document.getElementById('kids_idVisitValue').value = visitCompleteInfo.getAttribute(`data-bs-kids_id`)
    document.getElementById('adults_idVisitValue').value = visitCompleteInfo.getAttribute(`data-bs-adults_id`)
    document.getElementById('elders_idVisitValue').value = visitCompleteInfo.getAttribute(`data-bs-elders_id`)
    const visitData = ['date', 'time','boys', 'girls', 'courtesyKids',, 'men', 'women','courtesyAdults', 'elderMen', 'elderWomen', 'method', 'methodValidation', 'totalBolivars', 'totalDollars', 'paymentData', 'representativeName', 'representativePhone']
    visitData.forEach(data => {
        let value = visitCompleteInfo.getAttribute(`data-bs-${data.toLowerCase()}`)
        if (document.getElementById(`${data}VisitValue`)){
            if (action == "view"){
                if (data == "representativeName" || data == "representativePhone") {
                    document.getElementById(`${data}VisitValue`).innerHTML = `<h6 class=" fw-semibold ps-0 py-0 mb-0" >${value}</h6>`
                } else if (data == "date" || data == "time") {
                    document.getElementById(`${data}VisitValue`).innerHTML = value
                } else if (data == "method") {
                    document.getElementById(`${data}VisitValue`).innerHTML = `<p class="m-0 fw-bold">Método de Pago: </p> <span>${value}</span>`
                } else if (data == "methodValidation"){
                    document.getElementById(`${data}VisitValue`).innerHTML = `<p class="m-0 fw-bold">${value}:</p>
                    <p class="m-0" id="paymentDataVisitValue"></p>`
                } else if (data == "paymentData"){
                    document.getElementById(`${data}VisitValue`).innerHTML = value
                } else if (data == "totalBolivars" || data == "totalDollars") {
                    document.getElementById(`${data}VisitValue`).innerHTML = `<p type="number" class="p-0 text-end fw-semibold fs-5 w-75 m-0">${value}</p> <span>${data == "totalDolars" ? "$" : "Bs."}</span>`
                } else {
                    document.getElementById(`${data}VisitValue`).innerHTML = `<h5 class="text-center">${value}</h5>`
                }
            }
            if (action == "modify"){
                if (data == "representativeName" || data == "representativePhone") {
                    document.getElementById(`${data}VisitValue`).innerHTML = `<input type="text" class="w-75 fw-semibold ps-0 py-0 form-control mb-0 ps-1" name="${data}" value="${value}" required autocomplete="off" pattern="[0-9A-ZÑa-zñáéíóúÁÉÍÓÚ.,$+#- ]+">`
                } else if (data == "date" || data == "time") {
                    document.getElementById(`${data}VisitValue`).innerHTML = value
                } else if (data == "method") {
                    document.getElementById(`${data}VisitValue`).innerHTML = `<p class="m-0 fw-bold">Método de Pago: </p>
                    <select id="dinamicSelectVisit" class="fw-normal bg-transparent text-white form-select p-0 ps-1 w-50 d-flex" name="method" onchange="dinamicPaymentInfo()">
                      <option ${value == "Transferencia" && "selected"} class="text-dark">Transferencia</option>
                      <option ${value == "Pago Móvil" && "selected"} class="text-dark">Pago Móvil</option>
                      <option ${value == "Efectivo" && "selected"} class="text-dark">Efectivo</option>
                      <option ${value == "Otro" && "selected"} class="text-dark">Otro</option>
                    </select>`
                } else if (data == "extraInfoTitle") {
                    document.getElementById(`${data}VisitValue`).innerHTML = `<p id="methodSubtitle" class="m-0 fw-bold">${value}</p>
                    <section id="paymentInfoVisitValue"></section>`
                } else if (data == "paymentInfo") { 
                    document.getElementById(`${data}VisitValue`).innerHTML = `<input type="text" id="methodInfo" class="form-control p-0 bg-transparent text-white ps-1" name="${data}" value="${value}" required autocomplete="off" pattern="[0-9A-ZÑa-zñáéíóúÁÉÍÓÚ.,$#+- ]+">`  
                } else if (data == "totalBolivars" || data == "totalDolars") {
                    document.getElementById(`${data}VisitValue`).innerHTML = `<input type="text" class="form-control p-0 bg-transparent text-white ps-1 w-75 text-end fw-semibold fs-5" name="${data}" value="${value}" required autocomplete="off" pattern="^([0-9]{1,6}(\.[0-9]{1,2})?)$"><span>${data == "totalDolars" ? "$" : "Bs."}</span>`
                } else {
                    document.getElementById(`${data}VisitValue`).innerHTML = `<input type="text" class="fw-semibold text-center form-control p-0" name='${data}' value="${value}" maxlength="3" pattern="[0-9]+" autocomplete="off">`
                }
            }
        }
    })
})

const deleteVisitModal = document.getElementById('deleteVisitModal')

deleteVisitModal.addEventListener('show.bs.modal', event => {
    const button = event.relatedTarget
    const ids = ['_id', 'kids_id', 'adults_id', 'elders_id']
    ids.forEach(element => {
        let value = button.getAttribute(`data-bs-${element}`)
        let idInput = deleteVisitModal.querySelector(`input[name="${element}"]`)
        idInput.value = value 
    })
     
})

const dinamicPaymentInfo = () => {
    const dinamicSelect = document.getElementById("dinamicSelectVisit")
    const methodSubtitle = document.getElementById("methodSubtitle")
    const methodInfo = document.getElementById("methodInfo")
    let indexMethodSelected = dinamicSelect.selectedIndex;
    let textMethodSelected = dinamicSelect.options[indexMethodSelected].text;
    let subtitleText = "";
    switch (textMethodSelected) {
        case "Efectivo":
        subtitleText= 'Moneda:';
        methodInfo.value = ""
        break;
        case "Otro":
        subtitleText= 'Información del Pago:'
        methodInfo.value = ""
        break;
        default:
        subtitleText= `Número de Referencia:`;
        methodInfo.value = ""
        break;
    }
    methodSubtitle.innerHTML = subtitleText;
}