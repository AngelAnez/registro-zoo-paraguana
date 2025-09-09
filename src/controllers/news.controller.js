import { pool } from "../db.js";
import { DEFAULT_ALERT } from "../libs/default-alert.js";
import { getDateandTime } from "../libs/date.js";

const renderNews = async (
  req,
  res,
  { news, total, pag, sort, order, alert = DEFAULT_ALERT, searchFilter }
) => {
  const { username, admin } = req.user;

  return res.render("app/modules/news/news", {
    username,
    admin,
    news,
    total,
    pag,
    sort,
    order,
    searchFilter,
    ...alert,
  });
};

export const getNews = async (req, res) => {
  try {
    let sort = "";
    let order = ""; // Puede ser asc o dec
    let searchFilter = "";
    let query = `SELECT *, DATE_FORMAT(date_time, '%h:%i %p') as time, DATE_FORMAT(date_time, '%d/%m/%Y') as date FROM news
    `;
    let whereQuery = "";
    if (req.query.filter) {
      searchFilter = req.query.filter
        .replaceAll(/[^a-zA-Z0-9áéíóúÁÉÍÓÚÑñ/.:\- ]+/g, "")
        .toLowerCase();
      whereQuery = ` WHERE subject LIKE '%${searchFilter}%' OR
        body LIKE '%${searchFilter}%' OR
        author LIKE '%${searchFilter}%' OR
        DATE_FORMAT(date_time, '%d/%m/%Y') LIKE '%${searchFilter}%' OR
        DATE_FORMAT(date_time, "%h:%i %p") LIKE '%${searchFilter}%'`;
      query += whereQuery;
    }

    const totalNewsQuery = await pool.query(query);
    let total;
    if (!totalNewsQuery[0][0]) {
      total = [];
    } else {
      total = Object.values(totalNewsQuery[0][0])[0];
    }

    if (req.query.sort && req.query.order) {
      sort = req.query.sort;
      order = req.query.order;
      if (sort == "date") {
        query += ` ORDER BY DATE(date_time) ${order.toUpperCase()}`;
      } else {
        query += ` ORDER BY TIME(date_time) ${order.toUpperCase()}`;
      }
    } else {
      query += " ORDER BY _id DESC";
    }
    query += ` LIMIT 8`;

    const pag = req.query.pag ? parseInt(req.query.pag) : 1;
    if (pag > 1) {
      query += ` OFFSET ${8 * (pag - 1)}`;
    }
    const newsQuery = await pool.query(query + ";");
    const news = newsQuery[0];
    if (!news) {
      news = [];
    }
    renderNews(req, res, { news, pag, sort, total, order, searchFilter });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const postNews = async (req, res) => {
  const { _id, author, subject, body, createNew, modifyNew, deleteNew } =
    req.body;
  let message = "";
  try {
    if (createNew) {
      const { date_time } = getDateandTime();
      await pool.query(`INSERT INTO news (author, subject, body, date_time) 
            VALUES ('${author}', '${subject}', '${body}', STR_TO_DATE('${date_time}', '%m/%d/%Y, %I:%i:%s %p' ));`);
      message = "La Novedad ha sido guardada existosamente";
    }
    if (modifyNew) {
      await pool.query(
        `UPDATE news SET subject = '${subject}', body = '${body}' WHERE _id = ${_id}`
      );
      message = "La Novedad ha sido modificada existosamente";
    }
    if (deleteNew) {
      await pool.query(`DELETE FROM news WHERE _id = ${_id}`);
      message = "La Novedad ha sido eliminada existosamente";
    }
    const alert = {
      showAlert: true,
      messageAlert: message,
      typeAlert: "success",
    };

    getNews(req, res, alert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
