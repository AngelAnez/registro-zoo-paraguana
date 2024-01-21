const { Router } = require("express")
const path = require("path")
const fs = require("fs")
const router = Router()

router.get("/historial", (req, res) => {
    let pag = 10
    let sort = "" // Puede ser cualquier propiedad de las visitas
    let order = "" // Puede ser asc o dec
    if (req.query.pag){
        pag = parseInt(req.query.pag)*10
    }
    if (req.query.sort && req.query.order){
        sort = req.query.sort
        order = req.query.order
    }
    const visitsData = showVisits(pag, sort, order)
    res.render("historial", {
        visitsData,
        pag,
        sort,
        order
    })
})

const dirApp = path.normalize(__dirname + path.sep + "..")

function showVisits(pag, sort, order){
    const data = fs.readFileSync(path.join(dirApp, "/data/visitas.txt"),{
        encoding: "utf-8"
    })    
    let visits = data.split("\n").filter(e => e != "").reverse()
    visits = visits.filter((e, index) => {
        if (index > pag-11 && index < pag){
            return e
        }
    })
    visits = visits.map(visit => {
        let visitInfo = visit.split(", ").map(info => {
            info = info.split(": ")
            return info[1]
        })
        return {
            date: visitInfo[0],
            time: visitInfo[1],
            child: visitInfo[2],
            adult: visitInfo[3],
            older: visitInfo[4],
            total: visitInfo[5],
            dolar: visitInfo[6],
            bolivares: visitInfo[7],
            method: visitInfo[8],
            infoMethod: visitInfo[9],
            name: visitInfo[10],
            telephone: visitInfo[11]
        }
    })
    if (sort != "" && order != ""){
        if (order == "dec"){
            visits.sort((a,b) => {
                if (a[sort].includes(":")){
                    return comparingTime(a[sort],b[sort],order)
                } 
                if (a[sort].includes("i")){
                    if (a[sort] > b[sort]) {
                        return -1;
                      }
                      if (a[sort] < b[sort]) {
                        return 1;
                      }
                      if (a[sort] == b[sort]){
                        return comparingTime(a.time,b.time,"dec")
                      }
                }
                return parseInt(b[sort]) - parseInt(a[sort])
            })
        }
        if (order == "asc"){
            visits.sort((a,b) => {
                if (a[sort].includes(":")){
                    return comparingTime(a[sort],b[sort],order)
                } 
                if (a[sort].includes("i")){
                    if (a[sort] > b[sort]) {
                        return 1;
                      }
                      if (a[sort] < b[sort]) {
                        return -1;
                      }
                      if (a[sort] == b[sort]){
                        return comparingTime(a.time,b.time,"dec")
                      }
                }
                return parseInt(a[sort]) - parseInt(b[sort])
            })
        }
    }
    return visits
}

function comparingTime (a,b,order){
    let hours = [a, b]
    hours = hours.map(hour => {
        hour = hour.split(":")
        hour[1].includes("pm") && (hour[0] = parseInt(hour[0]) + 12)
        hour[1] = hour[1].replaceAll(/ [a|p]m/g, "")
        hour[1] = parseInt(hour[1])
        hour = (hour[0] * 3600 + hour[1] * 60)
        return hour
    })
    if (order === "dec"){
        return hours[1] - hours[0]
    }
    if (order == "asc"){
        return hours[0] - hours[1]
    }
    
}

module.exports = router