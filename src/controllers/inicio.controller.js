import { bcvDolar } from "bcv-divisas"

export const renderInicio = (req, res) => {
    res.render("inicio")
}

export const getDolarValue = async (req, res) => {
    // Consulta a la BDD
    const customDolar = false
    if (!customDolar){
        try {
            const bcv = await bcvDolar()
            return res.send(bcv._dolar)
        } catch (error) {
            console.log("Ha ocurrido un error de conexión")
        }
    }
    // Consulta a la BDD
    const defaultDolar = "12"
    res.send(defaultDolar)
}