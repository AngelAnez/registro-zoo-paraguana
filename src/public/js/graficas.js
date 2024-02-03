const dailyChart = document.getElementById('dailyChart');
const monthChart = document.getElementById('monthChart');

const child = document.getElementById("childValue").value
const adult = document.getElementById("adultValue").value
const older = document.getElementById("olderValue").value
const monthlyIncome = document.getElementById("monthlyIncomeValue").innerText.split(",")

new Chart(dailyChart, {
  type: 'pie',
  data: {
    labels: ['Niños', 'Adultos', 'Adultos Mayores'],
    datasets: [
        {
          label: 'Cantidad',
          data: [child, adult, older],
        }
      ]
  },
  options: {
    maintainAspectRatio: false,
    plugins: {
      legend: {
          position: 'bottom'
      }
    }
  }
});

new Chart(monthChart, {
  type: 'bar',
  data: {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
        {
          label: 'Ingresos (Bs.)',
          data: monthlyIncome,
        }
      ]
  },
  options: {
    resposive: true,
    plugins: {
      legend: {
          position: 'bottom'
      }
    }
  }
});