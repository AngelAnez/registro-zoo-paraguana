import { pool } from "../db.js";

export const getNews = async (req, res, alert) => {
    const { username, admin } = req.user;

    let showAlert, messageAlert, typeAlert
    if (alert){
        showAlert = alert.showAlert
        messageAlert = alert.messageAlert
        typeAlert = alert.typeAlert
    } else {
        showAlert = false
        messageAlert = ""
        typeAlert = ""
    }
    try {
        let pag = 1;
    let sort = ""; // Puede ser cualquier propiedad de las visitas
    let order = ""; // Puede ser asc o dec
    let searchFilter = "";
    let query = `SELECT *, DATE_FORMAT(date, '%d/%m/%Y') AS dateStyled, TIME_FORMAT(time, "%h:%i %p") AS timeStyled FROM news
    `
    let whereQuery = ""
    if (req.query.filter) {
        searchFilter = req.query.filter
          .replaceAll(/[^a-zA-Z0-9áéíóúÁÉÍÓÚÑñ/.:\- ]+/g, "")
          .toLowerCase()
        whereQuery = ` WHERE subject LIKE '%${searchFilter}%' OR
        body LIKE '%${searchFilter}%' OR
        author LIKE '%${searchFilter}%' OR
        DATE_FORMAT(date, '%d/%m/%Y') LIKE '%${searchFilter}%' OR
        TIME_FORMAT(time, "%h:%i %p") LIKE '%${searchFilter}%'`
        query += whereQuery
      }
    
    const totalNewsQuery = await pool.query(`${query.replace("*", "COUNT(*)")};`)
    let total = Object.values(totalNewsQuery[0][0])[0]

    if (req.query.sort && req.query.order) {
        sort = req.query.sort;
        order = req.query.order;
        if (sort == "date"){
          query += ` ORDER BY news.${sort} ${order.toUpperCase()}, time DESC`
        } else {
          query += ` ORDER BY news.${sort} ${order.toUpperCase()}, date DESC`
        }
    } else {
        query += ' ORDER BY _id DESC'
    }
    query+= ` LIMIT 8`
    if (req.query.pag) {
        pag = parseInt(req.query.pag);
        if (pag > 1){
          query+= ` OFFSET ${8*(pag-1)}`
        }
    }
    const newsQuery = await pool.query(query + ";")
    const news = newsQuery[0]
    if (!news) {
      news = [];
    }

    res.render("novedades", {
        username,
        admin,
        news,
        total,
        pag,
        sort,
        order,
        searchFilter,
        showAlert,
        messageAlert,
        typeAlert
      });
    } catch (error) {
     res.status(500).json({message: error.message})   
    }
}

export const postNews = async (req, res) => {
    const {_id, author, subject, body, createNew, modifyNew, deleteNew} = req.body
    let message = ""
    try {
        if (createNew){
            await pool.query(`INSERT INTO news (author, subject, body) 
            VALUES ('${author}', '${subject}', '${body}')`)
            message = "La Novedad ha sido guardada existosamente"
        }
        if (modifyNew){
            await pool.query(`UPDATE news SET subject = '${subject}', body = '${body}' WHERE _id = ${_id}`)
            message = "La Novedad ha sido modificada existosamente"
        }
        if (deleteNew){
            await pool.query(`DELETE FROM news WHERE _id = ${_id}`)
            message = "La Novedad ha sido eliminada existosamente"
        }
        const alert = {
            showAlert: true,
            messageAlert: message,
            typeAlert: "success"
          }
    
        getNews(req, res, alert)
    } catch (error) {
        res.status(500).json({message: error.message})
    }

}