export const getNovedades = (req, res) => {
    const { username, admin } = req.user;
    const news = [{
        date: "11/04/2024",
        time: "11:19 PM",
        subject: "Entrega de Suplementos Alimenticios de la Escuela U.E.A Nicolás Curiel Coutinho Alabroma este",
        body: "Hola mundo, aqui andamos intentando avanzar",
        author: "Angel Añez"
    },
    {
        date: "11/04/2024",
        time: "7:25 PM",
        subject: "Loro llorando",
        body: "Hola mundo, aqui andamos intentando avanzar",
        author: "Angel Añez"
    },
    {
        date: "07/04/2024",
        time: "9:12 AM",
        subject: "Visita de Guillermo Perez",
        body: "Hola mundo, aqui andamos intentando avanzar",
        author: "Angel Añez"
    },
    {
        date: "30/03/2024",
        time: "12:12 PM",
        subject: "Escapada de guacamaya roja",
        body: "Hola mundo, aqui andamos intentando avanzar",
        author: "Angel Añez"
    },{
        date: "27/03/2024",
        time: "3:07 PM",
        subject: "Donación por parte de Iglesia Chiquinquirá",
        body: "Hola mundo, aqui andamos intentando avanzar",
        author: "Angel Añez"
    }]
    /* Máximo 90 Caracteres con el atributo maxlength="90" */
    const total = 1
    const pag = 10
    const sort = ""
    const order = ""
    const searchFilter = ""
    res.render("novedades", {
        username,
        admin,
        news,
        total,
        pag: pag / 10,
        sort,
        order,
        searchFilter,
      });
}