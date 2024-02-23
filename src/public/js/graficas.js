const dailyChart = document.getElementById('dailyChart');
const monthChart = document.getElementById('monthChart');

const children = document.getElementById("childrenValue").value
const adults = document.getElementById("adultsValue").value
const seniors = document.getElementById("seniorsValue").value
const monthlyIncome = document.getElementById("monthlyIncomeValue").innerText.split(",")

new Chart(dailyChart, {
  type: 'pie',
  data: {
    labels: ['Niños', 'Adultos', 'Adultos Mayores'],
    datasets: [
        {
          label: 'Cantidad',
          data: [children, adults, seniors],
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