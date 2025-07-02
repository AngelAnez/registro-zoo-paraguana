if (window.screen.width <= 450) {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.add("collapse", "collapse-horizontal");
  sidebar.classList.remove("sidebar");
}

const dolarToday = document.getElementById("dolarToday");

async function monitorDolar() {
  const data = await fetch("/dolar");
  let dolarValue = await data.json();
  dolarToday.innerHTML = dolarValue + " Bs.";
  dolarToday.value = parseFloat(dolarValue);
  return parseInt(dolarValue);
}

monitorDolar();
