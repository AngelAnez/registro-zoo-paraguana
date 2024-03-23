const visitInfoModal = document.getElementById('visitInfoModal')
visitInfoModal.addEventListener('show.bs.modal', event => {
    const button = event.relatedTarget
    const visitData = ['date', 'time', 'childrenNumber', 'adultsNumber', 'seniorsNumber', 'paymentMethod', 'totalBolivars', 'totalDolars', 'extraInfoPayment', 'representativeName', 'representativePhone']
    visitData.forEach(data => {
        let value = button.getAttribute(`data-bs-${data}`)
        if (document.getElementById(`${data}VisitValue`)){
            document.getElementById(`${data}VisitValue`).innerHTML = value
        }
        if (data == "paymentMethod"){
            const extraInfoType = document.getElementById("extraInfoType")
            if (value === "Efectivo") extraInfoType.innerHTML = "Moneda:"
            if (value === "Otro") extraInfoType.innerHTML = "Información del Pago:"
            if (value === "Pago Móvil") extraInfoType.innerHTML = "Número de Referencia:"
            if (value === "Transferencia") extraInfoType.innerHTML = "Número de Referencia:"
        }
    })
})