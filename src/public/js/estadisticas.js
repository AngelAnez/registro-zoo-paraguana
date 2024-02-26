const visitsDistChart = document.querySelector('#visitsDistChart');
const paymentDistChart = document.querySelector('#paymentDistChart');

const children = document.querySelector("#childrenValue").value
const adults = document.querySelector("#adultsValue").value
const seniors = document.querySelector("#seniorsValue").value
const eMoneyBolivars = document.querySelector("#eMoneyBolivarsValue").value
const cashBolivars = document.querySelector("#cashBolivarsValue").value
const cashDolars = document.querySelector("#cashDolarsValue").value

new Chart(visitsDistChart, {
  type: 'pie',
  data: {
    labels: ['Niños', 'Adultos', 'Adultos Mayores'],
    datasets: [
        {
          label: 'Cantidad',
          data: [children, adults, seniors],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(75, 192, 192)'
          ],
          hoverBackgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(75, 192, 192, 0.7)'
          ]
        }
      ]
  },
  options: {
    resposive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
          position: 'bottom'
      }
    }
  }
});

new Chart(paymentDistChart, {
  type: 'doughnut',
  data: {
    labels: ['Efectivo', 'Digital'],
    datasets: [
        {
          label: 'Cantidad',
          data: [cashBolivars, eMoneyBolivars],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)'
          ],
          hoverBackgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)'
          ]
        }
      ]
  },
  options: {
    resposive: true,
    maintainAspectRatio: false,
     
    plugins: {
      legend: {
          position: 'bottom'
      }
    }
  }
});