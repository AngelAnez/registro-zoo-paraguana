const dolarToday = document.getElementById("dolarToday");

async function monitorDolar(){
  const data = await fetch("/dolar")
  let dolarValue = await data.json()
  dolarToday.innerHTML = dolarValue + " Bs.";
  dolarToday.value = parseFloat(dolarValue)
  return parseInt(dolarValue)
}

monitorDolar();