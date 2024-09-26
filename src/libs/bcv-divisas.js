import axios from "axios"
import https from 'https'
import * as cheerio from "cheerio"
const httpsAgent = new https.Agent({ rejectUnauthorized: false })

export const bcvDolar = async() => {
    const result=await axios.get('https://www.bcv.org.ve',{httpsAgent})
    const $ =cheerio.load(result.data)
    const dolar = $('#dolar').text().trim().match(/[0-9]+,[0-9]+/)
    const euro  = $('#euro').text()
    const yuan  = $('#yuan').text()
    const lira  = $('#lira').text()
    const rublo  = $('#rublo').text()
    return {
        _dolar: dolar[0],
        _euro: euro,
        _yuan: yuan,
        _lira: lira,
        _rublo: rublo
    }  
    
}