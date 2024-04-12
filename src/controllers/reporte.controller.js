import { buildPDF } from "../libs/pdfKit.js";
import { dateStyleDMY } from "../libs/date.js";

export const generateReport = (req, res) => {
    const {startDate, endDate} = req.body
    
    let reportName
    if (startDate == endDate){
        reportName = `Reporte_Zoo_del_${dateStyleDMY(startDate)}`
    } else {
        reportName = `Reporte_Zoo_del_${dateStyleDMY(startDate)}_al_${dateStyleDMY(endDate)}`
    }
    
    const stream = res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=${reportName}.pdf`
    })

    buildPDF(
        (data) => stream.write(data),
        () => stream.end(),
        {startDate, endDate}
    )
}