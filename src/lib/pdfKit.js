import PDFDocument from "pdfkit-table";
import { getVisitStats } from "../controllers/estadisticas.controller.js";
import { pool } from "../mysqlDb.js";
import { DIR_APP } from "../global.js";
import path from "path";
import { dateStyleDMY } from "../lib/date.js";

export const buildPDF = async (dataCallback, endCallback, dates) => {
    const {startDate, endDate} = dates

    const dataQuery = await pool.query(`SELECT * FROM visits INNER JOIN paymentMethod ON visits.paymentMethod_id=paymentMethod._id
    INNER JOIN kids ON visits.kids_id=kids._id
    INNER JOIN adults ON visits.adults_id=adults._id
    INNER JOIN elders ON visits.elders_id=elders._id
    WHERE date BETWEEN '${startDate}' AND '${endDate}'`)

    const data = dataQuery[0]

    const { boys, girls, courtesyKids, men, women, courtesyAdults, elderMen, elderWomen, totalKids, totalAdults, totalElders, totalBolivars, totalDolars, cash, bankTransfer, mobilePay, other } = getVisitStats(data)

    const doc = new PDFDocument({font: 'Times-Roman', size: 'Letter', margin: 50})
    doc.on("data", dataCallback)
    doc.on("end", endCallback)

    const buildTable = async (table, y) => {
        await doc.table(table, {
            prepareHeader: () => doc.font("Times-Bold").fontSize(12),
            prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => doc.font("Times-Roman").fontSize(12),
            x: 112,
            y,
            align: "center"
        });
    }

    /* la anchura (x) es de 608px  */
    /* la altura (y) es de 784px  */

    doc.image(path.join(DIR_APP, '/public/assets/img/zoo-logo.jpg'), 16, 8, {scale: 0.25})

    doc.fontSize(20).font("Times-Bold").text(`Reporte General del Registro de Visitantes`, 0, 120, {
        width: 608,
        align: "center"
    })
    if (startDate == endDate){
        doc.fontSize(16).font('Times-Roman').text(`${dateStyleDMY(startDate)}`, 0, 150, {
            width: 608,
            align: "center"
        })
    } else {
        doc.fontSize(16).font('Times-Roman').text(`${dateStyleDMY(startDate)} - ${dateStyleDMY(endDate)}`, 0, 150, {
            width: 608,
            align: "center"
        })
    }
    
    doc.image(path.join(DIR_APP, '/public/assets/img/visitors.png'), 60, 212, {scale: 0.08}).fontSize(24).text(`Visitantes: ${totalKids + totalAdults + totalElders}`, 112, 224)

    let visitsData = {
        headers: [ 
            {label: "", property: 'category', width: 100, align: "center", headerColor: "#198754"},
            {label: "Niños", property: 'kids', width: 100, align: "center", headerColor: "#198754"},
            {label: "Adultos", property: 'adults', width: 100, align: "center", headerColor: "#198754"},
            {label: "Adultos Mayores", property: 'elders', width: 100, align: "center", headerColor: "#198754"}
        ],
        datas: [
          {category: {label: "Masculinos", options: {fontFamily: "Times-Bold"}}, 
          kids: boys, 
          adults: men, 
          elders: elderMen},
          {category: {label: "Femeninos", options: {fontFamily: "Times-Bold"}}, 
          kids: girls, 
          adults: women, 
          elders: elderWomen},
          {category: {label: "Cortesía", options: {fontFamily: "Times-Bold"}}, 
          kids: courtesyKids, 
          adults: courtesyAdults},
        ]
      };
    buildTable(visitsData, 268)

    doc.image(path.join(DIR_APP, '/public/assets/img/income.png'), 60, 412, {scale: 0.08}).fontSize(24).text(`Ingresos Totales: ${totalDolars} $`, 112, 424)    
    
    let incomeData = {
        headers: [ 
            {label: "", property: 'category', width: 80, align: "center", headerColor: "#198754"},
            {label: "Pago Móvil", property: 'mobilePay', width: 80, align: "center", headerColor: "#198754"},
            {label: "Transferencia", property: 'bankTransfer', width: 80, align: "center", headerColor: "#198754"},
            {label: "Efectivo", property: 'cash', width: 80, align: "center", headerColor: "#198754"},
            {label: "Otro", property: 'other', width: 80, align: "center", headerColor: "#198754"}
        ],
        datas: [
          {category: {label: "Dolares", options: {fontFamily: "Times-Bold"}}, 
          mobilePay: mobilePay.dolars, 
          bankTransfer: bankTransfer.dolars, 
          cash: cash.dolars,
          other: other.dolars},
          {category: {label: "Bolivares", options: {fontFamily: "Times-Bold"}}, 
          mobilePay: mobilePay.bolivars, 
          bankTransfer: bankTransfer.bolivars, 
          cash: cash.bolivars,
          other: other.bolivars}
        ]
      };
    buildTable(incomeData, 468)

    doc.end()
}