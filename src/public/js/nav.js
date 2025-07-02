const sidebar = document.getElementById("sidebar");
sidebar.classList.add("collapse", "collapse-horizontal");
if (window.screen.width <= 450) {
  sidebar.classList.remove("sidebar");
} else {
  sidebar.classList.add("collapse", "collapse-horizontal", "show");
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
