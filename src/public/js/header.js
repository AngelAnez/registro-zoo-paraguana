const dolar_today = document.getElementById("dolar_today");

async function monitorDolar(){
  const data = await fetch("/dolar")
  let dolarValue = await data.json()
  dolar_today.innerHTML = dolarValue + " Bs.";
  dolar_today.value = parseFloat(dolarValue)
  return parseInt(dolarValue)
}

monitorDolar();