const visitInfoModal = document.getElementById('visitInfoModal')
visitInfoModal.addEventListener('show.bs.modal', event => {
    const button = event.relatedTarget
    const visitData = ['date', 'time','boys', 'girls', 'courtesyKids', 'totalKids', 'men', 'women','courtesyAdults', 'totalAdults', 'elderMen', 'elderWomen', 'totalElders', 'method', 'extraInfoTitle', 'totalBolivars', 'totalDolars', 'paymentInfo', 'representativeName', 'representativePhone']
    visitData.forEach(data => {
        let value = button.getAttribute(`data-bs-${data}`)
        if (document.getElementById(`${data}VisitValue`)){
            document.getElementById(`${data}VisitValue`).innerHTML = value
        }
    })
})